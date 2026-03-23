/**
 * AdminContentEditor.tsx
 *
 * Admin UI for editing page content with fixed schemas.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { MediaPicker } from '../components/MediaPicker';
import { RichTextEditor } from '../components/RichTextEditor';
import { 
  contentService, 
  HomeContent, 
  AboutContent, 
  BusinessContent, 
  MembershipContent, 
  LearnContent, 
  FaqContent 
} from '../services/contentService';
import { useAuth } from '../AuthContext';
import { auditService } from '../services/auditService';
import { useBlocker } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const PAGE_META = [
  { id: 'home', label: 'Home 首頁' },
  { id: 'about', label: 'About 關於我們' },
  { id: 'business', label: 'Business 合作洽詢' },
  { id: 'membership', label: 'Membership 會員制度' },
  { id: 'learn', label: 'Learn 判讀與培育' },
  { id: 'faq', label: 'FAQ 常見問題' },
];

export function AdminContentList() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-2">內容管理 CMS</h1>
      <p className="text-[#1A1A1A]/50 text-sm mb-10">選擇要編輯的頁面</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAGE_META.map((page) => (
          <button
            key={page.id}
            onClick={() => navigate(`/admin/content/${page.id}`)}
            className="text-left bg-white border border-[#1A1A1A]/10 p-8 hover:border-[#5A6B58] hover:shadow-md transition-all group"
          >
            <h2 className="text-xl font-light mb-2 group-hover:text-[#5A6B58] transition-colors">{page.label}</h2>
            <div className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/30">Edit Page Content</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const NavigationBlocker = ({ isDirty }: { isDirty: boolean }) => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  if (blocker.state !== 'blocked') return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white max-w-sm w-full p-8 border border-[#1A1A1A]/10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h3 className="text-xl font-light mb-4 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={24} />
          未儲存的變更
        </h3>
        <p className="text-sm text-[#1A1A1A]/60 mb-8 leading-relaxed">
          頁面內容尚未儲存。確定要離開嗎？
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => blocker.proceed?.()}
            className="flex-1 px-4 py-3 border border-red-200 text-red-700 text-xs tracking-widest hover:bg-red-50 transition-colors uppercase"
          >
            捨棄離開
          </button>
          <button
            onClick={() => blocker.reset?.()}
            className="flex-1 px-4 py-3 bg-[#1A1A1A] text-white text-xs tracking-widest hover:bg-[#5A6B58] transition-colors uppercase"
          >
            留在頁面
          </button>
        </div>
      </div>
    </div>
  );
};

export function AdminContentEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const pageMeta = PAGE_META.find(p => p.id === pageId);

  if (!pageMeta) return <div>Page not found</div>;

  const renderForm = () => {
    switch (pageId) {
      case 'home': return <HomeForm onSaveStatus={setSaveStatus} />;
      case 'about': return <AboutForm onSaveStatus={setSaveStatus} />;
      case 'business': return <BusinessForm onSaveStatus={setSaveStatus} />;
      case 'membership': return <MembershipForm onSaveStatus={setSaveStatus} />;
      case 'learn': return <LearnForm onSaveStatus={setSaveStatus} />;
      case 'faq': return <FaqForm onSaveStatus={setSaveStatus} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/content')} className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-light tracking-tight">{pageMeta.label}</h1>
            <p className="text-sm text-[#1A1A1A]/40">編輯頁面內容與區塊設定</p>
          </div>
        </div>
        {saveStatus !== 'idle' && (
          <div className={`text-sm tracking-widest uppercase font-medium ${
            saveStatus === 'saved' ? 'text-[#5A6B58]' : 
            saveStatus === 'error' ? 'text-red-500' : 
            'text-[#1A1A1A]/50'
          }`}>
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved ✓' : 'Error !!'}
          </div>
        )}
      </div>
      {renderForm()}
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────

const Input = ({ label, value, originalValue, onChange, type = 'text', multiline = false }: any) => {
  const isDirty = originalValue !== undefined && JSON.stringify(value) !== JSON.stringify(originalValue);
  return (
    <div className="mb-6">
      <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 mb-2 flex justify-between">
        {label}
        {isDirty && <span className="text-amber-600 font-bold animate-pulse">● Modified</span>}
      </label>
      {multiline ? (
        <div className="mt-2">
          <RichTextEditor
            value={value || ''}
            onChange={(val) => onChange(val)}
            rows={4}
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white border p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58] transition-colors ${isDirty ? 'border-amber-300 bg-amber-50/20' : 'border-[#1A1A1A]/10'}`}
        />
      )}
    </div>
  );
};

const Toggle = ({ active, originalActive, onToggle, label }: any) => {
  const isDirty = originalActive !== undefined && active !== originalActive;
  return (
    <div className="mb-4">
      <button 
        onClick={onToggle}
        className="flex items-center gap-3 group text-left"
      >
        <div className={`w-10 h-6 rounded-full relative transition-colors ${active ? 'bg-[#5A6B58]' : 'bg-[#1A1A1A]/10'} ${isDirty ? 'ring-2 ring-amber-300 ring-offset-2' : ''}`}>
          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-4' : ''}`} />
        </div>
        <span className={`text-xs tracking-widest uppercase group-hover:text-[#1A1A1A] transition-colors ${isDirty ? 'text-amber-600 font-bold' : 'text-[#1A1A1A]/60'}`}>
          {label} {isDirty && ' (Added)'}
        </span>
      </button>
    </div>
  );
};

// ─── Page Forms ───────────────────────────────────────────────────────────────

function HomeForm({ onSaveStatus }: any) {
  const [data, setData] = useState<HomeContent | null>(null);
  const [original, setOriginal] = useState<HomeContent | null>(null);
  const { userProfile } = useAuth();
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  useEffect(() => {
    contentService.getPageContent<HomeContent>('home').then(d => {
      setData(d);
      setOriginal(JSON.parse(JSON.stringify(d)));
    });
  }, []);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const save = async () => {
    if (!data || !original) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('home', data);
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: 'home',
          details: 'Updated Home page content',
          before: original,
          after: data
        });
      }

      setOriginal(JSON.parse(JSON.stringify(data)));
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data || !original) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <NavigationBlocker isDirty={isDirty} />
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-8 border-b border-[#1A1A1A]/10 pb-4">Hero Section</h2>
        <Toggle 
          active={data.sections.hero} 
          originalActive={original.sections.hero}
          onToggle={() => setData({...data, sections: {...data.sections, hero: !data.sections.hero}})} 
          label="顯示 Hero 區塊" 
        />
        <Input label="Hero Label" value={data.heroLabel} originalValue={original.heroLabel} onChange={(v:any) => setData({...data, heroLabel: v})} />
        <Input label="Hero Title" value={data.heroTitle} originalValue={original.heroTitle} onChange={(v:any) => setData({...data, heroTitle: v})} multiline />
        <Input label="Hero Description" value={data.heroDescription} originalValue={original.heroDescription} onChange={(v:any) => setData({...data, heroDescription: v})} multiline />
        <div className="space-y-2 mb-6">
          <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between mb-2">
            Hero 首圖 (Hero Image)
            {original.heroImageUrl !== data.heroImageUrl && <span className="text-amber-600 font-bold">● MODIFIED</span>}
          </label>
          {data.heroImageUrl ? (
            <div className={`aspect-video w-full overflow-hidden border bg-[#F7F7F5] transition-colors ${original.heroImageUrl !== data.heroImageUrl ? 'border-amber-300 shadow-inner' : 'border-[#1A1A1A]/10'}`}>
              <img src={data.heroImageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
            </div>
          ) : (
            <div className="aspect-video w-full flex items-center justify-center border border-dashed border-[#1A1A1A]/20 bg-[#F7F7F5]">
              <span className="text-xs text-[#1A1A1A]/30">尚無首圖</span>
            </div>
          )}
          <button 
            onClick={() => setShowMediaPicker(true)}
            className="w-full py-3 mt-2 bg-[#1A1A1A] text-white text-xs tracking-widest hover:bg-[#5A6B58] transition-colors flex items-center justify-center gap-2"
          >
            <ImageIcon size={14} /> 選擇或更換首圖
          </button>
        </div>
      </section>

      {showMediaPicker && (
        <MediaPicker 
          usage="content" 
          onSelect={(url) => { setData({...data, heroImageUrl: url}); setShowMediaPicker(false); }} 
          onClose={() => setShowMediaPicker(false)} 
        />
      )}

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-8 border-b border-[#1A1A1A]/10 pb-4">Tagline Section</h2>
        <Toggle 
          active={data.sections.tagline} 
          originalActive={original.sections.tagline}
          onToggle={() => setData({...data, sections: {...data.sections, tagline: !data.sections.tagline}})} 
          label="顯示金句區塊" 
        />
        <Input label="Tagline Title" value={data.taglineTitle} originalValue={original.taglineTitle} onChange={(v:any) => setData({...data, taglineTitle: v})} />
        <Input label="Tagline Description" value={data.taglineDescription} originalValue={original.taglineDescription} onChange={(v:any) => setData({...data, taglineDescription: v})} multiline />
      </section>

      <div className="flex justify-end">
        <button 
          onClick={save} 
          disabled={!isDirty}
          className={`px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-3 ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save size={16} /> 儲存 Home 內容
        </button>
      </div>
    </div>
  );
}

function AboutForm({ onSaveStatus }: any) {
  const [data, setData] = useState<AboutContent | null>(null);
  const [original, setOriginal] = useState<AboutContent | null>(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    contentService.getPageContent<AboutContent>('about').then(d => {
      setData(d);
      setOriginal(JSON.parse(JSON.stringify(d)));
    });
  }, []);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const save = async () => {
    if (!data || !original) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('about', data);
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: 'about',
          details: 'Updated About page content',
          before: original,
          after: data
        });
      }

      setOriginal(JSON.parse(JSON.stringify(data)));
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data || !original) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <NavigationBlocker isDirty={isDirty} />
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} originalValue={original.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} originalValue={original.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <div className="space-y-6">
          <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">內容段落</label>
          {data.paragraphs.map((p, i) => {
            const isParaDirty = original.paragraphs[i] !== p;
            return (
              <div key={i} className="flex gap-4">
                <textarea
                  value={p}
                  onChange={(e) => {
                    const newPs = [...data.paragraphs];
                    newPs[i] = e.target.value;
                    setData({...data, paragraphs: newPs});
                  }}
                  rows={3}
                  className={`flex-1 bg-white border p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58] transition-colors resize-none ${isParaDirty ? 'border-amber-300 bg-amber-50/20' : 'border-[#1A1A1A]/10'}`}
                />
                <button 
                  onClick={() => setData({...data, paragraphs: data.paragraphs.filter((_, idx) => idx !== i)})}
                  className="text-red-400 hover:text-red-600 self-start p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
          <button 
            onClick={() => setData({...data, paragraphs: [...data.paragraphs, '']})}
            className="w-full border border-dashed border-[#1A1A1A]/20 py-4 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#5A6B58] hover:border-[#5A6B58] transition-colors"
          >
            + 新增段落
          </button>
        </div>
      </section>

      <div className="flex justify-end">
        <button 
          onClick={save} 
          disabled={!isDirty}
          className={`px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-3 ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save size={16} /> 儲存 About 內容
        </button>
      </div>
    </div>
  );
}

function BusinessForm({ onSaveStatus }: any) {
  const [data, setData] = useState<BusinessContent | null>(null);
  const [original, setOriginal] = useState<BusinessContent | null>(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    contentService.getPageContent<BusinessContent>('business').then(d => {
      setData(d);
      setOriginal(JSON.parse(JSON.stringify(d)));
    });
  }, []);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const save = async () => {
    if (!data || !original) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('business', data);
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: 'business',
          details: 'Updated Business page content',
          before: original,
          after: data
        });
      }

      setOriginal(JSON.parse(JSON.stringify(data)));
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data || !original) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <NavigationBlocker isDirty={isDirty} />
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} originalValue={original.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} originalValue={original.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="敘述" value={data.description} originalValue={original.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium">服務項目</h2>
        {data.services.map((s, i) => {
          const originalService = original.services[i] || { title: '', description: '', enabled: false };
          const isServiceDirty = JSON.stringify(s) !== JSON.stringify(originalService);
          return (
            <div key={i} className={`bg-white p-8 border transition-colors ${isServiceDirty ? 'border-amber-300 bg-amber-50/5' : 'border-[#1A1A1A]/5'}`}>
              <div className="flex justify-between items-center mb-6">
                <Toggle 
                  active={s.enabled} 
                  originalActive={originalService.enabled}
                  onToggle={() => {
                    const newS = [...data.services];
                    newS[i].enabled = !s.enabled;
                    setData({...data, services: newS});
                  }} 
                  label={s.enabled ? '已啟用' : '已停用'} 
                />
                <button 
                  onClick={() => setData({...data, services: data.services.filter((_, idx) => idx !== i)})}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <Input label="項目名稱" value={s.title} originalValue={originalService.title} onChange={(v:any) => {
                const newS = [...data.services];
                newS[i].title = v;
                setData({...data, services: newS});
              }} />
              <Input label="項目敘述" value={s.description} originalValue={originalService.description} onChange={(v:any) => {
                const newS = [...data.services];
                newS[i].description = v;
                setData({...data, services: newS});
              }} multiline />
            </div>
          );
        })}
        <button 
          onClick={() => setData({...data, services: [...data.services, { title: '', description: '', enabled: true }]})}
          className="w-full border border-dashed border-[#1A1A1A]/20 py-4 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#5A6B58] hover:border-[#5A6B58] transition-colors"
        >
          + 新增服務項目
        </button>
      </section>

      <div className="flex justify-end">
        <button 
          onClick={save} 
          disabled={!isDirty}
          className={`px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-3 ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save size={16} /> 儲存 Business 內容
        </button>
      </div>
    </div>
  );
}

function MembershipForm({ onSaveStatus }: any) {
  const [data, setData] = useState<MembershipContent | null>(null);
  const [original, setOriginal] = useState<MembershipContent | null>(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    contentService.getPageContent<MembershipContent>('membership').then(d => {
      setData(d);
      setOriginal(JSON.parse(JSON.stringify(d)));
    });
  }, []);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const save = async () => {
    if (!data || !original) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('membership', data);

      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: 'membership',
          details: 'Updated Membership page content',
          before: original,
          after: data
        });
      }

      setOriginal(JSON.parse(JSON.stringify(data)));
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data || !original) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <NavigationBlocker isDirty={isDirty} />
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} originalValue={original.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} originalValue={original.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="簡介敘述" value={data.description} originalValue={original.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-6">Audience 區塊</h2>
        <Input label="區塊標題" value={data.audienceTitle} originalValue={original.audienceTitle} onChange={(v:any) => setData({...data, audienceTitle: v})} />
        <Input label="區塊敘述" value={data.audienceDescription} originalValue={original.audienceDescription} onChange={(v:any) => setData({...data, audienceDescription: v})} multiline />
        <div className="space-y-4">
          <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">項目列表</label>
          {data.audienceItems.map((item, i) => {
            const isItemDirty = original.audienceItems[i] !== item;
            return (
              <div key={i} className="flex gap-4">
                <input 
                  type="text" 
                  value={item} 
                  onChange={(e) => {
                    const newItems = [...data.audienceItems];
                    newItems[i] = e.target.value;
                    setData({...data, audienceItems: newItems});
                  }}
                  className={`flex-1 bg-white border p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58] transition-colors ${isItemDirty ? 'border-amber-300 bg-amber-50/20' : 'border-[#1A1A1A]/10'}`}
                />
                <button onClick={() => setData({...data, audienceItems: data.audienceItems.filter((_, idx) => idx !== i)})} className="text-red-400 self-center">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
          <button onClick={() => setData({...data, audienceItems: [...data.audienceItems, '']})} className="w-full border border-dashed border-[#1A1A1A]/20 py-2 text-[10px] uppercase text-[#1A1A1A]/40">+ Add Item</button>
        </div>
      </section>

      <div className="flex justify-end">
        <button 
          onClick={save} 
          disabled={!isDirty}
          className={`px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-3 ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save size={16} /> 儲存 Membership 內容
        </button>
      </div>
    </div>
  );
}

function LearnForm({ onSaveStatus }: any) {
  const [data, setData] = useState<LearnContent | null>(null);
  const [original, setOriginal] = useState<LearnContent | null>(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    contentService.getPageContent<LearnContent>('learn').then(d => {
      setData(d);
      setOriginal(JSON.parse(JSON.stringify(d)));
    });
  }, []);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const save = async () => {
    if (!data || !original) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('learn', data);
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: 'learn',
          details: 'Updated Learn page content',
          before: original,
          after: data
        });
      }

      setOriginal(JSON.parse(JSON.stringify(data)));
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data || !original) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <NavigationBlocker isDirty={isDirty} />
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} originalValue={original.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} originalValue={original.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="說明" value={data.description} originalValue={original.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-6">介紹區塊 1</h2>
        <Input label="標題" value={data.intro1Title} originalValue={original.intro1Title} onChange={(v:any) => setData({...data, intro1Title: v})} />
        <Input label="內容" value={data.intro1Content} originalValue={original.intro1Content} onChange={(v:any) => setData({...data, intro1Content: v})} multiline />
      </section>

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-6">介紹區塊 2</h2>
        <Input label="標題" value={data.intro2Title} originalValue={original.intro2Title} onChange={(v:any) => setData({...data, intro2Title: v})} />
        <Input label="內容" value={data.intro2Content} originalValue={original.intro2Content} onChange={(v:any) => setData({...data, intro2Content: v})} multiline />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium">判讀標準</h2>
        {data.standards.map((s, i) => {
          const originalStandard = original.standards[i] || { name: '', description: '', enabled: false };
          const isStdDirty = JSON.stringify(s) !== JSON.stringify(originalStandard);
          return (
            <div key={i} className={`bg-white p-8 border transition-colors ${isStdDirty ? 'border-amber-300 bg-amber-50/5' : 'border-[#1A1A1A]/5'}`}>
              <Toggle 
                active={s.enabled} 
                originalActive={originalStandard.enabled}
                onToggle={() => {
                  const newS = [...data.standards];
                  newS[i].enabled = !s.enabled;
                  setData({...data, standards: newS});
                }} 
                label={s.enabled ? '顯示' : '隱藏'} 
              />
              <Input label="名稱" value={s.name} originalValue={originalStandard.name} onChange={(v:any) => {
                const newS = [...data.standards];
                newS[i].name = v;
                setData({...data, standards: newS});
              }} />
              <Input label="說明" value={s.description} originalValue={originalStandard.description} onChange={(v:any) => {
                const newS = [...data.standards];
                newS[i].description = v;
                setData({...data, standards: newS});
              }} multiline />
            </div>
          );
        })}
      </section>

      <div className="flex justify-end">
        <button 
          onClick={save} 
          disabled={!isDirty}
          className={`px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-3 ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save size={16} /> 儲存 Learn 內容
        </button>
      </div>
    </div>
  );
}

function FaqForm({ onSaveStatus }: any) {
  const [data, setData] = useState<FaqContent | null>(null);
  const [original, setOriginal] = useState<FaqContent | null>(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    contentService.getPageContent<FaqContent>('faq').then(d => {
      setData(d);
      setOriginal(JSON.parse(JSON.stringify(d)));
    });
  }, []);

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const save = async () => {
    if (!data || !original) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('faq', data);

      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: 'faq',
          details: 'Updated FAQ page content',
          before: original,
          after: data
        });
      }

      setOriginal(JSON.parse(JSON.stringify(data)));
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data || !original) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <NavigationBlocker isDirty={isDirty} />
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} originalValue={original.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} originalValue={original.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="說明" value={data.description} originalValue={original.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium">常見問題列表</h2>
        {data.items.map((item, i) => {
          const originalItem = original.items[i] || { question: '', answer: '', enabled: false };
          const isItemDirty = JSON.stringify(item) !== JSON.stringify(originalItem);
          return (
            <div key={i} className={`bg-white p-8 border transition-colors ${isItemDirty ? 'border-amber-300 bg-amber-50/5' : 'border-[#1A1A1A]/5'}`}>
              <div className="flex justify-between items-center mb-6">
                <Toggle 
                  active={item.enabled} 
                  originalActive={originalItem.enabled}
                  onToggle={() => {
                    const newItems = [...data.items];
                    newItems[i].enabled = !item.enabled;
                    setData({...data, items: newItems});
                  }} 
                  label={item.enabled ? '顯示' : '隱藏'} 
                />
                <button onClick={() => setData({...data, items: data.items.filter((_, idx) => idx !== i)})} className="text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
              <Input label="問題 (Q)" value={item.question} originalValue={originalItem.question} onChange={(v:any) => {
                const newItems = [...data.items];
                newItems[i].question = v;
                setData({...data, items: newItems});
              }} />
              <Input label="答案 (A)" value={item.answer} originalValue={originalItem.answer} onChange={(v:any) => {
                const newItems = [...data.items];
                newItems[i].answer = v;
                setData({...data, items: newItems});
              }} multiline />
            </div>
          );
        })}
        <button 
          onClick={() => setData({...data, items: [...data.items, { question: '', answer: '', enabled: true }]})}
          className="w-full border border-dashed border-[#1A1A1A]/20 py-4 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#5A6B58] hover:border-[#5A6B58] transition-colors"
        >
          + 新增 FAQ 項目
        </button>
      </section>

      <div className="flex justify-end">
        <button 
          onClick={save} 
          disabled={!isDirty}
          className={`px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-3 ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save size={16} /> 儲存 FAQ 內容
        </button>
      </div>
    </div>
  );
}

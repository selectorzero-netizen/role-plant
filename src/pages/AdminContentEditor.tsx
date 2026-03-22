/**
 * AdminContentEditor.tsx
 *
 * Admin UI for editing page content with fixed schemas.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { MediaPicker } from '../components/MediaPicker';
import { 
  contentService, 
  HomeContent, 
  AboutContent, 
  BusinessContent, 
  MembershipContent, 
  LearnContent, 
  FaqContent 
} from '../services/contentService';

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

export function AdminContentEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
          <div className={`text-sm tracking-widest uppercase ${
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

const Input = ({ label, value, onChange, type = 'text', multiline = false }: any) => (
  <div className="mb-6">
    <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 mb-2">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-white border border-[#1A1A1A]/10 p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58] transition-colors resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#1A1A1A]/10 p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58] transition-colors"
      />
    )}
  </div>
);

const Toggle = ({ active, onToggle, label }: any) => (
  <button 
    onClick={onToggle}
    className="flex items-center gap-3 group text-left mb-4"
  >
    <div className={`w-10 h-6 rounded-full relative transition-colors ${active ? 'bg-[#5A6B58]' : 'bg-[#1A1A1A]/10'}`}>
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-4' : ''}`} />
    </div>
    <span className="text-xs tracking-widest uppercase text-[#1A1A1A]/60 group-hover:text-[#1A1A1A] transition-colors">{label}</span>
  </button>
);

// ─── Page Forms ───────────────────────────────────────────────────────────────

function HomeForm({ onSaveStatus }: any) {
  const [data, setData] = useState<HomeContent | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  useEffect(() => {
    contentService.getPageContent<HomeContent>('home').then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('home', data);
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-8 border-b border-[#1A1A1A]/10 pb-4">Hero Section</h2>
        <Toggle active={data.sections.hero} onToggle={() => setData({...data, sections: {...data.sections, hero: !data.sections.hero}})} label="顯示 Hero 區塊" />
        <Input label="Hero Label" value={data.heroLabel} onChange={(v:any) => setData({...data, heroLabel: v})} />
        <Input label="Hero Title" value={data.heroTitle} onChange={(v:any) => setData({...data, heroTitle: v})} multiline />
        <Input label="Hero Description" value={data.heroDescription} onChange={(v:any) => setData({...data, heroDescription: v})} multiline />
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Input label="Hero Image URL" value={data.heroImageUrl} onChange={(v:any) => setData({...data, heroImageUrl: v})} />
          </div>
          <button 
            onClick={() => setShowMediaPicker(true)}
            className="mb-6 p-4 bg-[#5A6B58] text-white hover:bg-[#1A1A1A] transition-colors flex items-center gap-2"
          >
            <ImageIcon size={16} /> <span className="text-[10px] uppercase tracking-widest">Select</span>
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
        <Toggle active={data.sections.tagline} onToggle={() => setData({...data, sections: {...data.sections, tagline: !data.sections.tagline}})} label="顯示金句區塊" />
        <Input label="Tagline Title" value={data.taglineTitle} onChange={(v:any) => setData({...data, taglineTitle: v})} />
        <Input label="Tagline Description" value={data.taglineDescription} onChange={(v:any) => setData({...data, taglineDescription: v})} multiline />
      </section>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#1A1A1A] text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-3">
          <Save size={16} /> 儲存 Home 內容
        </button>
      </div>
    </div>
  );
}

function AboutForm({ onSaveStatus }: any) {
  const [data, setData] = useState<AboutContent | null>(null);

  useEffect(() => {
    contentService.getPageContent<AboutContent>('about').then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('about', data);
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <div className="space-y-6">
          <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">內容段落</label>
          {data.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-4">
              <textarea
                value={p}
                onChange={(e) => {
                  const newPs = [...data.paragraphs];
                  newPs[i] = e.target.value;
                  setData({...data, paragraphs: newPs});
                }}
                rows={3}
                className="flex-1 bg-white border border-[#1A1A1A]/10 p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58] transition-colors resize-none"
              />
              <button 
                onClick={() => setData({...data, paragraphs: data.paragraphs.filter((_, idx) => idx !== i)})}
                className="text-red-400 hover:text-red-600 self-start p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button 
            onClick={() => setData({...data, paragraphs: [...data.paragraphs, '']})}
            className="w-full border border-dashed border-[#1A1A1A]/20 py-4 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#5A6B58] hover:border-[#5A6B58] transition-colors"
          >
            + 新增段落
          </button>
        </div>
      </section>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#1A1A1A] text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-3">
          <Save size={16} /> 儲存 About 內容
        </button>
      </div>
    </div>
  );
}

function BusinessForm({ onSaveStatus }: any) {
  const [data, setData] = useState<BusinessContent | null>(null);

  useEffect(() => {
    contentService.getPageContent<BusinessContent>('business').then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('business', data);
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="敘述" value={data.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium">服務項目</h2>
        {data.services.map((s, i) => (
          <div key={i} className="bg-white p-8 border border-[#1A1A1A]/5">
            <div className="flex justify-between items-center mb-6">
              <Toggle active={s.enabled} onToggle={() => {
                const newS = [...data.services];
                newS[i].enabled = !s.enabled;
                setData({...data, services: newS});
              }} label={s.enabled ? '已啟用' : '已停用'} />
              <button 
                onClick={() => setData({...data, services: data.services.filter((_, idx) => idx !== i)})}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <Input label="項目名稱" value={s.title} onChange={(v:any) => {
              const newS = [...data.services];
              newS[i].title = v;
              setData({...data, services: newS});
            }} />
            <Input label="項目敘述" value={s.description} onChange={(v:any) => {
              const newS = [...data.services];
              newS[i].description = v;
              setData({...data, services: newS});
            }} multiline />
          </div>
        ))}
        <button 
          onClick={() => setData({...data, services: [...data.services, { title: '', description: '', enabled: true }]})}
          className="w-full border border-dashed border-[#1A1A1A]/20 py-4 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#5A6B58] hover:border-[#5A6B58] transition-colors"
        >
          + 新增服務項目
        </button>
      </section>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#1A1A1A] text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-3">
          <Save size={16} /> 儲存 Business 內容
        </button>
      </div>
    </div>
  );
}

function MembershipForm({ onSaveStatus }: any) {
  const [data, setData] = useState<MembershipContent | null>(null);

  useEffect(() => {
    contentService.getPageContent<MembershipContent>('membership').then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('membership', data);
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="簡介敘述" value={data.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-6">Audience 區塊</h2>
        <Input label="區塊標題" value={data.audienceTitle} onChange={(v:any) => setData({...data, audienceTitle: v})} />
        <Input label="區塊敘述" value={data.audienceDescription} onChange={(v:any) => setData({...data, audienceDescription: v})} multiline />
        <div className="space-y-4">
          <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">項目列表</label>
          {data.audienceItems.map((item, i) => (
            <div key={i} className="flex gap-4">
              <input 
                type="text" 
                value={item} 
                onChange={(e) => {
                  const newItems = [...data.audienceItems];
                  newItems[i] = e.target.value;
                  setData({...data, audienceItems: newItems});
                }}
                className="flex-1 bg-white border border-[#1A1A1A]/10 p-4 text-sm font-light focus:outline-none focus:border-[#5A6B58]"
              />
              <button onClick={() => setData({...data, audienceItems: data.audienceItems.filter((_, idx) => idx !== i)})} className="text-red-400 self-center">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button onClick={() => setData({...data, audienceItems: [...data.audienceItems, '']})} className="w-full border border-dashed border-[#1A1A1A]/20 py-2 text-[10px] uppercase text-[#1A1A1A]/40">+ Add Item</button>
        </div>
      </section>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#1A1A1A] text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-3">
          <Save size={16} /> 儲存 Membership 內容
        </button>
      </div>
    </div>
  );
}

function LearnForm({ onSaveStatus }: any) {
  const [data, setData] = useState<LearnContent | null>(null);

  useEffect(() => {
    contentService.getPageContent<LearnContent>('learn').then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('learn', data);
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="說明" value={data.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-6">介紹區塊 1</h2>
        <Input label="標題" value={data.intro1Title} onChange={(v:any) => setData({...data, intro1Title: v})} />
        <Input label="內容" value={data.intro1Content} onChange={(v:any) => setData({...data, intro1Content: v})} multiline />
      </section>

      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium mb-6">介紹區塊 2</h2>
        <Input label="標題" value={data.intro2Title} onChange={(v:any) => setData({...data, intro2Title: v})} />
        <Input label="內容" value={data.intro2Content} onChange={(v:any) => setData({...data, intro2Content: v})} multiline />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium">判讀標準</h2>
        {data.standards.map((s, i) => (
          <div key={i} className="bg-white p-8 border border-[#1A1A1A]/5">
            <Toggle active={s.enabled} onToggle={() => {
              const newS = [...data.standards];
              newS[i].enabled = !s.enabled;
              setData({...data, standards: newS});
            }} label={s.enabled ? '顯示' : '隱藏'} />
            <Input label="名稱" value={s.name} onChange={(v:any) => {
              const newS = [...data.standards];
              newS[i].name = v;
              setData({...data, standards: newS});
            }} />
            <Input label="說明" value={s.description} onChange={(v:any) => {
              const newS = [...data.standards];
              newS[i].description = v;
              setData({...data, standards: newS});
            }} multiline />
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#1A1A1A] text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-3">
          <Save size={16} /> 儲存 Learn 內容
        </button>
      </div>
    </div>
  );
}

function FaqForm({ onSaveStatus }: any) {
  const [data, setData] = useState<FaqContent | null>(null);

  useEffect(() => {
    contentService.getPageContent<FaqContent>('faq').then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    onSaveStatus('saving');
    try {
      await contentService.savePageContent('faq', data);
      onSaveStatus('saved');
      setTimeout(() => onSaveStatus('idle'), 2000);
    } catch { onSaveStatus('error'); }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 border border-[#1A1A1A]/5">
        <Input label="頁面標題" value={data.title} onChange={(v:any) => setData({...data, title: v})} />
        <Input label="副標題" value={data.subtitle} onChange={(v:any) => setData({...data, subtitle: v})} />
        <Input label="說明" value={data.description} onChange={(v:any) => setData({...data, description: v})} multiline />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-[0.2em] uppercase font-medium">常見問題列表</h2>
        {data.items.map((item, i) => (
          <div key={i} className="bg-white p-8 border border-[#1A1A1A]/5">
            <div className="flex justify-between items-center mb-6">
              <Toggle active={item.enabled} onToggle={() => {
                const newItems = [...data.items];
                newItems[i].enabled = !item.enabled;
                setData({...data, items: newItems});
              }} label={item.enabled ? '顯示' : '隱藏'} />
              <button onClick={() => setData({...data, items: data.items.filter((_, idx) => idx !== i)})} className="text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
            <Input label="問題 (Q)" value={item.question} onChange={(v:any) => {
              const newItems = [...data.items];
              newItems[i].question = v;
              setData({...data, items: newItems});
            }} />
            <Input label="答案 (A)" value={item.answer} onChange={(v:any) => {
              const newItems = [...data.items];
              newItems[i].answer = v;
              setData({...data, items: newItems});
            }} multiline />
          </div>
        ))}
        <button 
          onClick={() => setData({...data, items: [...data.items, { question: '', answer: '', enabled: true }]})}
          className="w-full border border-dashed border-[#1A1A1A]/20 py-4 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#5A6B58] hover:border-[#5A6B58] transition-colors"
        >
          + 新增 FAQ 項目
        </button>
      </section>

      <div className="flex justify-end">
        <button onClick={save} className="bg-[#1A1A1A] text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-3">
          <Save size={16} /> 儲存 FAQ 內容
        </button>
      </div>
    </div>
  );
}

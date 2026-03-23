import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plantService } from '../services/plantService';
import { Plant } from '../types';
import { ArrowLeft, Save, AlertTriangle, Image as ImageIcon, Star, Upload, Trash2, GripVertical, X, Loader2, CheckCircle2, History } from 'lucide-react';
import { useBlocker } from 'react-router-dom';
import { auditService } from '../services/auditService';
import { useAuth } from '../AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { MediaPicker } from '../components/MediaPicker';
import { taxonomyService } from '../services/taxonomyService';
import { Taxonomy } from '../types';
import { RichTextEditor } from '../components/RichTextEditor';

export function AdminPlantEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [original, setOriginal] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [categories, setCategories] = useState<Taxonomy[]>([]);
  const [grades, setGrades] = useState<Taxonomy[]>([]);

  useEffect(() => {
    const fetchPlant = async () => {
      if (!id) return;
      try {
        const data = await plantService.getPlantById(id);
        if (data) {
          setPlant(data);
          setOriginal(JSON.parse(JSON.stringify(data)));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchTaxonomy = async () => {
      try {
        const [catData, gradeData] = await Promise.all([
          taxonomyService.getByType('plant_category'),
          taxonomyService.getByType('plant_grade')
        ]);
        setCategories(catData);
        setGrades(gradeData);
      } catch (err) {
        console.error("Taxonomy fetch error:", err);
      }
    };
    fetchPlant();
    fetchTaxonomy();
  }, [id]);

  const isDirty = JSON.stringify(plant) !== JSON.stringify(original);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const isFieldDirty = (field: keyof Plant) => {
    if (!plant || !original) return false;
    return JSON.stringify(plant[field]) !== JSON.stringify(original[field]);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleSave = async () => {
    if (!plant || !id) return;
    setSaving(true);
    setSaveStatus('idle');
    try {
      // Ensure coverImageUrl is synced before saving
      const coverImage = plant.images.find(img => img.isCover) || plant.images[0];
      const plantToSave = { ...plant, coverImageUrl: coverImage?.url || '' };
      
      await plantService.updatePlant(id, plantToSave);
      
      // Audit Logging
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'plant',
          entityId: id,
          details: `Updated plant: ${plant.name}`,
          before: original,
          after: plantToSave
        });
      }

      setPlant(plantToSave);
      setOriginal(JSON.parse(JSON.stringify(plantToSave)));
      
      const now = new Date();
      setLastSavedTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
      setSaveStatus('saved');
      
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      setSaveStatus('error');
      setMsg({ text: '儲存失敗：' + err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof Plant, value: any) => {
    if (plant) setPlant({ ...plant, [field]: value });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim() && plant) {
      if (!plant.tags.includes(newTag.trim())) {
        updateField('tags', [...plant.tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (plant) updateField('tags', plant.tags.filter(t => t !== tagToRemove));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim() || !plant) return;
    const newImgs = [...plant.images, { url: newImageUrl.trim(), isCover: plant.images.length === 0, index: plant.images.length }];
    updateField('images', newImgs);
    setNewImageUrl('');
  };

  const handleMediaSelect = (url: string) => {
    if (!plant) return;
    const newImgs = [...plant.images, { url, isCover: plant.images.length === 0, index: plant.images.length }];
    updateField('images', newImgs);
    setShowMediaPicker(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !plant || !id) return;
    setUploadingImage(true);
    try {
      const fileRef = ref(storage, `plants/${id}/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      const newImgs = [...plant.images, { url, isCover: plant.images.length === 0, index: plant.images.length }];
      updateField('images', newImgs);
      setMsg({ text: '圖片上傳成功', type: 'success' });
    } catch (error: any) {
      console.error("Upload failed", error);
      setMsg({ text: '圖片上傳失敗: ' + error.message, type: 'error' });
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const setAsCover = (idx: number) => {
    if (!plant) return;
    const newImgs = plant.images.map((img, i) => ({ ...img, isCover: i === idx }));
    updateField('images', newImgs);
  };

  const removeImage = (idx: number) => {
    if (!plant) return;
    const newImgs = plant.images.filter((_, i) => i !== idx);
    // If we removed the cover and there are images left, set the first one as cover
    if (plant.images[idx].isCover && newImgs.length > 0) {
      newImgs[0].isCover = true;
    }
    updateField('images', newImgs);
  };

  if (loading) return <div className="p-8">載入中...</div>;
  if (!plant) return <div className="p-8">找不到該植物檔案</div>;

  return (
    <div className="max-w-5xl pb-32">
      {/* Navigation Blocker Dialog */}
      {blocker.state === 'blocked' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-8 border border-[#1A1A1A]/10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-light mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={24} />
              未儲存的變更
            </h3>
            <p className="text-sm text-[#1A1A1A]/60 mb-8 leading-relaxed">
              您有尚未儲存的變更。確定要離開此頁面嗎？離開後變更將會遺失。
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => blocker.proceed?.()}
                className="flex-1 px-4 py-3 border border-red-200 text-red-700 text-xs tracking-widest hover:bg-red-50 transition-colors uppercase"
              >
                捨棄並離開
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
      )}

      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-[#F7F7F5] pt-4 pb-4 border-b border-[#1A1A1A]/10 flex justify-between items-center mb-8 px-4 -mx-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/plants')} className="text-[#1A1A1A]/50 hover:text-[#1A1A1A]">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-light tracking-tight">{plant.name || '未命名檔案'}</h1>
            <p className="text-xs font-mono text-[#1A1A1A]/50 mt-1">ID: {plant.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isDirty && !saving && saveStatus !== 'error' && <span className="text-sm text-amber-600 flex items-center gap-1 font-medium"><AlertTriangle size={16}/> ⚠️ 有未儲存的變更</span>}
          {saveStatus === 'saved' && <span className="text-sm text-emerald-600 flex items-center gap-1 font-medium"><CheckCircle2 size={16}/> ✅ 已儲存 ({lastSavedTime})</span>}
          {saveStatus === 'error' && <span className="text-sm text-red-600 flex items-center gap-1 font-medium"><AlertTriangle size={16}/> ❌ 儲存失敗，請重試</span>}
          
          <button
            onClick={handleSave}
            disabled={saving || (!isDirty && saveStatus !== 'error')}
            className={`px-6 py-2.5 text-sm uppercase tracking-widest flex items-center gap-2 transition-colors
              ${isDirty || saveStatus === 'error' ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? '💾 儲存中...' : '儲存檔案'}
          </button>
        </div>
      </div>

      {msg.text && saveStatus === 'error' && (
        <div className="p-4 mb-6 text-sm bg-red-50 text-red-800 border-l-4 border-red-500">
          {msg.text}
        </div>
      )}

      {/* Main Grid Two Columns */}
      <div className="flex gap-8 items-start">
        {/* Left Column: Core Data */}
        <div className="flex-1 space-y-8">
          
          <section className="bg-white p-6 border border-[#1A1A1A]/10 shadow-sm">
            <h2 className="text-lg font-medium mb-6">基礎資料</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                    植物名稱 / 檔案名稱 (Name)
                    {isFieldDirty('name') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                  </label>
                  <input className={`w-full border p-2 text-sm focus:border-[#5A6B58] outline-none transition-colors ${isFieldDirty('name') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} value={plant.name} onChange={e => updateField('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                    檔案編號 (Serial Number)
                    {isFieldDirty('serialNumber') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                  </label>
                  <input className={`w-full border p-2 text-sm focus:border-[#5A6B58] outline-none transition-colors ${isFieldDirty('serialNumber') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} value={plant.serialNumber || ''} onChange={e => updateField('serialNumber', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                    中文名/俗名 (Local Name)
                    {isFieldDirty('localName') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                  </label>
                  <input className={`w-full border p-2 text-sm focus:border-[#5A6B58] outline-none transition-colors ${isFieldDirty('localName') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} value={plant.localName || ''} onChange={e => updateField('localName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                    學名 (Scientific Name)
                    {isFieldDirty('scientificName') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                  </label>
                  <input className={`w-full border p-2 text-sm focus:border-[#5A6B58] outline-none font-serif italic transition-colors ${isFieldDirty('scientificName') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} value={plant.scientificName || ''} onChange={e => updateField('scientificName', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                  售價 (Price) - 若無請留空
                  {isFieldDirty('price') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                </label>
                <input type="number" className={`w-full border p-2 text-sm focus:border-[#5A6B58] outline-none transition-colors ${isFieldDirty('price') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} value={plant.price || ''} onChange={e => updateField('price', e.target.value ? Number(e.target.value) : undefined)} />
              </div>
              <div>
                <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                  摘要簡介 (Description - 用於清單與首頁)
                  {isFieldDirty('description') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                </label>
                <div className="mt-2">
                  <RichTextEditor 
                    value={plant.description || ''} 
                    onChange={val => updateField('description', val)} 
                    rows={8} 
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 border border-[#1A1A1A]/10 shadow-sm">
            <h2 className="text-lg font-medium mb-6 flex items-center justify-between">
              圖庫與履歷照
              <span className="text-xs font-normal text-[#1A1A1A]/40 bg-gray-100 px-2 py-1 rounded">共 {plant.images.length} 張</span>
            </h2>
            
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                placeholder="貼上圖片 URL（如 /images/plants/xxx.jpg）" 
                className="flex-1 border p-2 text-sm focus:border-[#5A6B58] outline-none bg-gray-50"
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
              />
              <button onClick={handleAddImage} disabled={!newImageUrl.trim()} className="bg-[#1A1A1A] text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#5A6B58] transition-colors disabled:opacity-30 whitespace-nowrap">加入圖片</button>
              <button 
                onClick={() => setShowMediaPicker(true)}
                className="bg-[#5A6B58] text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <ImageIcon size={14}/> 媒體庫
              </button>
            </div>

            {plant.images.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-[#1A1A1A]/10 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <p className="text-sm">尚未上傳任何圖片</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {plant.images.map((img, idx) => (
                  <div key={idx} className={`relative border p-2 group ${img.isCover ? 'border-[#5A6B58] bg-[#5A6B58]/5 ring-2 ring-[#5A6B58]' : 'border-[#1A1A1A]/10'}`}>
                    <img src={img.url} alt="" className="w-full h-40 object-cover bg-gray-100" />
                    {img.isCover && <div className="absolute top-4 left-4 bg-[#5A6B58] shadow-md text-white text-[10px] px-2 py-1 uppercase tracking-wider flex items-center gap-1 font-bold z-10"><Star size={10} fill="currentColor"/> 👑 面向首頁/列表的封面圖片</div>}
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {!img.isCover && (
                        <button onClick={() => setAsCover(idx)} className="bg-white/90 p-1.5 hover:bg-white text-gray-700 shadow flex items-center gap-1 text-[10px]"><Star size={12}/> 設封面</button>
                      )}
                      <button onClick={() => removeImage(idx)} className="bg-white/90 p-1.5 hover:bg-white text-red-600 shadow flex items-center gap-1 text-[10px]"><Trash2 size={12}/> 移除</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Taxonomy & State */}
        <div className="w-80 shrink-0 space-y-6">
          
          <section className="bg-white p-6 border border-[#5A6B58] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#5A6B58]/5 rotate-45 translate-x-8 -translate-y-8"></div>
            <h2 className="text-base font-medium mb-4">檔案狀態 (Level 1)</h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-[#1A1A1A]/50 mb-1 flex justify-between">
                  展出狀態
                  {isFieldDirty('status') && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter animate-pulse">● MODIFIED</span>}
                </label>
                <select className={`w-full border p-2 bg-[#F7F7F5] outline-none transition-colors ${isFieldDirty('status') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} value={plant.status} onChange={e => updateField('status', e.target.value)}>
                  <option value="draft">🟡 草稿 (隱藏)</option>
                  <option value="exhibiting">🟢 展出中</option>
                  <option value="sold">🔴 已售出/已售</option>
                  <option value="hidden">⚫ 永久隱藏</option>
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={plant.visibility === 'public'} onChange={e => updateField('visibility', e.target.checked ? 'public' : 'private')} />
                  <span>公開閱覽</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={plant.featuredOnHome} onChange={e => updateField('featuredOnHome', e.target.checked)} />
                  <span className={plant.featuredOnHome ? 'text-yellow-600 font-medium' : ''}>首頁精選展示</span>
                </label>
              </div>
              <div className="pt-2 border-t border-[#1A1A1A]/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={plant.availableForApplication} onChange={e => updateField('availableForApplication', e.target.checked)} />
                  <span className="text-[#5A6B58] font-medium">開放會員遞交申請</span>
                </label>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 border border-[#1A1A1A]/10 shadow-sm">
            <h2 className="text-base font-medium mb-4">分類與分級 (Level 2)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#1A1A1A]/50 mb-1">檔案分級 (Grade)</label>
                <select 
                  className={`w-full border p-2 outline-none focus:border-[#5A6B58] ${isFieldDirty('grade') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} 
                  value={plant.grade} 
                  onChange={e => updateField('grade', e.target.value)}
                >
                  <option value="">無特別分級</option>
                  {grades.map(g => (
                    <option key={g.id} value={g.key}>{g.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#1A1A1A]/50 mb-1">主要屬系 (Category/Type)</label>
                <select 
                  className={`w-full border p-2 outline-none focus:border-[#5A6B58] bg-[#F7F7F5] ${isFieldDirty('category') ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`} 
                  value={plant.category || ''} 
                  onChange={e => updateField('category', e.target.value)}
                >
                  <option value="" disabled>請選擇分類</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.key}>{c.label}</option>
                  ))}
                  <option value="Other">其他 (Other)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 border border-[#1A1A1A]/10 shadow-sm">
            <h2 className="text-base font-medium mb-2">自由標籤 (Level 3)</h2>
            <p className="text-xs text-[#1A1A1A]/40 mb-4">作為前台搜尋與補充說明的輔助，不參與硬性分類邏輯。</p>
            
            <input 
              type="text" 
              placeholder="輸入標籤後按 Enter 追加..." 
              className="w-full border p-2 text-sm focus:border-[#5A6B58] outline-none mb-3 bg-[#F7F7F5]"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
            
            <div className="flex flex-wrap gap-2">
              {plant.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 flex items-center gap-1 border border-gray-200">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-500 ml-1"><X size={12}/></button>
                </span>
              ))}
              {plant.tags.length === 0 && <span className="text-xs text-gray-400">目前無自訂標籤</span>}
            </div>
          </section>

        </div>
      </div>

      {showMediaPicker && (
        <MediaPicker 
          usage="plant" 
          onSelect={handleMediaSelect} 
          onClose={() => setShowMediaPicker(false)} 
        />
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plantService } from '../services/plantService';
import { Plant } from '../types';
import { ArrowLeft, Save, AlertTriangle, Image as ImageIcon, Star, Upload, Trash2, GripVertical, X } from 'lucide-react';

export function AdminPlantEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [original, setOriginal] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

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
    fetchPlant();
  }, [id]);

  const isDirty = JSON.stringify(plant) !== JSON.stringify(original);

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
    try {
      await plantService.updatePlant(id, plant);
      setOriginal(JSON.parse(JSON.stringify(plant)));
      setMsg({ text: '檔案儲存成功！', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch (err: any) {
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
      {/* Header Bar */}
      <div className="sticky top-0 z-10 bg-[#F7F7F5] pt-4 pb-4 border-b border-[#1A1A1A]/10 flex justify-between items-center mb-8">
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
          {isDirty && <span className="text-xs text-orange-600 flex items-center gap-1"><AlertTriangle size={14}/> 未儲存變更</span>}
          {!isDirty && <span className="text-xs text-green-600 flex items-center gap-1">已同步</span>}
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className={`px-6 py-2.5 text-sm uppercase tracking-widest flex items-center gap-2 transition-colors
              ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <Save size={16} /> {saving ? '儲存中...' : '儲存檔案'}
          </button>
        </div>
      </div>

      {msg.text && (
        <div className={`p-4 mb-6 text-sm ${msg.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
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
              <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">植物名稱 (Name)</label><input className="w-full border p-2 text-sm focus:border-[#5A6B58] outline-none" value={plant.name} onChange={e => updateField('name', e.target.value)} /></div>
              <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">學名 (Scientific Name)</label><input className="w-full border p-2 text-sm focus:border-[#5A6B58] outline-none font-serif italic" value={plant.scientificName} onChange={e => updateField('scientificName', e.target.value)} /></div>
              <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">短述簡介 (Description - 用於清單與首頁)</label><textarea className="w-full border p-2 text-sm h-20 focus:border-[#5A6B58] outline-none" value={plant.description} onChange={e => updateField('description', e.target.value)} /></div>
              <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">高階判讀與長篇細節 (Detailed Description)</label><textarea className="w-full border p-2 text-sm h-40 focus:border-[#5A6B58] outline-none" value={plant.detailedDescription} onChange={e => updateField('detailedDescription', e.target.value)} /></div>
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
                placeholder="貼上圖片 URL (暫代上傳器)" 
                className="flex-1 border p-2 text-sm focus:border-[#5A6B58] outline-none bg-gray-50"
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
              />
              <button onClick={handleAddImage} className="bg-[#F7F7F5] border border-[#1A1A1A]/10 px-4 text-sm hover:bg-gray-100 transition-colors flex items-center gap-1"><Upload size={14}/> 加入</button>
            </div>

            {plant.images.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-[#1A1A1A]/10 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <p className="text-sm">尚未上傳任何圖片</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {plant.images.map((img, idx) => (
                  <div key={idx} className={`relative border p-2 group ${img.isCover ? 'border-[#5A6B58] bg-[#5A6B58]/5' : 'border-[#1A1A1A]/10'}`}>
                    <img src={img.url} alt="" className="w-full h-40 object-cover bg-gray-100" />
                    {img.isCover && <div className="absolute top-4 left-4 bg-[#5A6B58] text-white text-[10px] px-2 py-1 uppercase tracking-wider">首圖封面</div>}
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                <label className="block text-xs text-[#1A1A1A]/50 mb-1">展出狀態</label>
                <select className="w-full border p-2 bg-[#F7F7F5] outline-none" value={plant.status} onChange={e => updateField('status', e.target.value)}>
                  <option value="draft">🟡 草稿 (隱藏)</option>
                  <option value="exhibiting">🟢 展出中</option>
                  <option value="sold">🔴 已釋出/已售</option>
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
                <select className="w-full border p-2 outline-none focus:border-[#5A6B58]" value={plant.grade} onChange={e => updateField('grade', e.target.value)}>
                  <option value="">無特別分級</option>
                  <option value="S">S 級 (博物館級收藏)</option>
                  <option value="A">A 級 (珍稀)</option>
                  <option value="B">B 級 (進階)</option>
                  <option value="Starter">Starter (入門推廣)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#1A1A1A]/50 mb-1">主要屬系 (Category/Type)</label>
                <input className="w-full border p-2 text-sm focus:border-[#5A6B58] outline-none" placeholder="例如：塊根植物 / 天南星科" value={plant.category} onChange={e => updateField('category', e.target.value)} />
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
    </div>
  );
}

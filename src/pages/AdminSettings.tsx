import React, { useState, useEffect } from 'react';
import { usePolicy } from '../PolicyContext';
import { policyService } from '../services/policyService';
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export function AdminSettings() {
  const { membershipPolicy, source } = usePolicy();
  const [formData, setFormData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!formData && membershipPolicy) {
      setFormData(JSON.parse(JSON.stringify(membershipPolicy)));
    }
  }, [membershipPolicy]);

  if (!formData) return <div>Loading...</div>;

  const handleSave = async () => {
    setSaving(true);
    setMsg({ text: '', type: '' });
    try {
      await policyService.saveMembershipPolicy(formData);
      setMsg({ text: '儲存成功！前台將即時生效。', type: 'success' });
      // Reload after 2s to cleanly trigger the PolicyContext fetch
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      setMsg({ text: '儲存失敗：' + err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (path: string[], value: string) => {
    const newData = { ...formData };
    let curr = newData;
    for (let i = 0; i < path.length - 1; i++) curr = curr[path[i]];
    curr[path[path.length - 1]] = value;
    setFormData(newData);
  };

  const handleArrayTextChange = (path: string[], idx: number, value: string) => {
    const newData = { ...formData };
    let curr = newData;
    for (let i = 0; i < path.length; i++) curr = curr[path[i]];
    curr[idx] = value;
    setFormData(newData);
  };

  const handleArrayObjChange = (path: string[], idx: number, key: string, value: string) => {
    const newData = { ...formData };
    let curr = newData;
    for (let i = 0; i < path.length; i++) curr = curr[path[i]];
    curr[idx][key] = value;
    setFormData(newData);
  };

  const moveItem = (path: string[], idx: number, direction: 'up' | 'down') => {
    const newData = { ...formData };
    let arr = newData;
    for (let i = 0; i < path.length; i++) arr = arr[path[i]];
    if (direction === 'up' && idx > 0) {
      const temp = arr[idx]; arr[idx] = arr[idx - 1]; arr[idx - 1] = temp;
    } else if (direction === 'down' && idx < arr.length - 1) {
      const temp = arr[idx]; arr[idx] = arr[idx + 1]; arr[idx + 1] = temp;
    }
    setFormData(newData);
  };

  const removeItem = (path: string[], idx: number) => {
    const newData = { ...formData };
    let arr = newData;
    for (let i = 0; i < path.length; i++) arr = arr[path[i]];
    arr.splice(idx, 1);
    setFormData(newData);
  };

  const addItem = (path: string[], template: any) => {
    const newData = { ...formData };
    let arr = newData;
    for (let i = 0; i < path.length; i++) arr = arr[path[i]];
    arr.push(template);
    setFormData(newData);
  };

  return (
    <div className="max-w-4xl pb-32">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Policy Settings</h1>
          <p className="text-sm text-[#1A1A1A]/50">
            目前資料來源 (Source): 
            <span className={`ml-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest ${source === 'firestore' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
              {source}
            </span>
          </p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-[#1A1A1A] text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} /> {saving ? '儲存中...' : '儲存變更'}
        </button>
      </div>

      {msg.text && (
        <div className={`p-4 mb-8 text-sm ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {msg.text}
        </div>
      )}

      {/* Hero */}
      <section className="mb-12 bg-white p-6 border border-[#1A1A1A]/10">
        <h2 className="text-lg font-medium mb-6 border-b border-[#1A1A1A]/10 pb-2">Hero 區塊 (Membership 首頁破題)</h2>
        <div className="space-y-4">
          <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">主標題</label><input className="w-full border p-2 text-sm" value={formData.hero.title} onChange={e => handleChange(['hero', 'title'], e.target.value)} /></div>
          <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">副標題 (英文)</label><input className="w-full border p-2 text-sm" value={formData.hero.subtitle} onChange={e => handleChange(['hero', 'subtitle'], e.target.value)} /></div>
          <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">簡介說明</label><textarea className="w-full border p-2 text-sm h-24" value={formData.hero.description} onChange={e => handleChange(['hero', 'description'], e.target.value)} /></div>
        </div>
      </section>

      {/* Audience */}
      <section className="mb-12 bg-white p-6 border border-[#1A1A1A]/10">
        <h2 className="text-lg font-medium mb-6 border-b border-[#1A1A1A]/10 pb-2">誰適合申請 (Audience)</h2>
        <div className="space-y-4 mb-6">
          <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">區塊標題</label><input className="w-full border p-2 text-sm" value={formData.audience.title} onChange={e => handleChange(['audience', 'title'], e.target.value)} /></div>
          <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">說明前言</label><textarea className="w-full border p-2 text-sm h-20" value={formData.audience.description} onChange={e => handleChange(['audience', 'description'], e.target.value)} /></div>
        </div>
        <div className="space-y-2">
          <label className="block text-xs text-[#1A1A1A]/50">清單條件 (Items)</label>
          {formData.audience.items.map((item: string, idx: number) => (
            <div key={idx} className="flex gap-2 items-center bg-[#F7F7F5] p-2">
              <input className="flex-1 border p-2 text-sm bg-white" value={item} onChange={e => handleArrayTextChange(['audience', 'items'], idx, e.target.value)} />
              <button onClick={() => moveItem(['audience', 'items'], idx, 'up')} className="p-2 hover:bg-[#1A1A1A]/10"><ArrowUp size={14}/></button>
              <button onClick={() => moveItem(['audience', 'items'], idx, 'down')} className="p-2 hover:bg-[#1A1A1A]/10"><ArrowDown size={14}/></button>
              <button onClick={() => removeItem(['audience', 'items'], idx)} className="p-2 hover:bg-red-100 text-red-600"><Trash2 size={14}/></button>
            </div>
          ))}
          <button onClick={() => addItem(['audience', 'items'], '新條件')} className="mt-2 text-sm text-[#5A6B58] flex items-center gap-1 hover:underline"><Plus size={14}/> 新增條件</button>
        </div>
      </section>

      {/* Process */}
      <section className="mb-12 bg-white p-6 border border-[#1A1A1A]/10">
        <h2 className="text-lg font-medium mb-6 border-b border-[#1A1A1A]/10 pb-2">申請後流程與審核說明 (Process)</h2>
        <div className="mb-6">
          <label className="block text-xs text-[#1A1A1A]/50 mb-1">區塊標題</label>
          <input className="w-full border p-2 text-sm" value={formData.process.title} onChange={e => handleChange(['process', 'title'], e.target.value)} />
        </div>
        <div className="space-y-4">
          <label className="block text-xs text-[#1A1A1A]/50">流程步驟 (Steps)</label>
          {formData.process.steps.map((step: any, idx: number) => (
            <div key={idx} className="bg-[#F7F7F5] border border-[#1A1A1A]/10 p-4 relative">
              <div className="absolute right-2 top-2 flex gap-1">
                <button onClick={() => moveItem(['process', 'steps'], idx, 'up')} className="p-1 hover:bg-[#1A1A1A]/10"><ArrowUp size={14}/></button>
                <button onClick={() => moveItem(['process', 'steps'], idx, 'down')} className="p-1 hover:bg-[#1A1A1A]/10"><ArrowDown size={14}/></button>
                <button onClick={() => removeItem(['process', 'steps'], idx)} className="p-1 hover:bg-red-100 text-red-600"><Trash2 size={14}/></button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2 pr-24">
                <div><label className="text-[10px] uppercase text-[#1A1A1A]/50">標籤 (Label)</label><input className="w-full border p-1 text-sm bg-white" value={step.label} onChange={e => handleArrayObjChange(['process', 'steps'], idx, 'label', e.target.value)} /></div>
                <div><label className="text-[10px] uppercase text-[#1A1A1A]/50">標題 (Title)</label><input className="w-full border p-1 text-sm bg-white" value={step.title} onChange={e => handleArrayObjChange(['process', 'steps'], idx, 'title', e.target.value)} /></div>
              </div>
              <label className="text-[10px] uppercase text-[#1A1A1A]/50">內容 (Content)</label>
              <textarea className="w-full border p-1 text-sm bg-white h-20" value={step.content} onChange={e => handleArrayObjChange(['process', 'steps'], idx, 'content', e.target.value)} />
            </div>
          ))}
          <button onClick={() => addItem(['process', 'steps'], { id: Date.now().toString(), label: 'New Step', title: '新步驟', content: '' })} className="text-sm text-[#5A6B58] flex items-center gap-1 hover:underline"><Plus size={14}/> 新增步驟</button>
        </div>
      </section>

      {/* Approved Benefits */}
      <section className="mb-12 bg-white p-6 border border-[#1A1A1A]/10">
        <h2 className="text-lg font-medium mb-6 border-b border-[#1A1A1A]/10 pb-2">核准後解鎖功能 (Approved Benefits)</h2>
        <div className="mb-6">
          <label className="block text-xs text-[#1A1A1A]/50 mb-1">區塊標題</label>
          <input className="w-full border p-2 text-sm" value={formData.approvedBenefits.title} onChange={e => handleChange(['approvedBenefits', 'title'], e.target.value)} />
        </div>
        <div className="space-y-4">
          {formData.approvedBenefits.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-[#F7F7F5] border border-[#1A1A1A]/10 p-4 relative">
              <div className="absolute right-2 top-2 flex gap-1">
                <button onClick={() => moveItem(['approvedBenefits', 'items'], idx, 'up')} className="p-1 hover:bg-[#1A1A1A]/10"><ArrowUp size={14}/></button>
                <button onClick={() => moveItem(['approvedBenefits', 'items'], idx, 'down')} className="p-1 hover:bg-[#1A1A1A]/10"><ArrowDown size={14}/></button>
                <button onClick={() => removeItem(['approvedBenefits', 'items'], idx)} className="p-1 hover:bg-red-100 text-red-600"><Trash2 size={14}/></button>
              </div>
              <div className="mb-2 pr-24">
                <label className="text-[10px] uppercase text-[#1A1A1A]/50">標題 (Title)</label>
                <input className="w-full border p-1 text-sm bg-white" value={item.title} onChange={e => handleArrayObjChange(['approvedBenefits', 'items'], idx, 'title', e.target.value)} />
              </div>
              <label className="text-[10px] uppercase text-[#1A1A1A]/50">內容 (Content)</label>
              <textarea className="w-full border p-1 text-sm bg-white h-20" value={item.content} onChange={e => handleArrayObjChange(['approvedBenefits', 'items'], idx, 'content', e.target.value)} />
            </div>
          ))}
          <button onClick={() => addItem(['approvedBenefits', 'items'], { title: '新權益', content: '' })} className="text-sm text-[#5A6B58] flex items-center gap-1 hover:underline"><Plus size={14}/> 新增權益</button>
        </div>
      </section>

      {/* Cross-page Shared Copies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white p-6 border border-[#1A1A1A]/10">
          <h2 className="text-lg font-medium mb-6 border-b border-[#1A1A1A]/10 pb-2">Login 頁預告區</h2>
          <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">提示文字</label><textarea className="w-full border p-2 text-sm h-32" value={formData.loginNotice.text} onChange={e => handleChange(['loginNotice', 'text'], e.target.value)} /></div>
        </section>

        <section className="bg-white p-6 border border-[#1A1A1A]/10">
          <h2 className="text-lg font-medium mb-6 border-b border-[#1A1A1A]/10 pb-2">Member 頁 Pending 橫幅</h2>
          <div className="space-y-4">
            <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">橫幅標題</label><input className="w-full border p-2 text-sm" value={formData.pendingBanner.title} onChange={e => handleChange(['pendingBanner', 'title'], e.target.value)} /></div>
            <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">橫幅內容</label><textarea className="w-full border p-2 text-sm h-32" value={formData.pendingBanner.description} onChange={e => handleChange(['pendingBanner', 'description'], e.target.value)} /></div>
          </div>
        </section>
      </div>
    </div>
  );
}

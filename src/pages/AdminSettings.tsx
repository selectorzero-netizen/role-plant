import React, { useState, useEffect } from 'react';
import { usePolicy } from '../PolicyContext';
import { policyService } from '../services/policyService';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, AlertTriangle, Eye, X, CheckCircle2 } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', name: '首頁門面引導' },
  { id: 'audience', name: '申請受眾與門檻' },
  { id: 'process', name: '會員審核流程' },
  { id: 'approvedBenefits', name: '核准後專屬權益' },
  { id: 'notices', name: '系統預告與橫幅區' }
];

export function AdminSettings() {
  const { membershipPolicy, source } = usePolicy();
  const [formData, setFormData] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('hero');
  
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!originalData && membershipPolicy) {
      const dataCopy = JSON.parse(JSON.stringify(membershipPolicy));
      setFormData(dataCopy);
      setOriginalData(dataCopy);
    }
  }, [membershipPolicy]);

  const getDirtySections = () => {
    if (!originalData || !formData) return [];
    const dirty = [];
    if (JSON.stringify(originalData.hero) !== JSON.stringify(formData.hero)) dirty.push('首頁門面引導');
    if (JSON.stringify(originalData.audience) !== JSON.stringify(formData.audience)) dirty.push('申請受眾與門檻');
    if (JSON.stringify(originalData.process) !== JSON.stringify(formData.process)) dirty.push('會員審核流程');
    if (JSON.stringify(originalData.approvedBenefits) !== JSON.stringify(formData.approvedBenefits)) dirty.push('核准後專屬權益');
    if (JSON.stringify(originalData.loginNotice) !== JSON.stringify(formData.loginNotice) || 
        JSON.stringify(originalData.pendingBanner) !== JSON.stringify(formData.pendingBanner)) {
      dirty.push('系統預告與橫幅區');
    }
    return dirty;
  };

  const dirtySections = getDirtySections();
  const isDirty = dirtySections.length > 0;

  // Warn on tab close if dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  if (!formData) return <div className="p-12 text-[#1A1A1A]/50 tracking-widest uppercase">Loading Settings...</div>;

  const handleSaveConfirm = async () => {
    setSaving(true);
    setSuccessMsg('');
    try {
      await policyService.saveMembershipPolicy(formData);
      setOriginalData(JSON.parse(JSON.stringify(formData)));
      setShowConfirmModal(false);
      setSuccessMsg(`更新成功！以下區塊已即時同步至前台：${dirtySections.join('、')}`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      alert(`儲存失敗：${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // State Mutators
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
    <div className="max-w-5xl pb-32">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">會員制度營運設定</h1>
          <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/60">
            <span>前台讀取來源：</span>
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest ${source === 'firestore' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
              {source}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={() => setShowConfirmModal(true)} 
            disabled={!isDirty || saving}
            className={`px-6 py-3 text-sm tracking-widest uppercase transition-colors flex items-center gap-2 
              ${isDirty ? 'bg-[#1A1A1A] text-white hover:bg-[#5A6B58]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            {saving ? '處理中...' : <><Save size={16} /> 預覽並發佈變更</>}
          </button>
          {isDirty && <span className="text-xs text-orange-600 flex items-center gap-1"><AlertTriangle size={12}/> 有尚未發佈的變更</span>}
        </div>
      </div>

      {successMsg && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          <p className="text-sm leading-relaxed">{successMsg}</p>
        </div>
      )}

      {/* Main Layout: Sidebar Tabs + Content Area */}
      <div className="flex gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="w-64 shrink-0 flex flex-col gap-1 sticky top-8">
          {SECTIONS.map(sec => {
            const secIsDirty = dirtySections.includes(sec.name);
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`text-left px-4 py-3 text-sm transition-colors border-l-2 flex justify-between items-center
                  ${activeTab === sec.id ? 'border-[#5A6B58] bg-[#5A6B58]/5 text-[#1A1A1A] font-medium' : 'border-transparent text-[#1A1A1A]/60 hover:bg-gray-50'}
                `}
              >
                <span>{sec.name}</span>
                {secIsDirty && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 border border-[#1A1A1A]/10 shadow-sm">
          
          {/* TAB: HERO */}
          {activeTab === 'hero' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-medium mb-6">首頁門面引導</h2>
              <p className="text-sm text-[#1A1A1A]/50 mb-8 border-b border-[#1A1A1A]/10 pb-4">此區塊控制未登入訪客在 /membership 頁面頂端看到的主視覺宣告。</p>
              <div className="space-y-6">
                <div><label className="block text-sm font-medium mb-2">主標題</label><input className="w-full border p-3 text-sm focus:border-[#5A6B58] outline-none transition-colors" value={formData.hero.title} onChange={e => handleChange(['hero', 'title'], e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-2">副標題 (英文視覺點綴)</label><input className="w-full border p-3 text-sm focus:border-[#5A6B58] outline-none transition-colors" value={formData.hero.subtitle} onChange={e => handleChange(['hero', 'subtitle'], e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-2">立意宣告與簡介</label><textarea className="w-full border p-3 text-sm h-32 focus:border-[#5A6B58] outline-none transition-colors" value={formData.hero.description} onChange={e => handleChange(['hero', 'description'], e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* TAB: AUDIENCE */}
          {activeTab === 'audience' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-medium mb-6">申請受眾與門檻</h2>
              <div className="space-y-6 mb-8 border-b border-[#1A1A1A]/10 pb-8">
                <div><label className="block text-sm font-medium mb-2">篩選標題</label><input className="w-full border p-3 text-sm focus:border-[#5A6B58] outline-none" value={formData.audience.title} onChange={e => handleChange(['audience', 'title'], e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-2">門檻前言說明</label><textarea className="w-full border p-3 text-sm h-24 focus:border-[#5A6B58] outline-none" value={formData.audience.description} onChange={e => handleChange(['audience', 'description'], e.target.value)} /></div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">適合加入的條件清單</label>
                  <button onClick={() => addItem(['audience', 'items'], '請填寫新條件')} className="text-sm text-[#5A6B58] flex items-center gap-1 hover:bg-[#5A6B58]/10 px-3 py-1.5 rounded transition-colors"><Plus size={16}/> 加入條件</button>
                </div>
                <div className="space-y-4">
                  {formData.audience.items.map((item: string, idx: number) => (
                    <div key={idx} className="group bg-[#F7F7F5] border border-transparent hover:border-[#1A1A1A]/10 p-4 transition-colors">
                      <div className="flex gap-4 items-start">
                        <span className="text-[#1A1A1A]/30 font-mono mt-2">{(idx + 1).toString().padStart(2, '0')}</span>
                        <input className="flex-1 border p-3 text-sm bg-white focus:border-[#5A6B58] outline-none" value={item} onChange={e => handleArrayTextChange(['audience', 'items'], idx, e.target.value)} />
                      </div>
                      <div className="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => moveItem(['audience', 'items'], idx, 'up')} className="text-xs text-[#1A1A1A]/50 hover:text-[#1A1A1A] flex items-center gap-1"><ArrowUp size={14}/> 向上移</button>
                        <button onClick={() => moveItem(['audience', 'items'], idx, 'down')} className="text-xs text-[#1A1A1A]/50 hover:text-[#1A1A1A] flex items-center gap-1"><ArrowDown size={14}/> 向下移</button>
                        <span className="w-px h-4 bg-[#1A1A1A]/10 mx-2"></span>
                        <button onClick={() => removeItem(['audience', 'items'], idx)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"><Trash2 size={14}/> 移除此條件</button>
                      </div>
                    </div>
                  ))}
                  {formData.audience.items.length === 0 && <p className="text-sm text-[#1A1A1A]/50 p-4 bg-gray-50 text-center">目前無任何條件，前台將不顯示此清單。</p>}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROCESS */}
          {activeTab === 'process' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-medium mb-6">會員審核流程</h2>
              <div className="mb-8 border-b border-[#1A1A1A]/10 pb-8">
                <label className="block text-sm font-medium mb-2">流程區塊標題</label>
                <input className="w-full border p-3 text-sm focus:border-[#5A6B58] outline-none" value={formData.process.title} onChange={e => handleChange(['process', 'title'], e.target.value)} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">申請與審核步驟拆解</label>
                  <button onClick={() => addItem(['process', 'steps'], { id: Date.now().toString(), label: `Step ${formData.process.steps.length + 1}`, title: '請輸入標題', content: '請輸入步驟細節...' })} className="text-sm text-[#5A6B58] flex items-center gap-1 hover:bg-[#5A6B58]/10 px-3 py-1.5 rounded transition-colors"><Plus size={16}/> 增加步驟</button>
                </div>
                <div className="space-y-6">
                  {formData.process.steps.map((step: any, idx: number) => (
                    <div key={idx} className="bg-white border border-[#1A1A1A]/10 p-5 group hover:border-[#5A6B58]/50 transition-colors shadow-sm">
                      <div className="flex justify-between items-center mb-4 border-b border-[#1A1A1A]/5 pb-3">
                        <span className="text-sm font-mono text-[#5A6B58] bg-[#5A6B58]/10 px-2 py-1 rounded">步驟 {idx + 1}</span>
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveItem(['process', 'steps'], idx, 'up')} className="text-xs text-[#1A1A1A]/50 hover:text-[#1A1A1A] flex items-center gap-1"><ArrowUp size={14}/> 上移</button>
                          <button onClick={() => moveItem(['process', 'steps'], idx, 'down')} className="text-xs text-[#1A1A1A]/50 hover:text-[#1A1A1A] flex items-center gap-1"><ArrowDown size={14}/> 下移</button>
                          <button onClick={() => removeItem(['process', 'steps'], idx)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 ml-2"><Trash2 size={14}/> 刪除步驟</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">外觀標籤 (例如：Step 1)</label><input className="w-full border-b p-2 text-sm focus:border-[#5A6B58] outline-none bg-gray-50/50" value={step.label} onChange={e => handleArrayObjChange(['process', 'steps'], idx, 'label', e.target.value)} /></div>
                        <div><label className="block text-xs text-[#1A1A1A]/50 mb-1">步驟大標</label><input className="w-full border-b p-2 text-sm focus:border-[#5A6B58] outline-none bg-gray-50/50" value={step.title} onChange={e => handleArrayObjChange(['process', 'steps'], idx, 'title', e.target.value)} /></div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#1A1A1A]/50 mb-1">具體說明內容</label>
                        <textarea className="w-full border p-3 text-sm h-24 focus:border-[#5A6B58] outline-none bg-gray-50/50" value={step.content} onChange={e => handleArrayObjChange(['process', 'steps'], idx, 'content', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  {formData.process.steps.length === 0 && <p className="text-sm text-[#1A1A1A]/50 p-6 border border-dashed border-[#1A1A1A]/20 text-center">無任何步驟。點擊右上角新增。</p>}
                </div>
              </div>
            </div>
          )}

          {/* TAB: BENEFITS */}
          {activeTab === 'approvedBenefits' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-medium mb-6">核准後專屬權益</h2>
              <div className="mb-8 border-b border-[#1A1A1A]/10 pb-8">
                <label className="block text-sm font-medium mb-2">權益區塊標題</label>
                <input className="w-full border p-3 text-sm focus:border-[#5A6B58] outline-none" value={formData.approvedBenefits.title} onChange={e => handleChange(['approvedBenefits', 'title'], e.target.value)} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">解鎖權益細項</label>
                  <button onClick={() => addItem(['approvedBenefits', 'items'], { title: '新專屬權益', content: '權益詳情...' })} className="text-sm text-[#5A6B58] flex items-center gap-1 hover:bg-[#5A6B58]/10 px-3 py-1.5 rounded transition-colors"><Plus size={16}/> 加入一項權益</button>
                </div>
                <div className="space-y-4">
                  {formData.approvedBenefits.items.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white border border-[#1A1A1A]/20 p-5 group hover:border-[#5A6B58]/50 transition-all shadow-sm flex gap-6">
                      <div className="pt-2 text-[#5A6B58]">❖</div>
                      <div className="flex-1">
                         <input className="w-full font-medium text-base mb-2 border-b border-transparent hover:border-[#1A1A1A]/20 focus:border-[#5A6B58] outline-none bg-transparent" value={item.title} onChange={e => handleArrayObjChange(['approvedBenefits', 'items'], idx, 'title', e.target.value)} />
                         <textarea className="w-full text-sm text-[#1A1A1A]/70 border border-transparent hover:border-[#1A1A1A]/10 focus:border-[#5A6B58] outline-none h-20 p-2 bg-gray-50/50" value={item.content} onChange={e => handleArrayObjChange(['approvedBenefits', 'items'], idx, 'content', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity border-l border-[#1A1A1A]/5 pl-4 justify-center">
                        <button onClick={() => moveItem(['approvedBenefits', 'items'], idx, 'up')} className="p-2 border border-[#1A1A1A]/10 hover:bg-[#1A1A1A]/5 rounded" title="向上排列"><ArrowUp size={14}/></button>
                        <button onClick={() => moveItem(['approvedBenefits', 'items'], idx, 'down')} className="p-2 border border-[#1A1A1A]/10 hover:bg-[#1A1A1A]/5 rounded" title="向下排列"><ArrowDown size={14}/></button>
                        <button onClick={() => removeItem(['approvedBenefits', 'items'], idx)} className="p-2 border border-red-100 text-red-500 hover:bg-red-50 rounded mt-auto" title="刪除權益"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                  {formData.approvedBenefits.items.length === 0 && <p className="text-sm text-[#1A1A1A]/50 p-6 border border-dashed text-center">目前未設定任何權益。</p>}
                </div>
              </div>
            </div>
          )}

          {/* TAB: NOTICES */}
          {activeTab === 'notices' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-medium mb-6">系統預告與橫幅區</h2>
              <p className="text-sm text-[#1A1A1A]/50 mb-8 border-b border-[#1A1A1A]/10 pb-4">管理系統過渡狀態的說明文案，降低使用者等待的焦慮感。</p>
              
              <div className="space-y-12">
                <section>
                  <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#1A1A1A]"></span> 登入預告 (Login 頁面)
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/50 mb-3 ml-3">位置：顯示於 /login 頁面 Google 授權按鈕下方。</p>
                  <div className="ml-3"><textarea className="w-full border p-3 text-sm h-32 focus:border-[#5A6B58] outline-none" value={formData.loginNotice.text} onChange={e => handleChange(['loginNotice', 'text'], e.target.value)} /></div>
                </section>

                <section>
                  <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-orange-400"></span> 審核中狀態 (Pending Banner)
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/50 mb-3 ml-3">位置：申請者初次登入進入 /member 時看到的黃底說明區塊。</p>
                  <div className="ml-3 space-y-4">
                    <div><label className="block text-xs font-medium mb-1">橫幅主標</label><input className="w-full border p-3 text-sm focus:border-orange-400 outline-none" value={formData.pendingBanner.title} onChange={e => handleChange(['pendingBanner', 'title'], e.target.value)} /></div>
                    <div><label className="block text-xs font-medium mb-1">詳細安撫說明</label><textarea className="w-full border p-3 text-sm h-32 focus:border-orange-400 outline-none" value={formData.pendingBanner.description} onChange={e => handleChange(['pendingBanner', 'description'], e.target.value)} /></div>
                  </div>
                </section>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Preview Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/40 flex items-center justify-center p-6 z-50 animate-in fade-in">
          <div className="bg-white max-w-lg w-full p-8 shadow-xl">
            <h2 className="text-2xl font-light mb-2 flex items-center gap-2">
              <Eye className="text-[#5A6B58]" /> 發佈變更摘要
            </h2>
            <p className="text-sm text-[#1A1A1A]/60 mb-6">系統偵測到以下區塊已被修改，按下確定後將會直接覆蓋現有的營運文案並即時生效：</p>
            
            <ul className="mb-8 space-y-2 bg-[#F7F7F5] p-4 border border-[#1A1A1A]/10">
              {dirtySections.map((sec, i) => (
                <li key={i} className="text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> {sec}
                </li>
              ))}
            </ul>

            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowConfirmModal(false)} className="px-6 py-2.5 text-sm uppercase tracking-widest border border-[#1A1A1A]/20 hover:bg-gray-50 transition-colors">
                返回繼續編輯
              </button>
              <button 
                onClick={handleSaveConfirm}
                disabled={saving}
                className="px-6 py-2.5 text-sm uppercase tracking-widest bg-[#1A1A1A] text-white hover:bg-[#5A6B58] transition-colors disabled:opacity-50"
              >
                {saving ? '寫入中...' : '確定發佈'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

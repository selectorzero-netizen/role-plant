/**
 * AdminTaxonomy.tsx
 * 
 * Management interface for categories and grades.
 */
import React, { useState, useEffect } from 'react';
import { taxonomyService } from '../services/taxonomyService';
import { Taxonomy, TaxonomyType } from '../types';
import { 
  Plus, 
  Save, 
  Trash2, 
  GripVertical, 
  CheckCircle, 
  XCircle,
  Settings,
  Tag,
  Award,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { auditService } from '../services/auditService';

export function AdminTaxonomy() {
  const [activeTab, setActiveTab] = useState<TaxonomyType>('plant_category');
  const [items, setItems] = useState<Taxonomy[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { userProfile } = useAuth();
  
  // Local state for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Taxonomy>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await taxonomyService.getByType(activeTab, false);
      setItems(data);
    } catch (error) {
      console.error("Error fetching taxonomy:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const handleAdd = async () => {
    if (!editForm.label || !editForm.key) return;
    setSaving(true);
    try {
      const newItem = {
        type: activeTab,
        key: editForm.key,
        label: editForm.label,
        sortOrder: editForm.sortOrder || items.length + 1,
        isActive: true
      };
      await taxonomyService.create(newItem);
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'create',
          entityType: 'content', // using content for taxonomy
          entityId: 'taxonomy',
          details: `Created taxonomy item: ${activeTab}/${editForm.label}`,
          after: newItem
        });
      }

      setShowAddForm(false);
      setEditForm({});
      fetchItems();
    } catch (error) {
      console.error("Add failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const original = items.find(i => i.id === id);
      await taxonomyService.update(id, editForm);
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: id,
          details: `Updated taxonomy item: ${activeTab}/${editForm.label || original?.label}`,
          before: original,
          after: { ...original, ...editForm }
        });
      }

      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (item: Taxonomy) => {
    try {
      await taxonomyService.update(item.id, { isActive: !item.isActive });
      
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'update',
          entityType: 'content',
          entityId: item.id,
          details: `${item.isActive ? 'Deactivated' : 'Activated'} taxonomy: ${activeTab}/${item.label}`
        });
      }
      fetchItems();
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  const handleDelete = async (item: Taxonomy) => {
    if (!confirm('確定要刪除此分類嗎？這可能會影響到已關聯的資料。')) return;
    try {
      await taxonomyService.delete(item.id);
      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'delete',
          entityType: 'content',
          entityId: item.id,
          details: `Deleted taxonomy: ${activeTab}/${item.label}`
        });
      }
      fetchItems();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const renderTab = (type: TaxonomyType, label: string, Icon: any) => (
    <button
      onClick={() => setActiveTab(type)}
      className={`flex items-center gap-2 px-6 py-4 text-xs font-medium uppercase tracking-widest transition-all border-b-2 ${
        activeTab === type 
          ? 'border-[#1A1A1A] text-[#1A1A1A]' 
          : 'border-transparent text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">分類與分級管理</h1>
          <p className="text-[#1A1A1A]/40 text-sm font-light uppercase tracking-widest">Taxonomy Management</p>
        </div>
        <button 
          onClick={() => { setShowAddForm(true); setEditForm({ sortOrder: items.length + 1 }); }}
          className="bg-[#1A1A1A] text-white px-6 py-2 text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#5A6B58] transition-colors"
        >
          <Plus size={16} /> 新增項目
        </button>
      </div>

      <div className="bg-white border border-[#1A1A1A]/5">
        <div className="flex border-b border-[#1A1A1A]/5">
          {renderTab('plant_category', '植物分類', Tag)}
          {renderTab('plant_grade', '植物分級', Award)}
          {renderTab('post_category', '文章分類', BookOpen)}
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-12 text-[#1A1A1A]/20 uppercase tracking-widest text-xs">Loading...</div>
          ) : (
            <div className="space-y-4">
              {/* Add Form */}
              {showAddForm && (
                <div className="flex items-center gap-4 bg-[#F7F7F5] p-4 border border-[#1A1A1A]/10 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-4 gap-4 flex-1">
                    <input 
                      type="text" 
                      placeholder="標籤 Label (例如：龍舌蘭)" 
                      value={editForm.label || ''}
                      onChange={e => setEditForm(prev => ({ ...prev, label: e.target.value }))}
                      className="px-3 py-2 text-sm border border-[#1A1A1A]/10 focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <input 
                      type="text" 
                      placeholder="鍵值 Key (例如：agave)" 
                      value={editForm.key || ''}
                      onChange={e => setEditForm(prev => ({ ...prev, key: e.target.value }))}
                      className="px-3 py-2 text-sm border border-[#1A1A1A]/10 focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <input 
                      type="number" 
                      placeholder="排序" 
                      value={editForm.sortOrder || ''}
                      onChange={e => setEditForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                      className="px-3 py-2 text-sm border border-[#1A1A1A]/10 focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleAdd} disabled={saving} className="p-2 bg-[#1A1A1A] text-white hover:bg-[#5A6B58] transition-colors">
                      <Save size={16} />
                    </button>
                    <button onClick={() => setShowAddForm(false)} className="p-2 border border-[#1A1A1A]/10 hover:bg-white transition-colors">
                      <XCircle size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* List */}
              <div className="divide-y divide-[#1A1A1A]/5 border border-[#1A1A1A]/5 rounded">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F7F5] text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold">
                  <div className="col-span-1">排序</div>
                  <div className="col-span-3">標籤 Label</div>
                  <div className="col-span-3">鍵值 Key</div>
                  <div className="col-span-2 text-center">狀態</div>
                  <div className="col-span-3 text-right">操作</div>
                </div>

                {items.length === 0 ? (
                  <div className="px-6 py-12 text-center text-[#1A1A1A]/20 text-xs italic">尚無資料</div>
                ) : (
                  items.map(item => (
                    <div key={item.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${!item.isActive ? 'bg-[#FCFBFA] opacity-50' : 'hover:bg-[#F7F7F5]/50'}`}>
                      {editingId === item.id ? (
                        <>
                          <div className="col-span-1">
                            <input 
                              type="number" 
                              value={editForm.sortOrder ?? item.sortOrder}
                              onChange={e => setEditForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                              className="w-full px-2 py-1 text-xs border border-[#1A1A1A]/10"
                            />
                          </div>
                          <div className="col-span-3">
                            <input 
                              type="text" 
                              value={editForm.label ?? item.label}
                              onChange={e => setEditForm(prev => ({ ...prev, label: e.target.value }))}
                              className="w-full px-2 py-1 text-xs border border-[#1A1A1A]/10"
                            />
                          </div>
                          <div className="col-span-3">
                            <input 
                              type="text" 
                              value={editForm.key ?? item.key}
                              onChange={e => setEditForm(prev => ({ ...prev, key: e.target.value }))}
                              className="w-full px-2 py-1 text-xs border border-[#1A1A1A]/10"
                            />
                          </div>
                          <div className="col-span-2 text-center">
                            {item.isActive ? '啟用' : '停用'}
                          </div>
                          <div className="col-span-3 flex justify-end gap-2">
                            <button onClick={() => handleUpdate(item.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"><Save size={14} /></button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-400 hover:bg-gray-50 rounded transition-colors"><XCircle size={14} /></button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-span-1 text-xs font-mono text-[#1A1A1A]/30">{item.sortOrder}</div>
                          <div className="col-span-3 text-sm font-medium">{item.label}</div>
                          <div className="col-span-3 text-xs font-mono text-[#1A1A1A]/40">{item.key}</div>
                          <div className="col-span-2 text-center">
                            <button onClick={() => handleToggleActive(item)} className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-tighter transition-colors ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                              {item.isActive ? 'Active' : 'Disabled'}
                            </button>
                          </div>
                          <div className="col-span-3 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditingId(item.id); setEditForm(item); }} className="p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"><Settings size={14} /></button>
                            <button onClick={() => handleDelete(item)} className="p-2 text-[#1A1A1A]/20 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

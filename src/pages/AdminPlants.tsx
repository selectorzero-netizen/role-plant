import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { plantService } from '../services/plantService';
import { Plant } from '../types';
import { Plus, Search, Star, Edit3, Image as ImageIcon } from 'lucide-react';

export function AdminPlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const data = await plantService.getAllPlantsAdmin();
      // Sort by newest first
      data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setPlants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleCreateDraft = async () => {
    try {
      const newId = await plantService.createDraftPlant('未命名植株草稿');
      navigate(`/admin/plants/${newId}`);
    } catch (err) {
      alert('建立失敗');
    }
  };

  const handleToggleStatus = async (plant: Plant) => {
    const cycle: Record<string, Plant['status']> = {
      'draft': 'exhibiting',
      'exhibiting': 'sold',
      'sold': 'hidden',
      'hidden': 'draft'
    };
    const nextStatus = cycle[plant.status];
    await plantService.updatePlant(plant.id, { status: nextStatus });
    setPlants(plants.map(p => p.id === plant.id ? { ...p, status: nextStatus } : p));
  };

  const handleToggleFeature = async (plant: Plant) => {
    await plantService.updatePlant(plant.id, { featuredOnHome: !plant.featuredOnHome });
    setPlants(plants.map(p => p.id === plant.id ? { ...p, featuredOnHome: !plant.featuredOnHome } : p));
  };

  const filteredPlants = plants.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search && !(p.name.includes(search) || p.id.includes(search))) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exhibiting': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'hidden': return 'bg-gray-200 text-gray-800';
      case 'draft': default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'exhibiting': return '展出中';
      case 'sold': return '已售出';
      case 'hidden': return '隱藏';
      case 'draft': default: return '草稿';
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">植物檔案庫庫存</h1>
          <p className="text-sm text-[#1A1A1A]/50">管理所有植株的生命週期、前線展出狀態與首頁精選。</p>
        </div>
        <button 
          onClick={handleCreateDraft}
          className="bg-[#1A1A1A] text-white px-5 py-2.5 text-sm tracking-widest flex items-center gap-2 hover:bg-[#5A6B58] transition-colors"
        >
          <Plus size={16} /> 建立植株履歷
        </button>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10 p-4 mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="搜尋名稱或編號..." 
            className="w-full pl-9 pr-4 py-2 text-sm border focus:border-[#5A6B58] outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="border px-4 py-2 text-sm outline-none focus:border-[#5A6B58]"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">所有狀態</option>
          <option value="draft">🟡 草稿</option>
          <option value="exhibiting">🟢 展出中</option>
          <option value="sold">🔴 已售出</option>
          <option value="hidden">⚫ 隱藏</option>
        </select>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F7F7F5] border-b border-[#1A1A1A]/10">
            <tr>
              <th className="p-4 font-medium text-[#1A1A1A]/60">封面</th>
              <th className="p-4 font-medium text-[#1A1A1A]/60">名稱 / ID</th>
              <th className="p-4 font-medium text-[#1A1A1A]/60">狀態 (點擊切換)</th>
              <th className="p-4 font-medium text-[#1A1A1A]/60">分級</th>
              <th className="p-4 font-medium text-[#1A1A1A]/60 text-center">首頁精選</th>
              <th className="p-4 font-medium text-[#1A1A1A]/60 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-400">載入中...</td></tr>
            ) : filteredPlants.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-400">找不到相符的植株</td></tr>
            ) : (
              filteredPlants.map(plant => (
                <tr key={plant.id} className="border-b border-[#1A1A1A]/5 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 bg-gray-200 border border-[#1A1A1A]/10 flex items-center justify-center text-gray-400">
                      {plant.images?.length > 0 ? (
                        <img src={plant.images.find(img => img.isCover)?.url || plant.images[0].url} alt="" className="w-full h-full object-cover" />
                      ) : <ImageIcon size={16} />}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-[#1A1A1A]">{plant.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{plant.id}</div>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleToggleStatus(plant)}
                      className={`px-2.5 py-1 rounded text-xs tracking-wider cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(plant.status)}`}
                    >
                      {getStatusText(plant.status)}
                    </button>
                  </td>
                  <td className="p-4 text-[#1A1A1A]/60">{plant.grade || '-'}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleToggleFeature(plant)} className={`p-2 transition-colors ${plant.featuredOnHome ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}>
                      <Star size={18} fill={plant.featuredOnHome ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => navigate(`/admin/plants/${plant.id}`)}
                      className="text-[#5A6B58] hover:underline flex items-center justify-end gap-1 w-full"
                    >
                      <Edit3 size={14} /> 編輯
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

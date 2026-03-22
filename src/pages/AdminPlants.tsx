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
    <div className="max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">檔案總管 (Plants)</h1>
          <p className="text-sm text-[#1A1A1A]/50">管理所有植株的層級、營運生命週期，與首頁前線展示狀態。</p>
        </div>
        <button 
          onClick={handleCreateDraft}
          className="bg-[#1A1A1A] text-white px-5 py-3 text-sm tracking-widest flex items-center gap-2 hover:bg-[#5A6B58] transition-colors shrink-0"
        >
          <Plus size={16} /> 建立草稿檔案
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        {/* Pill Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {[
            { id: 'all', label: '全部檔案' },
            { id: 'exhibiting', label: '🟢 展出中' },
            { id: 'draft', label: '🟡 草稿' },
            { id: 'sold', label: '🔴 已釋出' },
            { id: 'hidden', label: '⚫ 隱藏' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-4 py-2 text-sm tracking-widest whitespace-nowrap transition-colors border ${
                statusFilter === f.id 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                  : 'bg-white text-[#1A1A1A]/60 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="輸入編號或名稱搜尋..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#1A1A1A]/10 focus:border-[#5A6B58] outline-none transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F7F7F5] border-b border-[#1A1A1A]/10">
              <tr>
                <th className="p-4 font-medium text-[#1A1A1A]/60 w-16">封面</th>
                <th className="p-4 font-medium text-[#1A1A1A]/60">識別名稱 / 編號</th>
                <th className="p-4 font-medium text-[#1A1A1A]/60">營運狀態</th>
                <th className="p-4 font-medium text-[#1A1A1A]/60">分級屬系</th>
                <th className="p-4 font-medium text-[#1A1A1A]/60 text-center">前台公開</th>
                <th className="p-4 font-medium text-[#1A1A1A]/60 text-center">首頁精選</th>
                <th className="p-4 font-medium text-[#1A1A1A]/60 text-right">管理</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-12 text-center tracking-widest text-[#1A1A1A]/40 uppercase text-xs">載入中 Loading...</td></tr>
              ) : filteredPlants.length === 0 ? (
                <tr><td colSpan={7} className="p-12 text-center tracking-widest text-[#1A1A1A]/40 uppercase text-xs">查無檔案 No Results</td></tr>
              ) : (
                filteredPlants.map(plant => (
                  <tr key={plant.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F7F7F5]/50 transition-colors group">
                    <td className="p-4">
                      <div className="w-12 h-16 bg-[#EBEBE8] border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/30 overflow-hidden relative">
                        {plant.coverImageUrl ? (
                          <img src={plant.coverImageUrl} alt="" className="w-full h-full object-cover" />
                        ) : plant.images?.length > 0 ? (
                          <img src={plant.images.find(img => img.isCover)?.url || plant.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : <ImageIcon size={16} />}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-[#1A1A1A] text-base">{plant.name} {plant.localName && <span className="text-xs text-[#1A1A1A]/50">({plant.localName})</span>}</div>
                      <div className="text-[10px] text-[#1A1A1A]/40 font-mono mt-1">S/N: {plant.serialNumber || plant.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 text-xs tracking-wider border ${getStatusColor(plant.status).includes('green') ? 'border-green-200 bg-green-50 text-green-700' : getStatusColor(plant.status).includes('red') ? 'border-red-200 bg-red-50 text-red-700' : getStatusColor(plant.status).includes('yellow') ? 'border-yellow-200 bg-yellow-50 text-yellow-700' : 'border-gray-200 bg-gray-50 text-gray-700'}`}>
                          {getStatusText(plant.status)}
                        </span>
                        {/* Status Toggle Button (explicitly cycle just to ease operations without deep diving) */}
                        <button 
                          onClick={() => handleToggleStatus(plant)}
                          className="text-[#1A1A1A]/30 hover:text-[#5A6B58] transition-colors p-1 bg-white border border-transparent hover:border-[#5A6B58]/30 rounded-full"
                          title="切換狀態"
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-[#1A1A1A]/80">{plant.grade || '-'}</span>
                        <span className="text-[10px] text-[#1A1A1A]/50">{plant.category || '未分類'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {plant.visibility === 'public' ? (
                        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1">公開</span>
                      ) : (
                        <span className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-1">私密</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleFeature(plant)} 
                        className={`p-2 transition-all duration-300 rounded ${plant.featuredOnHome ? 'bg-yellow-50 border border-yellow-200 shadow-sm' : 'hover:bg-gray-100 border border-transparent'}`}
                      >
                        <Star size={16} fill={plant.featuredOnHome ? '#ca8a04' : 'none'} className={plant.featuredOnHome ? 'text-yellow-600' : 'text-gray-300'} />
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => navigate(`/admin/plants/${plant.id}`)}
                        className="bg-[#1A1A1A] text-white px-4 py-2 text-xs tracking-widest hover:bg-[#5A6B58] transition-colors inline-block"
                      >
                        進入編輯
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

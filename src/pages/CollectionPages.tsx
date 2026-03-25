import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SafeImage, plantDatabase as fallbackDatabase } from '../components/Shared';
import { useAuth } from '../AuthContext';
import { favoritesService } from '../services/favoritesService';
import { memberApplicationService } from '../services/memberApplicationService';
import { plantService } from '../services/plantService';
import { Taxonomy } from '../types';
import { taxonomyService } from '../services/taxonomyService';
import { Filter } from 'lucide-react';

export function CollectionPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('all');
  const [plants, setPlants] = useState<any[]>([]);
  const [categories, setCategories] = useState<Taxonomy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [livePlants, catData] = await Promise.all([
          plantService.getPublicPlants(),
          taxonomyService.getByType('plant_category')
        ]);
        
        if (livePlants.length > 0) {
          setPlants(livePlants);
        } else {
          setPlants(fallbackDatabase);
        }
        setCategories(catData);
      } catch (error) {
        console.error("Error fetching collection data:", error);
        setPlants(fallbackDatabase);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusTabs = [
    { id: 'All', name: '全部', desc: '完整的選拔檔案紀錄。' },
    { id: 'Available', name: '可釋出', desc: '經過完整休眠與生長季觀察，確認健康完成度，目前狀態穩定可供收藏的個體。' },
    { id: 'Observation', name: '觀察中', desc: '正在進行型態調整或剛換盆，需要更多時間確認培育未來性的個體，暫不釋出。' },
    { id: 'Archived', name: '已收藏', desc: '具有特殊表現或已由其他收藏者養護的歷史檔案，保留作為判讀與標準建立的參考。' }
  ];

  const statusMap: Record<string, string> = {
    '培育中': 'Observation',
    'exhibiting': 'Available',
    'sold': 'Archived',
    'hidden': 'Observation',
    '可售': 'Available',
    '已售': 'Archived'
  };

  const filteredPlants = plants.filter(p => {
    // Status Filter
    const mappedStatus = statusMap[p.status] || p.status;
    const statusMatch = filter === 'All' || mappedStatus === filter;
    
    // Taxonomy Category Filter
    const catMatch = catFilter === 'all' || p.category === catFilter;
    
    return statusMatch && catMatch;
  });

  const currentStatus = statusTabs.find(c => c.id === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
      <header className="mb-16 max-w-2xl">
        <h1 className="text-4xl font-light tracking-tight mb-4">選拔檔案</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-6">Collection Archive</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed">
          每一株龜甲龍皆經過長期的觀察與紀錄。我們依據標準建立檔案，確保健康完成度與培育未來性，為收藏者提供透明、可信任的植物資訊。
        </p>
      </header>

      <div className="mb-12 border-b border-[#1A1A1A]/10 pb-8 space-y-8">
        {/* Status Tabs (UI Categories) */}
        <div>
          <div className="flex gap-6 mb-4 overflow-x-auto no-scrollbar">
            {statusTabs.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`text-sm tracking-widest uppercase whitespace-nowrap transition-colors ${filter === cat.id ? 'text-[#1A1A1A] font-medium border-b-2 border-[#1A1A1A] pb-1' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}
              >
                {cat.id} / {cat.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#1A1A1A]/60 font-light">{currentStatus?.desc}</p>
        </div>

        {/* Taxonomy Categories (Botanical Filter) */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1A1A1A]/5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/30 flex items-center gap-2">
            <Filter size={10} /> 屬系篩選 Type:
          </span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setCatFilter('all')}
              className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-colors border ${catFilter === 'all' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#1A1A1A]/10 text-[#1A1A1A]/40 hover:border-[#1A1A1A]/30'}`}
            >
              All 全部
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setCatFilter(cat.key)}
                className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-colors border ${catFilter === cat.key ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#1A1A1A]/10 text-[#1A1A1A]/40 hover:border-[#1A1A1A]/30'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <p className="text-sm tracking-widest uppercase text-[#1A1A1A]/50">載入檔案中... Loading Archive...</p>
        </div>
      ) : filteredPlants.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-[#1A1A1A]/20">
          <p className="text-sm tracking-widest uppercase text-[#1A1A1A]/50">查無植物檔案 No Plants Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredPlants.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/collection/${item.id}`)}>
              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[#EBEBE8] border border-[#1A1A1A]/5">
                {item.coverImageUrl ? (
                  <img src={item.coverImageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : item.images && item.images.length > 0 ? (
                  <img src={item.images.find((i:any) => i.isCover)?.url || item.images[0].url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <SafeImage src={item.image} alt={item.id} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" fallbackText={item.name || item.id} />
                )}
                {item.status === 'sold' && (
                  <div className="absolute top-4 right-4 bg-red-800 text-white text-[10px] uppercase tracking-widest px-2 py-1 shadow shadow-red-900/20">已釋出</div>
                )}
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-mono text-sm mb-1">{item.name} {item.localName && <span className="text-[10px] text-[#1A1A1A]/60">/ {item.localName}</span>}</h3>
                  <p className="text-xs text-[#1A1A1A]/40 font-serif italic truncate">{item.scientificName}</p>
                  <p className="text-[10px] text-[#1A1A1A]/30 font-mono mt-1">{item.serialNumber || item.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1A1A1A]/10">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">分級</p>
                  <p className="font-mono text-sm">{item.grade || 'N/A'}</p>
                </div>
                <div className="text-center border-l border-r border-[#1A1A1A]/10">
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">分類</p>
                  <p className="font-mono text-sm">{item.category?.slice(0,4) || '植物'}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">開放申請</p>
                  <p className="font-mono text-sm">{item.availableForApplication ? 'YES' : 'NO'}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 group-hover:text-[#5A6B58] transition-colors border border-[#1A1A1A]/10 py-2 group-hover:border-[#5A6B58]/30">
                <span>查看資訊</span><ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SinglePlantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [plant, setPlant] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      if (!id) return;
      try {
        // Use plantService for consistency—single source of truth
        const data = await plantService.getPlantById(id);
        if (data) {
          setPlant(data);
        } else {
          // Fallback to static mock data for legacy IDs
          const localPlant = fallbackDatabase.find(p => p.id === id);
          setPlant(localPlant || null);
        }
      } catch (error) {
        console.error("Error fetching plant:", error);
        const localPlant = fallbackDatabase.find(p => p.id === id);
        setPlant(localPlant || null);
      } finally {
        setFetching(false);
      }
    };
    fetchPlant();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (userProfile?.status === 'pending') {
      alert('您的帳號尚在審核中，無法送出申請。');
      return;
    }
    setLoading(true);
    try {
      await memberApplicationService.createApplication({
        userId: user.uid,
        plantId: plant.id,
        requestType: 'application',
        status: 'pending'
      });
      alert('申請已送出，我們將盡快與您聯繫。');
      navigate('/member');
    } catch (error) {
      console.error("Error submitting application:", error);
      alert('申請失敗，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (userProfile?.status === 'pending') {
      alert('您的帳號尚在審核中，無法加入追蹤。');
      return;
    }
    
    const isTracked = userProfile?.favorites?.includes(plant.id);
    if (isTracked) {
      navigate('/member');
      return;
    }

    setLoading(true);
    try {
      await favoritesService.addFavorite(user.uid, plant.id);
      navigate('/member');
    } catch (error) {
      console.error("Error tracking plant:", error);
      alert('操作失敗，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  const renderCTA = () => {
    if (!plant) return null;
    const isTracked = userProfile?.favorites?.includes(plant.id);
    
    // Map Firestore status to categories
    const statusMap: Record<string, string> = {
      '培育中': 'Observation',
      '可申請': 'Available',
      '可售': 'Available',
      '保留中': 'Observation',
      '已售': 'Archived',
      'Archive': 'Archived'
    };
    
    const mappedStatus = statusMap[plant.status] || plant.status;

    switch (mappedStatus) {
      case 'Available':
        return (
          <button onClick={handleApply} disabled={loading} className="w-full bg-[#1A1A1A] text-[#EAE8E3] py-5 text-xs tracking-widest uppercase hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 border border-[#1A1A1A]">
            {loading ? '處理中...' : '提交檔案檢閱與申請'}
          </button>
        );
      case 'Observation':
        return (
          <button onClick={handleTrack} disabled={loading} className={`w-full py-5 text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${isTracked ? 'bg-[#1A1A1A] text-[#EAE8E3]' : 'border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]'}`}>
            {loading ? '處理中...' : (isTracked ? '追蹤名錄已收錄' : '寫入個人追蹤名錄')}
          </button>
        );
      case 'Archived':
      default:
        return (
           <div className="w-full text-center border-t border-b border-[#1A1A1A]/10 py-5">
             <span className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 font-mono">STATUS: {plant.status.toUpperCase()} (檔案已封存)</span>
           </div>
        );
    }
  };

  if (fetching) {
    return <div className="min-h-screen bg-[#EAE8E3] flex justify-center items-center text-[#1A1A1A]/50 text-xs tracking-widest uppercase font-mono">Reading Data...</div>;
  }

  if (!plant) {
    return <div className="min-h-screen bg-[#EAE8E3] flex justify-center items-center text-[#1A1A1A]/50 text-xs tracking-widest uppercase font-mono">No Records Found.</div>;
  }

  // 1. 主圖區 (Main Image Area) fallback logic
  const hasImages = plant.images && plant.images.length > 0;
  const coverImage = plant.coverImageUrl || (hasImages ? plant.images.find((i:any) => i.isCover)?.url || plant.images[0].url : plant.image);

  return (
    <div className="bg-[#EAE8E3] min-h-screen text-[#1A1A1A] pb-32">
      
      {/* Navbar/Header Return */}
      <div className="px-6 md:px-12 py-8 flex justify-between items-center border-b border-[#1A1A1A]/10">
        <button onClick={() => navigate('/collection')} className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors font-medium">
          <ArrowLeft size={16} /><span>返回總覽</span>
        </button>
        <span className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 font-mono">Role Plant Archive</span>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* 1. 主圖區 */}
        <div className="lg:col-span-7">
          {coverImage ? (
            <div className="aspect-[4/5] md:aspect-auto md:h-[80vh] bg-[#DCD7C9] overflow-hidden sticky top-8">
               <img src={coverImage} alt={plant.name} className="w-full h-full object-cover filter contrast-110 saturate-50" />
            </div>
          ) : (
             <div className="aspect-[4/5] md:aspect-auto md:h-[80vh] bg-[#DCD7C9] flex items-center justify-center border border-[#1A1A1A]/10 sticky top-8">
               <span className="text-[10px] font-mono tracking-widest text-[#1A1A1A]/30">/ 無相片紀錄 /</span>
             </div>
          )}
        </div>

        {/* Right Column: Data & Actions */}
        <div className="lg:col-span-5 flex flex-col pt-4 md:pt-8 min-h-[80vh]">
          
          {/* 2. 基本檔案區 (Basic Profile Area) */}
          <div className="mb-16 border-b border-[#1A1A1A]/10 pb-12">
            <div className="mb-4">
              <p className="text-[10px] text-[#1A1A1A]/50 font-mono uppercase tracking-widest">S/N: {plant.serialNumber || plant.id}</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2 leading-tight">{plant.name}</h1>
            <p className="text-sm text-[#1A1A1A]/60 italic mb-6 font-serif">{plant.scientificName}</p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-12 bg-[#1A1A1A]/[0.02] p-6 border border-[#1A1A1A]/5">
               {plant.localName && (
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1 font-mono">Local Name</span>
                   <span className="text-sm font-medium">{plant.localName}</span>
                 </div>
               )}
               {plant.category && (
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1 font-mono">Category</span>
                   <span className="text-sm font-medium flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]"></span>
                     {plant.category}
                   </span>
                 </div>
               )}
               {plant.size && (
                 <div className="min-w-0">
                   <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1 font-mono">Size</span>
                   <span className="text-sm font-light block truncate" title={plant.size}>{plant.size}</span>
                 </div>
               )}
               {plant.source && (
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1 font-mono">Source</span>
                   <span className="text-sm font-light">{plant.source}</span>
                 </div>
               )}
               {plant.grade && (
                 <div>
                   <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1 font-mono">Grade</span>
                   <span className="text-sm font-mono">{plant.grade}</span>
                 </div>
               )}
            </div>
          </div>

          {/* 3. 判讀焦點區 (Evaluation Focus Area) */}
          {(plant.stats?.expression || plant.stats?.balance || plant.stats?.proportion || plant.details?.summary || plant.description) && (
            <div className="mb-16 space-y-8 border-b border-[#1A1A1A]/10 pb-12">
              <h2 className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/50 font-mono flex items-center gap-4">
                Evaluation <span className="flex-1 h-px bg-[#1A1A1A]/10"></span>
              </h2>
              
              {plant.stats && (plant.stats.expression || plant.stats.balance || plant.stats.proportion) && (
                <div className="grid grid-cols-3 gap-px bg-[#1A1A1A]/10 border border-[#1A1A1A]/10">
                  {plant.stats.expression ? (
                    <div className="bg-[#EAE8E3] p-4 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-2">龜甲表現</p>
                      <p className="font-mono text-base">{plant.stats.expression}</p>
                    </div>
                  ) : <div className="bg-[#EAE8E3]"></div>}
                  {plant.stats.balance ? (
                    <div className="bg-[#EAE8E3] p-4 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-2">面相平衡</p>
                      <p className="font-mono text-base">{plant.stats.balance}</p>
                    </div>
                  ) : <div className="bg-[#EAE8E3]"></div>}
                  {plant.stats.proportion ? (
                    <div className="bg-[#EAE8E3] p-4 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-2">塊根比例</p>
                      <p className="font-mono text-base">{plant.stats.proportion}</p>
                    </div>
                  ) : <div className="bg-[#EAE8E3]"></div>}
                </div>
              )}

              {(plant.details?.summary || plant.description) && (
                <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
                  {plant.details?.summary || plant.description}
                </p>
              )}
            </div>
          )}

          {/* 4. 狀態紀錄區 (Status Record Area) */}
          {(plant.details?.suitableFor || plant.details?.cultivationNotes) && (
            <div className="mb-16 space-y-8 border-b border-[#1A1A1A]/10 pb-12">
               <h2 className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/50 font-mono flex items-center gap-4">
                Records <span className="flex-1 h-px bg-[#1A1A1A]/10"></span>
              </h2>
              
              {plant.details?.suitableFor && (
                <div>
                  <h3 className="text-[10px] font-mono mb-2 tracking-widest text-[#1A1A1A]/40 uppercase">適合對象</h3>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">{plant.details.suitableFor}</p>
                </div>
              )}
              {plant.details?.cultivationNotes && (
                <div>
                  <h3 className="text-[10px] font-mono mb-2 tracking-widest text-[#1A1A1A]/40 uppercase">培育提醒</h3>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">{plant.details.cultivationNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* 5. 申請 / 追蹤 CTA */}
          <div className="mt-auto">
            {renderCTA()}

            {/* Admin Backdoor */}
            {(userProfile?.role === 'admin' || userProfile?.role === 'editor') && (
              <div className="mt-16 pt-8 border-t border-[#1A1A1A]/10 text-right">
                <button onClick={() => navigate(`/admin/plants/${plant.id}`)} className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/20 hover:text-[#1A1A1A] transition-colors font-mono">
                  [ System: Edit Profile ]
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

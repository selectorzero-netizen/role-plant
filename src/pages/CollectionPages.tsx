import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SafeImage, plantDatabase as fallbackDatabase } from '../components/Shared';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion, arrayRemove, query, getDocs, getDoc } from 'firebase/firestore';
import { favoritesService } from '../services/favoritesService';
import { memberApplicationService } from '../services/memberApplicationService';

export function CollectionPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        // TODO (Phase 3): Extract to plantService.getPlants()
        const q = query(collection(db, 'plants'));
        const snapshot = await getDocs(q);
        let plantsData = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        
        if (plantsData.length === 0) {
          // 1. Fallback / Mock 資料顯示邏輯：當遠端完全無資料時，直接使用本機備案
          plantsData = fallbackDatabase;
        } else {
          // 2. Firestore 真資料顯示邏輯：向下相容舊資料
          // 若 isPublic 明確為 false 則隱藏；若缺漏此欄位(undefined)或為 true 則視為可見
          plantsData = plantsData.filter(p => p.isPublic !== false);
          // 排除隱藏植物後，進行排序
          plantsData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        }
        setPlants(plantsData);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlants(fallbackDatabase);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const categories = [
    { id: 'All', name: '全部', desc: '完整的龜甲龍選拔檔案紀錄。' },
    { id: 'Available', name: '可釋出', desc: '經過完整休眠與生長季觀察，確認健康完成度，目前狀態穩定可供收藏的個體。' },
    { id: 'Observation', name: '觀察中', desc: '正在進行型態調整或剛換盆，需要更多時間確認培育未來性的個體，暫不釋出。' },
    { id: 'Archived', name: '已收藏', desc: '具有特殊表現或已由其他收藏者養護的歷史檔案，保留作為判讀與標準建立的參考。' }
  ];

  // Map Firestore status to categories
  const statusMap: Record<string, string> = {
    '培育中': 'Observation',
    '可申請': 'Available',
    '可售': 'Available',
    '保留中': 'Observation',
    '已售': 'Archived',
    'Archive': 'Archived'
  };

  const filteredPlants = filter === 'All' ? plants : plants.filter(p => {
    const mappedStatus = statusMap[p.status] || p.status;
    return mappedStatus === filter;
  });
  const currentCategory = categories.find(c => c.id === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
      <header className="mb-16 max-w-2xl">
        <h1 className="text-4xl font-light tracking-tight mb-4">選拔檔案</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-6">Collection Archive</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed">
          每一株龜甲龍皆經過長期的觀察與紀錄。我們依據標準建立檔案，確保健康完成度與培育未來性，為收藏者提供透明、可信任的植物資訊。
        </p>
      </header>

      <div className="mb-12 border-b border-[#1A1A1A]/10 pb-8">
        <div className="flex gap-6 mb-6 overflow-x-auto">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`text-sm tracking-widest uppercase whitespace-nowrap transition-colors ${filter === cat.id ? 'text-[#1A1A1A] font-medium border-b-2 border-[#1A1A1A] pb-1' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}
            >
              {cat.id} / {cat.name}
            </button>
          ))}
        </div>
        <p className="text-sm text-[#1A1A1A]/60 font-light">{currentCategory?.desc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredPlants.map((item) => (
          <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/collection/${item.id}`)}>
            <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[#EBEBE8]">
              <SafeImage src={item.image} alt={item.id} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" fallbackText={item.image.split('/').pop() || ''} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-mono text-sm mb-1">{item.id}</h3>
                <p className="text-xs text-[#1A1A1A]/50 italic">{item.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1A1A1A]/10">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">表現</p>
                <p className="font-mono text-sm">{item.stats.expression}</p>
              </div>
              <div className="text-center border-l border-r border-[#1A1A1A]/10">
                <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">面相</p>
                <p className="font-mono text-sm">{item.stats.balance}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">比例</p>
                <p className="font-mono text-sm">{item.stats.proportion}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 group-hover:text-[#5A6B58] transition-colors border border-[#1A1A1A]/10 py-2 group-hover:border-[#5A6B58]/30">
              <span>查看資訊</span><ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
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
        const docRef = doc(db, 'plants', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlant({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to local database
          const localPlant = fallbackDatabase.find(p => p.id === id);
          if (localPlant) {
            setPlant(localPlant);
          } else {
            navigate('/collection');
          }
        }
      } catch (error) {
        console.error("Error fetching plant:", error);
        const localPlant = fallbackDatabase.find(p => p.id === id);
        if (localPlant) setPlant(localPlant);
      } finally {
        setFetching(false);
      }
    };
    fetchPlant();
  }, [id, navigate]);

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
          <button onClick={handleApply} disabled={loading} className="w-full bg-[#1A1A1A] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors mt-8 disabled:opacity-50">
            {loading ? '處理中...' : '申請收藏此檔案'}
          </button>
        );
      case 'Observation':
        return (
          <button onClick={handleTrack} disabled={loading} className={`w-full py-4 text-sm tracking-widest uppercase transition-colors mt-8 disabled:opacity-50 ${isTracked ? 'bg-[#5A6B58] text-white hover:bg-[#4A5B48]' : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F7F7F5]'}`}>
            {loading ? '處理中...' : (isTracked ? '前往追蹤清單' : '加入追蹤清單')}
          </button>
        );
      case 'Archived':
      default:
        return (
          <button disabled className="w-full bg-[#EBEBE8] text-[#1A1A1A]/40 cursor-not-allowed py-4 text-sm tracking-widest uppercase mt-8">
            已蒙收藏 / 歷史檔案
          </button>
        );
    }
  };

  if (fetching) {
    return <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 text-center text-[#1A1A1A]/50">載入中...</div>;
  }

  if (!plant) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
      <div className="flex justify-between items-center mb-12">
        <button onClick={() => navigate('/collection')} className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
          <ArrowLeft size={14} /><span>返回檔案列表</span>
        </button>
        {(userProfile?.role === 'admin' || userProfile?.role === 'editor') && (
          <button onClick={() => navigate(`/admin/plants/${plant.id}`)} className="text-xs tracking-widest uppercase text-[#5A6B58] hover:underline flex items-center gap-2 border border-[#5A6B58] px-4 py-2">
            編輯植物資料
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="relative aspect-[3/4] bg-[#EBEBE8]">
          <SafeImage src={plant.image} alt={plant.id} className="w-full h-full object-cover" fallbackText={plant.image.split('/').pop() || ''} />
        </div>

        <div>
          <div className="mb-12 border-b border-[#1A1A1A]/10 pb-8">
            <div className="flex justify-between items-start mb-2">
              <h1 className="font-mono text-3xl">{plant.id}</h1>
              <span className={`text-[10px] tracking-widest uppercase px-2 py-1 border ${plant.status === 'Available' ? 'border-[#5A6B58] text-[#5A6B58]' : 'border-[#1A1A1A]/20 text-[#1A1A1A]/50'}`}>
                {plant.status}
              </span>
            </div>
            <p className="text-sm text-[#1A1A1A]/50 italic mb-6">{plant.name}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1">尺寸</span>
                <span className="font-light">{plant.size}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1">來源</span>
                <span className="font-light">{plant.source}</span>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-4">判讀摘要 Evaluation</h3>
              <div className="grid grid-cols-3 gap-4 mb-6 bg-white p-4 border border-[#1A1A1A]/5">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">龜甲表現</p>
                  <p className="font-mono text-lg">{plant.stats.expression}</p>
                </div>
                <div className="text-center border-l border-r border-[#1A1A1A]/10">
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">面相平衡</p>
                  <p className="font-mono text-lg">{plant.stats.balance}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1">塊根比例</p>
                  <p className="font-mono text-lg">{plant.stats.proportion}</p>
                </div>
              </div>
              <p className="text-[#1A1A1A]/80 font-light leading-relaxed text-sm">{plant.details.summary}</p>
            </div>

            <div>
              <h3 className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-3">適合對象 Suitable For</h3>
              <p className="text-[#1A1A1A]/80 font-light leading-relaxed text-sm">{plant.details.suitableFor}</p>
            </div>

            <div>
              <h3 className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-3">培育提醒 Cultivation Notes</h3>
              <p className="text-[#1A1A1A]/80 font-light leading-relaxed text-sm">{plant.details.cultivationNotes}</p>
            </div>

            {renderCTA()}
          </div>
        </div>
      </div>
    </div>
  );
}

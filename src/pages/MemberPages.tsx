import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, User, Heart, Clock, Settings, Shield } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { SafeImage, plantDatabase } from '../components/Shared';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/member');
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError('Google 登入失敗，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  const handleLineLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new OAuthProvider('oidc.line');
      await signInWithPopup(auth, provider);
      navigate('/member');
    } catch (err: any) {
      console.error("LINE auth error:", err);
      setError('LINE 登入失敗，請確認是否已在 Firebase 後台啟用 LINE 登入。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 pt-24 pb-32">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light tracking-tight mb-2">會員登入</h1>
        <p className="text-xs tracking-widest uppercase text-[#1A1A1A]/50">Member Login</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm border border-red-100 text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] py-4 text-sm tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          使用 Google 登入
        </button>

        <button
          onClick={handleLineLogin}
          disabled={loading}
          className="w-full bg-[#06C755] text-white py-4 text-sm tracking-widest hover:bg-[#05b34c] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.115 2.572-5.992zM7.421 13.178h-2.1c-.242 0-.438-.196-.438-.438v-4.872c0-.242.196-.438.438-.438.242 0 .438.196.438.438v4.434h1.662c.242 0 .438.196.438.438 0 .242-.196.438-.438.438zm2.976-.438c0 .242-.196.438-.438.438-.242 0-.438-.196-.438-.438v-4.872c0-.242.196-.438.438-.438.242 0 .438.196.438.438v4.872zm5.021-3.136c0 .242-.196.438-.438.438h-1.662v1.011h1.662c.242 0 .438.196.438.438 0 .242-.196.438-.438.438h-2.1c-.242 0-.438-.196-.438-.438v-4.872c0-.242.196-.438.438-.438h2.1c.242 0 .438.196.438.438 0 .242-.196.438-.438.438h-1.662v.984h1.662c.242 0 .438.196.438.438zm4.434 3.136c0 .242-.196.438-.438.438h-2.1c-.242 0-.438-.196-.438-.438v-4.872c0-.242.196-.438.438-.438.242 0 .438.196.438.438v2.872l1.716-2.964c.063-.109.178-.176.304-.176.242 0 .438.196.438.438v4.872c0 .242-.196.438-.438.438-.242 0-.438-.196-.438-.438v-2.872l-1.716 2.964c-.063.109-.178.176-.304.176z" />
          </svg>
          使用 LINE 登入
        </button>
      </div>
    </div>
  );
}

export function MemberPage() {
  const { userProfile, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'applications' | 'settings'>('favorites');
  const [applications, setApplications] = useState<any[]>([]);
  const [favoritePlants, setFavoritePlants] = useState<any[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && activeTab === 'favorites') {
      import('firebase/firestore').then(({ collection, query, where, getDocs, doc, getDoc }) => {
        const fetchFavs = async () => {
          try {
            const q = query(collection(db, 'favorites'), where('uid', '==', user.uid));
            const snapshot = await getDocs(q);
            const favs = [];
            for (const favDoc of snapshot.docs) {
              const plantId = favDoc.data().plantId;
              try {
                const plantRef = doc(db, 'plants', plantId);
                const plantSnap = await getDoc(plantRef);
                if (plantSnap.exists()) {
                  favs.push({ id: plantSnap.id, ...(plantSnap.data() as any) });
                }
              } catch (err) {
                console.error("Error fetching favorite plant", plantId, err);
              }
            }
            setFavoritePlants(favs);
          } catch (error) {
            console.error("Error fetching favorites:", error);
          }
        };
        fetchFavs();
      });
    }
  }, [user, activeTab]);

  React.useEffect(() => {
    if (user && activeTab === 'applications') {
      import('firebase/firestore').then(({ collection, query, where, getDocs }) => {
        const q = query(collection(db, 'memberApplications'), where('userId', '==', user.uid));
        getDocs(q).then(snapshot => {
          const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setApplications(apps);
        }).catch(err => console.error("Error fetching applications:", err));
      });
    }
  }, [user, activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-32">
      <header className="mb-16 border-b border-[#1A1A1A]/10 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">會員中心</h1>
          <p className="text-xs tracking-widest uppercase text-[#1A1A1A]/50">Member Center</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium mb-1">{userProfile?.name || 'User'}</p>
          <div className="flex items-center gap-2 justify-end">
            <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border ${
              userProfile?.status === 'approved' ? 'border-[#5A6B58] text-[#5A6B58]' : 'border-orange-500 text-orange-500'
            }`}>
              {userProfile?.status === 'approved' ? '正式會員' : '審核中'}
            </span>
            <p className="text-xs text-[#1A1A1A]/50 font-mono">{userProfile?.role || 'member'}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
          {userProfile?.status === 'approved' && (
            <>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`w-full text-left px-4 py-3 text-sm tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'favorites' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#1A1A1A]/5'}`}
              >
                <Heart size={16} />
                <span>追蹤清單</span>
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`w-full text-left px-4 py-3 text-sm tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'applications' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#1A1A1A]/5'}`}
              >
                <Clock size={16} />
                <span>申請紀錄</span>
              </button>
            </>
          )}
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 text-sm tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#1A1A1A]/5'}`}
          >
            <Settings size={16} />
            <span>帳號設定</span>
          </button>
          
          {userProfile?.role === 'admin' && (
            <button 
              onClick={() => navigate('/admin')}
              className="w-full text-left px-4 py-3 text-sm tracking-widest flex items-center gap-3 transition-colors text-[#5A6B58] hover:bg-[#5A6B58]/10 mt-8 border-t border-[#1A1A1A]/10 pt-4"
            >
              <Shield size={16} />
              <span>管理後台</span>
            </button>
          )}

          <button 
            onClick={async () => {
              try {
                await signOut(auth);
                navigate('/');
              } catch (error) {
                console.error("Error signing out:", error);
              }
            }}
            className="w-full text-left px-4 py-3 text-sm tracking-widest flex items-center gap-3 transition-colors text-[#1A1A1A]/50 hover:text-[#1A1A1A] mt-8"
          >
            <LogOut size={16} />
            <span>登出</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {userProfile?.status === 'pending' && activeTab === 'favorites' && (
            <div className="bg-orange-50 border border-orange-100 p-8 text-center rounded-sm">
              <h2 className="text-xl font-light mb-4 text-orange-800">會員資格審核中</h2>
              <p className="text-orange-900/70 text-sm leading-relaxed mb-6">
                您的帳號目前尚未成為正式會員。為確保交流品質與植物知識基礎，我們需確認每位成員的意向。<br />
                成為正式會員後，您才能使用「收藏植物」、「追蹤檔案」以及「發送植物申請」等功能。
              </p>
              <button 
                onClick={async () => {
                   try {
                     const { addDoc, collection } = await import('firebase/firestore');
                     await addDoc(collection(db, 'memberApplications'), {
                       userId: user?.uid,
                       type: 'membership_upgrade',
                       status: 'pending',
                       createdAt: new Date().toISOString()
                     });
                     alert('申請已送出！我們會盡快為您審核。');
                   } catch (e) {
                     alert('申請送出失敗，請稍後再試。');
                   }
                }}
                className="bg-orange-600 text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-orange-700 transition-colors"
              >
                發送正式會員申請
              </button>
            </div>
          )}

          {userProfile?.status === 'approved' && activeTab === 'favorites' && (
            <div>
              <h2 className="text-xl font-light mb-8">追蹤清單</h2>
              {favoritePlants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {favoritePlants.map(plant => (
                    <div key={plant.id} className="group cursor-pointer border border-[#1A1A1A]/10 p-4 flex gap-4" onClick={() => navigate(`/collection/${plant.id}`)}>
                      <div className="w-24 aspect-[3/4] bg-[#EBEBE8] shrink-0">
                        <SafeImage src={plant.image} alt={plant.id} className="w-full h-full object-cover" fallbackText="IMG" />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-mono text-sm mb-1">{plant.id}</h3>
                          <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 border border-[#1A1A1A]/20 text-[#1A1A1A]/50">
                            {plant.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 group-hover:text-[#5A6B58] transition-colors">
                          <span>查看檔案</span><ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#1A1A1A]/50">目前沒有追蹤的植物。</p>
              )}
            </div>
          )}

          {userProfile?.status === 'approved' && activeTab === 'applications' && (
            <div>
              <h2 className="text-xl font-light mb-8">申請紀錄</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10">
                    <tr>
                      <th className="px-4 py-3 font-normal">申請單號</th>
                      <th className="px-4 py-3 font-normal">植物編號</th>
                      <th className="px-4 py-3 font-normal">申請日期</th>
                      <th className="px-4 py-3 font-normal">狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.length > 0 ? applications.map(app => (
                      <tr key={app.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#1A1A1A]/5 transition-colors">
                        <td className="px-4 py-4 font-mono">{app.id.slice(0, 8)}...</td>
                        <td className="px-4 py-4 font-mono cursor-pointer hover:text-[#5A6B58]" onClick={() => navigate(`/collection/${app.plantId}`)}>{app.plantId}</td>
                        <td className="px-4 py-4 text-[#1A1A1A]/70">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-4">
                          <span className="text-xs px-2 py-1 bg-[#EBEBE8] text-[#1A1A1A]/70">{app.status === 'pending' ? '審核中' : app.status}</span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-sm text-[#1A1A1A]/50">目前沒有申請紀錄。</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-md">
              <h2 className="text-xl font-light mb-8">帳號設定</h2>
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newName = formData.get('name') as string;
                if (userProfile && newName !== userProfile.name) {
                  try {
                    await updateDoc(doc(db, 'profiles', userProfile.uid), {
                      name: newName
                    });
                    alert('設定已儲存');
                  } catch (error) {
                    console.error("Error updating profile:", error);
                    alert('儲存失敗，請稍後再試');
                  }
                }
              }}>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">姓名</label>
                  <input type="text" name="name" defaultValue={userProfile?.name} className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">電子郵件 (不可修改)</label>
                  <input type="email" defaultValue={userProfile?.email} disabled className="w-full bg-transparent border-b border-[#1A1A1A]/10 py-3 text-[#1A1A1A]/50 cursor-not-allowed" />
                </div>
                <button type="submit" className="bg-[#1A1A1A] text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors mt-4">
                  儲存變更
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

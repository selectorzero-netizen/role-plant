import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, User, Heart, Clock, Settings, Shield } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { SafeImage, plantDatabase } from '../components/Shared';
// (Firebase Auth imports removed because auth is now abstracted to AuthContext and MSW)
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { profileService } from '../services/profileService';
import { favoritesService } from '../services/favoritesService';
import { memberApplicationService } from '../services/memberApplicationService';
import { usePolicy } from '../PolicyContext';

export function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { membershipPolicy: MEMBERSHIP_POLICY } = usePolicy();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login();
      navigate('/member');
    } catch (err: any) {
      console.error("Login Error:", err);
      import('../firebase').then(({ auth }) => {
        const origin = window.location.origin;
        const pid = auth?.app?.options?.projectId;
        const dom = auth?.app?.options?.authDomain;
        setError(`[${err.code}] ${err.message}. | ORIGIN: ${origin} | PROJ: ${pid} | DOMAIN: ${dom}`);
      });
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
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#1A1A1A] text-white py-4 text-sm tracking-widest hover:bg-[#5A6B58] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? '驗證中...' : '進行 Google 登入'}
        </button>

        {import.meta.env.DEV && (
          <button
            onClick={async () => {
              setLoading(true);
              try {
                const { auth } = await import('../firebase');
                const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
                try {
                  // Attempt to sign in directly
                  await signInWithEmailAndPassword(auth, 'admin@roleplant.dev', 'emulator123');
                } catch (e: any) {
                  // If user doesn't exist in emulator, create it and it will auto-sign in
                  if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
                    await createUserWithEmailAndPassword(auth, 'admin@roleplant.dev', 'emulator123');
                  } else {
                    throw e;
                  }
                }
                navigate('/admin');
              } catch (e: any) {
                setError('DEV Emulator Login Error: ' + e.message);
              } finally {
                setLoading(false);
              }
            }}
            className="w-full bg-red-800 text-white py-4 text-sm tracking-widest hover:bg-red-700 transition-colors mt-2"
          >
            ⚠️ DEV: 一鍵創建並登入 Local Admin
          </button>
        )}
        <p className="text-center text-xs text-[#1A1A1A]/50 mt-4 leading-relaxed whitespace-pre-line">
          {MEMBERSHIP_POLICY.loginNotice.text}
        </p>
      </div>
    </div>
  );
}

export function MemberPage() {
  const { userProfile, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'applications' | 'settings'>('favorites');
  const [applications, setApplications] = useState<any[]>([]);
  const [favoritePlants, setFavoritePlants] = useState<any[]>([]);
  const navigate = useNavigate();
  const { membershipPolicy: MEMBERSHIP_POLICY } = usePolicy();

  React.useEffect(() => {
    if (userProfile?.favorites && userProfile.favorites.length > 0) {
      favoritesService.getFavoritePlants(userProfile.favorites).then(favs => {
        setFavoritePlants(favs);
      }).catch(err => {
        console.error("Error fetching favorites:", err);
        setFavoritePlants([]);
      });
    } else {
      setFavoritePlants([]);
    }
  }, [userProfile]);

  React.useEffect(() => {
    if (user && activeTab === 'applications') {
      memberApplicationService.getApplicationsByUser(user.uid).then(apps => {
        setApplications(apps);
      }).catch(err => {
        console.error("Error fetching applications:", err);
        setApplications([]);
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
          <p className="text-xs text-[#1A1A1A]/50 font-mono">{userProfile?.role || 'member'}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
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
                logout();
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
          {userProfile?.status === 'pending' && (
            <div className="bg-[#EBEBE8] p-6 mb-8 border-l-4 border-[#5A6B58]">
              <h3 className="text-xl font-light mb-2">{MEMBERSHIP_POLICY.pendingBanner.title}</h3>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed whitespace-pre-line">
                {MEMBERSHIP_POLICY.pendingBanner.description}
              </p>
            </div>
          )}
          
          {activeTab === 'favorites' && (
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

          {activeTab === 'applications' && (
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
                    // TODO (Phase 3): Extract to profileService.updateProfile()
                    await profileService.updateProfile(userProfile.uid, {
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const SafeImage = ({ src, alt, className, fallbackText }: { src: string, alt: string, className: string, fallbackText: string }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#EBEBE8] text-[#1A1A1A]/50 p-4 text-center ${className}`}>
        <span className="text-xs tracking-widest uppercase mb-2">Image Missing</span>
        <span className="text-[10px]">{fallbackText}</span>
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
};

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#1A1A1A] font-sans selection:bg-[#5A6B58] selection:text-white flex flex-col justify-center items-center relative">
      <Link to="/" className="absolute top-8 left-6 md:left-12 text-lg tracking-widest font-medium">
        ROLE PLANT<span className="text-[#5A6B58]">.</span>
      </Link>
      
      {import.meta.env.DEV && (
        <div className="fixed top-0 inset-x-0 bg-red-600 text-white text-xs font-mono py-1 px-4 z-[100] flex justify-between tracking-wider shadow-md">
          <span>⚠️ DEV / EMULATOR MODE ACTIVE</span>
          <span>ADMIN SEED: admin@roleplant.dev</span>
        </div>
      )}

      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Collection', path: '/collection', label: '龜甲龍' },
    { name: 'Learn', path: '/learn', label: '判讀與培育' },
    { name: 'Membership', path: '/membership', label: '會員制度' },
    { name: 'About', path: '/about', label: '關於我們' },
    { name: 'Business', path: '/business', label: '合作' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#1A1A1A] font-sans selection:bg-[#5A6B58] selection:text-white flex flex-col pt-6">
      {import.meta.env.DEV && (
        <div className="fixed top-0 inset-x-0 bg-red-600 text-white text-[10px] md:text-sm font-mono py-1 md:py-1.5 px-4 z-[100] flex justify-between tracking-wider shadow-md items-center">
          <span className="font-bold flex items-center gap-2">⚠️ <span className="hidden md:inline">DEVELOPMENT / FIREBASE EMULATOR ACTIVE</span><span className="md:hidden">DEV MODE</span></span>
          <span className="opacity-90 bg-black/20 px-2 py-0.5 rounded">Admin: admin@roleplant.dev</span>
        </div>
      )}

      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#F7F7F5]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'} ${import.meta.env.DEV ? 'top-6' : 'top-0'} py-4`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="text-lg tracking-widest font-medium">
            ROLE PLANT<span className="text-[#5A6B58]">.</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs tracking-[0.15em] uppercase transition-colors hover:text-[#5A6B58] flex items-center gap-2 ${location.pathname.startsWith(link.path) ? 'text-[#5A6B58] font-medium' : 'text-[#1A1A1A]/60'}`}
              >
                <span>{link.name}</span>
                <span className="text-[10px] opacity-50">{link.label}</span>
              </Link>
            ))}
            <div className="w-px h-4 bg-[#1A1A1A]/20 mx-2"></div>
            <div className="w-px h-4 bg-[#1A1A1A]/20 mx-2"></div>
            {(!user || !userProfile) && (
              <Link to="/login" className="text-xs tracking-[0.15em] uppercase text-[#1A1A1A]/60 hover:text-[#5A6B58] transition-colors">
                Sign In
              </Link>
            )}
            {user && userProfile?.role === 'admin' && (
              <div className="flex items-center gap-4">
                <Link to="/member" className="text-xs tracking-[0.15em] uppercase text-[#1A1A1A] hover:text-[#5A6B58] transition-colors font-medium">
                  Member Area
                </Link>
                <div className="w-px h-3 bg-[#1A1A1A]/20"></div>
                <Link to="/admin" className="text-xs tracking-[0.15em] uppercase text-[#5A6B58] hover:text-[#1A1A1A] transition-colors font-medium">
                  Admin Panel
                </Link>
              </div>
            )}
            {user && userProfile?.role !== 'admin' && userProfile?.status === 'pending' && (
              <Link to="/member" className="text-xs tracking-[0.15em] uppercase text-[#1A1A1A] hover:text-[#5A6B58] transition-colors font-medium flex items-center gap-3">
                <span>Member Area</span>
                <span className="text-[9px] bg-[#EBEBE8] text-[#1A1A1A]/50 px-1.5 py-0.5 leading-none">PENDING</span>
              </Link>
            )}
            {user && userProfile?.role !== 'admin' && userProfile?.status === 'approved' && (
              <Link to="/member" className="text-xs tracking-[0.15em] uppercase text-[#1A1A1A] hover:text-[#5A6B58] transition-colors font-medium flex items-center gap-2">
                <span>Member Area</span>
              </Link>
            )}
          </div>

          <button className="md:hidden text-[#1A1A1A]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F7F7F5] pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-left text-xl tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center">
                  <span>{link.name} <span className="text-sm text-[#1A1A1A]/50 ml-2">{link.label}</span></span>
                  <ChevronRight size={20} className="text-[#1A1A1A]/30" />
                </Link>
              ))}
              {(!user || !userProfile) && (
                <Link to="/login" className="text-left text-xl tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center">
                  <span>Sign In</span>
                  <ChevronRight size={20} className="text-[#1A1A1A]/30" />
                </Link>
              )}
              {user && userProfile?.role === 'admin' && (
                <>
                  <Link to="/member" className="text-left text-xl tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center">
                    <span>Member Area</span>
                    <ChevronRight size={20} className="text-[#1A1A1A]/30" />
                  </Link>
                  <Link to="/admin" className="text-left text-xl tracking-widest uppercase text-[#5A6B58] border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center">
                    <span>Admin Panel</span>
                    <ChevronRight size={20} className="text-[#1A1A1A]/30" />
                  </Link>
                </>
              )}
              {user && userProfile?.role !== 'admin' && userProfile?.status === 'pending' && (
                <Link to="/member" className="text-left text-xl tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center">
                  <span>Member Area <span className="text-[10px] tracking-widest bg-[#EBEBE8] text-[#1A1A1A]/50 px-2 py-1 ml-2 align-middle">PENDING</span></span>
                  <ChevronRight size={20} className="text-[#1A1A1A]/30" />
                </Link>
              )}
              {user && userProfile?.role !== 'admin' && userProfile?.status === 'approved' && (
                <Link to="/member" className="text-left text-xl tracking-widest uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center">
                  <span>Member Area</span>
                  <ChevronRight size={20} className="text-[#1A1A1A]/30" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-[#1A1A1A] text-[#F7F7F5] py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="text-xl tracking-widest font-medium mb-6">ROLE PLANT<span className="text-[#5A6B58]">.</span></div>
            <p className="text-[#F7F7F5]/50 text-sm font-light leading-relaxed max-w-sm">
              專注於龜甲龍的長期培育與個體判讀。<br />建立標準，分享經驗，提供可信任的植物檔案。
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#F7F7F5]/40 mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-[#F7F7F5]/70">
              <li><Link to="/collection" className="hover:text-white transition-colors">選拔檔案 Collection</Link></li>
              <li><Link to="/learn" className="hover:text-white transition-colors">判讀與培育 Learn</Link></li>
              <li><Link to="/business" className="hover:text-white transition-colors">合作與業務 Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#F7F7F5]/40 mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-[#F7F7F5]/70">
              <li>archive@roleplant.com</li>
              <li>Instagram: @roleplant_archive</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-[#F7F7F5]/10 text-xs text-[#F7F7F5]/30 flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} Role Plant Archive. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Based in Taiwan.</p>
        </div>
      </footer>
    </div>
  );
};

// Mock Data
export const plantDatabase = [
  { 
    id: 'RP-24-001', status: 'Available', image: '/images/archive-1.jpg', name: 'Dioscorea elephantipes', size: '塊根寬度約 4.5 cm', source: '實生 / 國內培育',
    stats: { expression: 'A', balance: 'A+', proportion: 'A' },
    details: {
      summary: '此個體展現了極為深刻的龜甲表現，裂紋清晰且板塊立體。面相平衡良好，無明顯的生長傾斜，整體塊根比例飽滿。',
      suitableFor: '適合已有基礎塊根照護經驗，並追求深刻紋理與立體板塊的收藏者。',
      cultivationNotes: '目前處於生長旺季，建議維持穩定的給水節奏，並給予充足的通風與明亮散射光，以維持板塊的緊實度。短期內無需換盆。'
    }
  },
  { 
    id: 'RP-24-012', status: 'Observation', image: '/images/archive-2.jpg', name: 'Dioscorea elephantipes', size: '塊根寬度約 3.2 cm', source: '實生 / 國內培育',
    stats: { expression: 'A-', balance: 'A', proportion: 'B+' },
    details: {
      summary: '目前正在進行型態調整，龜甲表現已初步顯現潛力，但塊根比例仍需時間養成。',
      suitableFor: '目前列為觀察檔案，暫不釋出。',
      cultivationNotes: '剛完成換盆作業，目前放置於半日照環境進行根系養護，預計下個生長季確認其培育未來性。'
    }
  },
  { 
    id: 'RP-24-028', status: 'Archived', image: '/images/archive-3.jpg', name: 'Dioscorea elephantipes', size: '塊根寬度約 6.8 cm', source: '實生 / 國內培育',
    stats: { expression: 'A+', balance: 'A', proportion: 'A+' },
    details: {
      summary: '極具指標性的個體。龜甲表現深邃且排列具備獨特節奏，健康完成度極高，是我們建立判讀標準的重要參考。',
      suitableFor: '已由其他收藏者養護，或作為母本保留。',
      cultivationNotes: '已進入穩定的成熟期，給水頻率可適度拉長，以維持其極致的塊根比例與面相平衡。'
    }
  }
];

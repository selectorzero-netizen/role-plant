import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Leaf, Briefcase, Minus, Plus, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { SafeImage, plantDatabase } from '../components/Shared';
import { motion, AnimatePresence } from 'motion/react';
import { usePolicy } from '../PolicyContext';
import { plantService } from '../services/plantService';
import { Plant } from '../types';
import { contentService, HomeContent, AboutContent, BusinessContent, MembershipContent, LearnContent, FaqContent } from '../services/contentService';
import { inquiryService, InquiryType } from '../services/inquiryService';

export function HomePage() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [cms, setCms] = useState<HomeContent | null>(null);
  const [learnCms, setLearnCms] = useState<LearnContent | null>(null);

  useEffect(() => {
    const load = async () => {
      const [allPlants, homeCms, learnData] = await Promise.all([
        plantService.getPublicPlants(),
        contentService.getPageContent<HomeContent>('home'),
        contentService.getPageContent<LearnContent>('learn')
      ]);
      // Limit to 3 for the high-end editorial feel
      setPlants(allPlants.filter(p => p.featuredOnHome).slice(0, 3));
      setCms(homeCms);
      setLearnCms(learnData);
      setLoading(false);
    };
    load();
  }, []);

  const TEMP_STANDARD_IMAGES = [
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <div className="bg-[#EAE8E3] min-h-screen text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#EAE8E3]">
      
      {/* 1. Hero 
          Task: 5秒內讓人知道只做龜甲龍, 有龜甲龍主圖, 品牌署名
      */}
      <section className="relative min-h-[90vh] flex flex-col justify-between px-6 md:px-12 py-12 md:py-24 border-b border-[#1A1A1A]/10">
        <div className="absolute inset-x-6 md:inset-x-12 top-24 bottom-24 z-0 overflow-hidden bg-[#DCD7C9]">
           {/* TEMP Structure Placeholder Image used if CMS image is absent. Must look like a macro turtle shell. */}
           <img 
              src={cms?.heroImageUrl || "https://images.unsplash.com/photo-1558236166-512140a77f97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
              alt="Role Plant Main Cover - Dioscorea elephantipes structure" 
              className="w-full h-full object-cover filter contrast-125 saturate-50 mix-blend-multiply"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#EAE8E3] via-transparent to-[#EAE8E3]/20 mix-blend-normal" />
        </div>
        
        <div className="relative z-10 flex justify-between items-start">
           <span className="text-xs tracking-[0.4em] uppercase font-medium">Role Plant</span>
        </div>

        <div className="relative z-10 mt-auto flex flex-col md:flex-row md:items-end justify-between gap-12 pb-8">
           <div className="max-w-4xl">
             <motion.h1 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ duration: 1.2, ease: "easeOut" }} 
               className="text-6xl md:text-[8rem] leading-[0.9] font-light tracking-tighter mb-8"
             >
               只做<br/><span className="italic font-serif">龜甲龍</span>
             </motion.h1>
             <p className="text-lg md:text-2xl font-light tracking-wide max-w-xl leading-relaxed text-[#1A1A1A]/80">
               一套關於選擇、判讀與維持的清楚標準。
             </p>
           </div>
           
           <div className="flex flex-col gap-6 min-w-[200px]">
             <Link to="/collection" className="group border-b border-[#1A1A1A] pb-3 flex justify-between items-center hover:pr-4 transition-all duration-300">
               <span className="text-sm tracking-widest uppercase font-medium">查看 Collection</span>
               <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
             </Link>
             <Link to="/membership" className="group border-b border-[#1A1A1A]/20 pb-3 flex justify-between items-center hover:pr-4 hover:border-[#1A1A1A] transition-all duration-300 text-[#1A1A1A]/60 hover:text-[#1A1A1A]">
               <span className="text-sm tracking-widest uppercase">了解 Membership</span>
               <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
             </Link>
           </div>
        </div>
      </section>

      {/* 2. Featured Plants / Collection teaser
          Task: 1-3代表個體檔案, 圖/名稱/短標示/CTA
      */}
      {(loading || plants.length > 0) && (
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#1A1A1A]/10">
         <div className="flex flex-col md:flex-row justify-between mb-24 md:items-end gap-8">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
              代表個體
              <span className="text-xs tracking-[0.3em] uppercase block mt-6 font-normal text-[#1A1A1A]/50">Featured Archive</span>
            </h2>
            <Link to="/collection" className="text-sm tracking-widest uppercase border border-[#1A1A1A] px-10 py-5 hover:bg-[#1A1A1A] hover:text-[#EAE8E3] transition-colors inline-block text-center">
               前往 Collection
            </Link>
         </div>

         {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="animate-pulse bg-[#DCD7C9] aspect-[3/4]" />
               ))}
             </div>
         ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
               {plants.map((plant, idx) => (
                 <motion.div 
                   key={plant.id} 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                   className="group cursor-pointer flex flex-col" 
                   onClick={() => navigate(`/collection/${plant.id}`)}
                 >
                   <div className="aspect-[3/4] bg-[#DCD7C9] mb-8 overflow-hidden relative">
                     <img 
                       src={plant.coverImageUrl || (plant.images?.[0]?.url)} 
                       alt={plant.name} 
                       className="w-full h-full object-cover filter contrast-110 sepia-[.1]" 
                     />
                   </div>
                   <div className="flex justify-between items-start border-t border-[#1A1A1A] pt-6">
                     <div>
                       <h3 className="font-medium text-lg leading-tight mb-2">{plant.localName || plant.name}</h3>
                       <p className="text-[10px] text-[#1A1A1A]/50 font-mono uppercase tracking-widest">{plant.serialNumber || 'UNKNOWN-ID'}</p>
                     </div>
                     <span className="text-[10px] tracking-widest uppercase bg-[#1A1A1A] text-[#EAE8E3] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       查看檔案
                     </span>
                   </div>
                 </motion.div>
               ))}
             </div>
         )}
      </section>
      )}

      {/* 3. 為什麼只做龜甲龍 (Brand statement) 
          Task: 立場段短文, 來自 Home CMS 或 TEMP 結構
      */}
      <section className="py-48 px-6 md:px-12 flex justify-center items-center bg-[#DCD7C9]/20 border-b border-[#1A1A1A]/10">
        <div className="max-w-3xl text-center">
          <span className="block text-xs tracking-[0.3em] mb-12 uppercase text-[#1A1A1A]/40 font-medium">Standpoint</span>
          <div className="text-2xl md:text-4xl font-light leading-[1.6] tracking-wide text-[#1A1A1A]">
            {cms?.taglineDescription ? (
              <p>{cms.taglineDescription}</p>
            ) : (
              <div className="space-y-12">
                <p>龜甲龍的價值不在於短期的視覺刺激，</p>
                <p>而在於漫長歲月累積出的獨特結構與節奏。</p>
                <p className="text-[#1A1A1A]/60 text-xl md:text-2xl">
                  (降級/TEMP: CMS `taglineDescription` 未建檔時使用的結構文案)
                </p>
              </div>
            )}
          </div>
          <span className="block mt-24 text-[10px] font-medium tracking-[0.2em] uppercase text-[#1A1A1A]/30">— Role Plant</span>
        </div>
      </section>

      {/* 4. 時間證據 (Evidence of Time / Learn Standards)
          Task: 限制3個, Sticky Scroll (左定右動), TEMP圖結構占位
      */}
      <section className="relative py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#1A1A1A]/10">
         <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start relative">
           
           {/* Left: Sticky Title */}
           <div className="md:w-1/3 md:sticky md:top-32 self-start">
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
                時間的證據
                <span className="text-xs tracking-[0.3em] uppercase block mt-4 font-normal text-[#1A1A1A]/50">Evidence of Time</span>
              </h2>
              <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm mb-8">
                我們不以完美為單一標準。裂紋的清晰度、面相的平衡、塊根的生長節奏，這些都是時間與環境交互作用後的具體證據。
              </p>
              <div className="text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 font-mono">
                [ 判讀基準 01 - {Math.min(3, learnCms?.standards?.filter(s => s.enabled).length || 0).toString().padStart(2, '0')} ]
              </div>
           </div>

           {/* Right: Scrolling Stack (只取前3個做驗證) */}
           <div className="md:w-2/3 flex flex-col gap-32 md:gap-48 mt-16 md:mt-0">
             {learnCms?.standards?.filter(s => s.enabled).slice(0, 3).map((std, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
                 className="flex flex-col gap-6"
               >
                 {/* TEMP 占位結構，不涉及假學理，只確保視覺存在 */}
                 <div className="aspect-[4/3] bg-[#DCD7C9] overflow-hidden relative">
                   <img 
                     src={TEMP_STANDARD_IMAGES[idx]} 
                     alt={`TEMP Structural Layout ${idx + 1}`} 
                     className="w-full h-full object-cover filter contrast-125 saturate-50 grayscale-[0.3]" 
                   />
                   <div className="absolute top-4 right-4 bg-[#EAE8E3]/90 text-[#1A1A1A] text-[10px] uppercase tracking-widest px-2 py-1 font-mono">TEMP Image</div>
                 </div>
                 
                 <div className="border-t border-[#1A1A1A] pt-6 pr-12 md:pr-24">
                   <div className="flex items-center gap-4 mb-4">
                     <span className="text-xs font-mono text-[#1A1A1A]/40">0{idx + 1}</span>
                     <h3 className="text-2xl font-light">{std.name}</h3>
                   </div>
                   <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
                     {std.description}
                   </p>
                 </div>
               </motion.div>
             ))}
           </div>
           
         </div>
      </section>

      {/* 5. Quick links
          Task: Collection, Learn, Membership
      */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-[#1A1A1A]">
           
           <button onClick={() => navigate('/collection')} className="group p-12 lg:p-16 border-b md:border-b-0 md:border-r border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#EAE8E3] transition-colors flex flex-col justify-between min-h-[350px] text-left">
             <div>
               <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-8 font-mono">01. Archive</span>
               <h2 className="text-4xl font-light mb-6">Collection</h2>
               <p className="text-sm font-light leading-relaxed opacity-70">
                 檢閱單株個體數據紀錄。<br/>追蹤長時間的培育變化與型態。
               </p>
             </div>
             <div className="flex items-center gap-3 text-xs tracking-widest uppercase mt-12 font-medium">
               探索檔案 <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
             </div>
           </button>

           <button onClick={() => navigate('/learn')} className="group p-12 lg:p-16 border-b md:border-b-0 md:border-r border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#EAE8E3] transition-colors flex flex-col justify-between min-h-[350px] text-left">
             <div>
               <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-8 font-mono">02. Knowledge</span>
               <h2 className="text-4xl font-light mb-6">Learn</h2>
               <p className="text-sm font-light leading-relaxed opacity-70">
                 學習五大客觀觀察維度。<br/>建立對龜甲龍的科學式判讀標準。
               </p>
             </div>
             <div className="flex items-center gap-3 text-xs tracking-widest uppercase mt-12 font-medium">
               閱讀標準 <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
             </div>
           </button>

           <button onClick={() => navigate('/membership')} className="group p-12 lg:p-16 hover:bg-[#1A1A1A] hover:text-[#EAE8E3] transition-colors flex flex-col justify-between min-h-[350px] text-left">
             <div>
               <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-8 font-mono">03. System</span>
               <h2 className="text-4xl font-light mb-6">Membership</h2>
               <p className="text-sm font-light leading-relaxed opacity-70">
                 確認長期參與資格與門檻。<br/>了解本站的審核機制與檔案存取權限。
               </p>
             </div>
             <div className="flex items-center gap-3 text-xs tracking-widest uppercase mt-12 font-medium">
               了解制度 <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
             </div>
           </button>

         </div>
      </section>

    </div>
  );
}

export function MembershipPage() {
  const navigate = useNavigate();
  const { membershipPolicy: POLICY } = usePolicy();
  const [cms, setCms] = useState<MembershipContent>({
    title: '收藏者成員制度',
    subtitle: 'Collector Membership',
    description: '成員制度不是商業會員卡，而是一種對待植物方式的共識確認。您必須具備基礎的培育知識、穩定的養護環境，並認同長期觀察的價值。',
    audienceTitle: '誰適合加入？',
    audienceDescription: '我們尋找的是願意與植物一同成長的夥伴。',
    audienceItems: ['已具備基礎塊根養護經驗', '能提供穩定的通風與日照環境', '認同「選拔、判讀、培育」的長期價值'],
    ctaText: '前往登入 / 申請加入'
  });

  useEffect(() => {
    contentService.getPageContent<MembershipContent>('membership').then(res => {
      if (res) setCms(res);
    });
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-32">
      <header className="mb-20">
        <h1 className="text-4xl font-light tracking-tight mb-4">{cms.title}</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-8">{cms.subtitle}</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed max-w-2xl text-lg">
          {cms.description}
        </p>
      </header>

      <section className="mb-20">
        <h2 className="text-2xl font-light mb-8 border-b border-[#1A1A1A]/10 pb-4">{cms.audienceTitle}</h2>
        <div className="bg-[#EBEBE8]/50 p-8 text-[#1A1A1A]/80 font-light leading-relaxed space-y-4">
          <p>{cms.audienceDescription}</p>
          <ul className="list-disc pl-5 space-y-2">
            {cms.audienceItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-light mb-8 border-b border-[#1A1A1A]/10 pb-4">申請流程</h2>
          <ul className="space-y-6">
            {POLICY.process.steps.map(step => (
              <li key={step.id} className="flex gap-4 font-light text-sm text-[#1A1A1A]/80 leading-relaxed">
                <span className="text-[#5A6B58] font-medium mt-0.5 whitespace-nowrap">{step.label}</span>
                <div>
                  <h3 className="font-medium text-[#1A1A1A] mb-1">{step.title}</h3>
                  <p>{step.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-light mb-8 border-b border-[#1A1A1A]/10 pb-4">成員權益</h2>
          <ul className="space-y-6">
            {POLICY.approvedBenefits.items.map((benefit, index) => (
              <li key={index} className="flex gap-4">
                <span className="text-[#5A6B58] mt-1 shrink-0">❖</span>
                <div>
                  <h3 className="font-medium mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[#1A1A1A]/60 font-light leading-relaxed">{benefit.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#1A1A1A] p-12 text-center text-white">
        <h2 className="text-2xl font-light mb-4">準備好加入了嗎？</h2>
        <p className="text-white/60 font-light mb-8 text-sm">點擊下方按鈕以 Google 帳號授權，即刻進入審核列隊。</p>
        <button onClick={() => navigate('/login')} className="bg-white text-[#1A1A1A] px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#EBEBE8] transition-colors">
          {cms.ctaText}
        </button>
      </div>
    </div>
  );
}

export function AboutPage() {
  const [cms, setCms] = useState<AboutContent>({
    title: '時間的觀察者與檔案管理員',
    subtitle: 'About Role Plant',
    paragraphs: [
      'ROLE PLANT 是一個專注於 Dioscorea elephantipes（龜甲龍）的獨立培育與紀錄計畫。',
      '我們深知，面對生長週期動輒數十年的塊根植物，人類的時間顯得短暫。因此，我們不以「製造者」自居，而是將自己定位為「觀察者」與「檔案管理員」。',
      '龜甲龍不是生活必需品，但它值得被認真對待。它的價值不在於短期的視覺刺激，而在於長期的養成與理解。透過建立客觀的判讀標準（龜甲表現、面相平衡、塊根比例、健康完成度、培育未來性），我們試圖在自然的不確定性中，尋找可供依循的脈絡。',
      '我們希望提供的不是單次交易，而是一套可參考、可理解、可長期信任的方法。與同樣欣賞龜甲龍質樸之美的收藏者，建立長期的交流。'
    ]
  });

  useEffect(() => {
    contentService.getPageContent<AboutContent>('about').then(res => {
      if (res) setCms(res);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 pt-12 text-center pb-32">
      <h1 className="text-4xl font-light tracking-tight mb-4">{cms.title}</h1>
      <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-16">{cms.subtitle}</p>
      <div className="space-y-12 text-left mb-24">
        {cms.paragraphs.map((p, i) => (
          <p key={i} className={`font-light leading-relaxed ${i === 0 ? 'text-[#1A1A1A]/80 text-lg' : 'text-[#1A1A1A]/70'}`}>
            {p}
          </p>
        ))}
      </div>

      <div className="text-left border-t border-[#1A1A1A]/10 pt-24">
        <h2 className="text-2xl font-light mb-8">聯絡我們</h2>
        <GeneralContactForm />
      </div>
    </div>
  );
}

export function BusinessPage() {
  const [loading, setLoading] = useState(false);
  const [cms, setCms] = useState<BusinessContent>({
    title: '合作與業務',
    subtitle: 'Business & Partnerships',
    description: '除了針對個人收藏者的檔案釋出，我們也為商業空間、設計品牌與同業提供專業的植物規劃與批發服務。',
    services: [
      { title: '空間陳列與顧問', description: '為商業空間、展覽或私人宅邸提供龜甲龍的挑選、搭配與長期養護顧問服務。我們將依據空間的光照、通風條件，挑選最具培育未來性的個體。', enabled: true },
      { title: '同業批發與合作', description: '針對具備專業養護能力的植物店鋪或品牌，提供經過初步選拔與健康度確認的批發方案。歡迎來信討論您的需求與數量。', enabled: true }
    ]
  });

  useEffect(() => {
    contentService.getPageContent<BusinessContent>('business').then(res => {
      if (res) setCms(res);
    });
  }, []);

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');
    const formData = new FormData(e.currentTarget);
    
    try {
      await inquiryService.submitInquiry({
        type: 'business',
        name: formData.get('contactName') as string,
        email: formData.get('email') as string,
        message: formData.get('details') as string,
        company: formData.get('brandName') as string
      });
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting business inquiry:", error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-32">
      <header className="mb-16">
        <h1 className="text-4xl font-light tracking-tight mb-4">{cms.title}</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-6">{cms.subtitle}</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-lg">
          {cms.description}
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {cms.services.filter(s => s.enabled).map((service, i) => (
          <div key={i} className="border-t border-[#1A1A1A]/10 pt-6">
            <h3 className="text-lg font-medium mb-4">{service.title}</h3>
            <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 md:p-12 border border-[#1A1A1A]/10">
        <h2 className="text-2xl font-light mb-8">商業洽詢表單</h2>
        {submitStatus === 'success' ? (
          <div className="bg-[#5A6B58]/5 p-12 text-center rounded-sm border border-[#5A6B58]/20">
            <CheckCircle size={48} className="mx-auto text-[#5A6B58] mb-6" />
            <h3 className="text-xl font-medium mb-3">洽詢已送出</h3>
            <p className="text-[#1A1A1A]/60 font-light text-sm mb-8">感謝您的聯繫。我們已收到您的商業需求，將由專人審核後儘快與您聯繫。</p>
            <button onClick={() => setSubmitStatus('idle')} className="text-xs tracking-widest uppercase border border-[#1A1A1A]/20 px-8 py-3 hover:bg-[#1A1A1A] hover:text-white transition-colors">再次填寫</button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">單位 / 品牌名稱</label>
                <input type="text" name="brandName" required className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">聯絡人姓名</label>
                <input type="text" name="contactName" required className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Email</label>
              <input type="email" name="email" required className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">合作需求簡述</label>
              <textarea name="details" required rows={4} className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"></textarea>
            </div>
            
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle size={16} /> <span>抱歉，送出過程發生錯誤，請稍後再試。</span>
              </div>
            )}

            <button type="submit" disabled={submitStatus === 'loading'} className="bg-[#1A1A1A] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors w-full md:w-auto mt-4 disabled:opacity-50">
              {submitStatus === 'loading' ? '處理中...' : '送出洽詢'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function LearnPage() {
  const [activeTab, setActiveTab] = useState<'standards' | 'faq'>('standards');
  const [learnCms, setLearnCms] = useState<LearnContent>({
    title: '判讀與培育',
    subtitle: 'Standards & Cultivation',
    description: '我們將長期的培育經驗與觀察，整理成可供參考的知識與問答。',
    intro1Title: '龜甲龍是什麼',
    intro1Content: '龜甲龍（Dioscorea elephantipes）是一種生長極為緩慢的冬型種塊根植物。它的價值不只在於表面的龜裂紋理，更在於漫長歲月累積出的獨特型態。這是一場與時間的長期對話。',
    intro2Title: '新手入門的基本理解',
    intro2Content: '龜甲龍具有明確的生長季（秋至春）與休眠季（夏）。在生長季給予充足日照與水分，休眠季則需保持通風乾燥。理解它的生理時鐘，是培育的第一步。',
    standards: [
      { name: '龜甲表現', description: '觀察裂紋的清晰度、板塊的立體感與整體的節奏。', enabled: true },
      { name: '面相平衡', description: '評估植物在不同視角下的視覺重心與對稱性。', enabled: true },
      { name: '塊根比例', description: '分析塊根的寬高比與整體飽滿度。', enabled: true },
      { name: '健康完成度', description: '檢視表皮質地、芽點活性與根系穩固程度。', enabled: true },
      { name: '培育未來性', description: '基於目前的生長趨勢，預測其未來的型態發展潛力。', enabled: true },
    ]
  });
  const [faqCms, setFaqCms] = useState<FaqContent>({
    title: '', subtitle: '', description: '',
    items: [
      { question: '龜甲龍適合新手嗎？', answer: '適合。只要掌握「生長季給水、休眠季斷水」的基本節奏，並維持良好通風，它是一品相當強健的植物。', enabled: true },
      { question: '怎麼判斷值不值得買？', answer: '價值取決於您欣賞的面向。建議先確認「健康完成度」（根系穩固、無腐爛），再依據個人審美挑選龜甲表現或面相平衡符合期待的個體。', enabled: true },
      { question: '實生是什麼？', answer: '實生（Seed-grown）指的是從種子開始培育的植物。每一株實生苗都具有獨特的基因表現，型態各異，這也是培育龜甲龍最大的樂趣之一。', enabled: true },
      { question: '收到植物後怎麼照顧？', answer: '建議先放置於通風且有明亮散射光的環境適應一至兩週。請勿立即換盆，觀察其適應狀況後再逐步調整給水頻率。', enabled: true },
      { question: '休眠期怎麼觀察？', answer: '當氣溫逐漸升高（通常在春末夏初），葉片會開始自然黃化枯萎，這時應逐步減少給水。完全落葉後即進入休眠期，需移至陰涼通風處，偶爾在盆邊微量給水防根系乾枯即可。', enabled: true },
      { question: '在售 / 培育中 / Archive 有什麼差別？', answer: '「可釋出」為狀態穩定可供收藏的個體；「觀察中」為剛換盆或型態調整中，暫不釋出；「已收藏」為歷史紀錄或已由他人收藏的檔案。', enabled: true },
      { question: '你們怎麼分線與保留？', answer: '我們會將具備特殊龜甲表現、優異比例，或需要更長時間驗證其培育未來性的個體保留下來，作為後續觀察與標準建立的參考母本。', enabled: true }
    ]
  });

  useEffect(() => {
    Promise.all([
      contentService.getPageContent<LearnContent>('learn'),
      contentService.getPageContent<FaqContent>('faq')
    ]).then(([lres, fres]) => {
      if (lres) setLearnCms(lres);
      if (fres) setFaqCms(fres);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-4">{learnCms.title}</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-6">{learnCms.subtitle}</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-lg">
          {learnCms.description}
        </p>
      </header>
      <div className="flex gap-8 mb-16 border-b border-[#1A1A1A]/10 pb-4">
        <button onClick={() => setActiveTab('standards')} className={`text-sm tracking-widest uppercase transition-colors ${activeTab === 'standards' ? 'text-[#1A1A1A] font-medium border-b-2 border-[#1A1A1A] pb-1' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}>
          判讀與標準
        </button>
        <button onClick={() => setActiveTab('faq')} className={`text-sm tracking-widest uppercase transition-colors ${activeTab === 'faq' ? 'text-[#1A1A1A] font-medium border-b-2 border-[#1A1A1A] pb-1' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}>
          FAQ 常見問題
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          {activeTab === 'standards' ? (
            <div className="space-y-24">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-xl font-medium mb-4">{learnCms.intro1Title}</h2>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
                    {learnCms.intro1Content}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-4">{learnCms.intro2Title}</h2>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
                    {learnCms.intro2Content}
                  </p>
                </div>
              </section>
              <section>
                <div className="mb-10 border-b border-[#1A1A1A]/10 pb-4">
                  <h2 className="text-2xl font-light mb-4">判讀標準 v1.0</h2>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm max-w-2xl">
                    我們不認為有絕對完美的植物，但建立客觀的框架能幫助我們更清晰地理解個體差異。以下是我們目前重視的五個判讀面向：
                  </p>
                </div>
                <div className="space-y-8">
                  {learnCms.standards.filter(s => s.enabled).map((std, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 items-baseline">
                      <div className="md:col-span-1 flex items-center gap-3">
                        <span className="text-xs font-mono text-[#1A1A1A]/30">0{idx + 1}</span>
                        <h3 className="text-base font-medium">{std.name}</h3>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">{std.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <section>
              <div className="space-y-8">
                {faqCms.items.filter(item => item.enabled).map((faq, idx) => (
                  <div key={idx} className="border-b border-[#1A1A1A]/5 pb-8">
                    <h3 className="text-base font-medium mb-3 flex gap-4">
                      <span className="text-[#1A1A1A]/30 font-mono">Q.</span>{faq.question}
                    </h3>
                    <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GeneralContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    
    try {
      await inquiryService.submitInquiry({
        type: 'general',
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string
      });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting general inquiry:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#5A6B58]/5 p-8 border border-[#5A6B58]/20 rounded-sm">
        <CheckCircle size={32} className="text-[#5A6B58] mb-4" />
        <h3 className="text-lg font-medium mb-2">訊息已送出</h3>
        <p className="text-[#1A1A1A]/60 font-light text-sm mb-6">感謝您的聯繫。我們將儘快審閱您的訊息並回覆。</p>
        <button onClick={() => setStatus('idle')} className="text-xs uppercase tracking-widest border border-[#1A1A1A]/10 px-6 py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors">再次發送</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-2">姓名 Name</label>
          <input type="text" name="name" required className="w-full bg-white border border-[#1A1A1A]/10 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Email Address</label>
          <input type="email" name="email" required className="w-full bg-white border border-[#1A1A1A]/10 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-2">訊息內容 Message</label>
        <textarea name="message" required rows={5} className="w-full bg-white border border-[#1A1A1A]/10 p-3 text-sm focus:outline-none focus:border-[#5A6B58] resize-none" />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle size={16} /> <span>送出失敗，請檢查網路連線或稍後再試。</span>
        </div>
      )}

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="bg-[#1A1A1A] text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-[#5A6B58] transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

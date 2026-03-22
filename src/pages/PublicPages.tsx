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
  const [cms, setCms] = useState<HomeContent>({
    heroLabel: 'Role Plant Archive',
    heroTitle: '專注於龜甲龍的\n長期培育與個體判讀。',
    heroDescription: '龜甲龍不是快速消費的植物，而是需要時間沉澱的生命。我們整理長期的培育經驗與判讀標準，為喜愛龜甲龍的收藏者提供清晰的參考與選擇。',
    heroImageUrl: '/images/hero.jpg',
    taglineTitle: '時間的具象化',
    taglineDescription: '它的價值不只在表面的龜裂，更在於養成過程中的節奏與觀察。我們在意的不是炒作稀有，而是把選拔、判讀與培育這些原本模糊的事，慢慢整理清楚。',
    sections: { hero: true, tagline: true, featured: true, links: true }
  });

  useEffect(() => {
    const load = async () => {
      const [allPlants, homeCms] = await Promise.all([
        plantService.getPublicPlants(),
        contentService.getPageContent<HomeContent>('home')
      ]);
      setPlants(allPlants.filter(p => p.featuredOnHome).slice(0, 4));
      if (homeCms) setCms(homeCms);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {cms.sections.hero && (
        <section className="relative h-[80vh] flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F5] via-[#F7F7F5]/80 to-transparent z-10" />
            <img 
              src={cms.heroImageUrl || "/images/hero.jpg"} 
              alt="Hero background" 
              className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
            />
          </div>
          
          <div className="relative z-20 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#1A1A1A]/40 mb-6 block font-medium">
                {cms.heroLabel}
              </span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-8 whitespace-pre-line">
                {cms.heroTitle}
              </h1>
              <p className="text-[#1A1A1A]/60 font-light leading-relaxed max-w-xl text-lg mb-12">
                {cms.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/collection" className="bg-[#1A1A1A] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors flex items-center justify-center gap-3">
                  <Leaf size={16} /><span>查看選拔檔案</span>
                </Link>
                <Link to="/learn" className="border border-[#1A1A1A]/20 bg-white/50 px-8 py-4 text-sm tracking-widest uppercase hover:border-[#1A1A1A] transition-colors flex items-center justify-center gap-3">
                  <BookOpen size={16} /><span>學習判讀標準</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {cms.sections.tagline && (
        <section className="px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#1A1A1A]/30 mb-8">{cms.taglineTitle}</h2>
            <p className="text-2xl md:text-4xl font-light leading-relaxed text-[#1A1A1A]/80">
              {cms.taglineDescription}
            </p>
          </div>
        </section>
      )}

      {cms.sections.featured && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-[#1A1A1A]/10 pb-6">
            <div>
              <h2 className="text-2xl font-light tracking-tight mb-2">最新檔案</h2>
              <p className="text-xs tracking-widest uppercase text-[#1A1A1A]/50">Latest Collection</p>
            </div>
            <Link to="/collection" className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase hover:text-[#5A6B58] transition-colors">
              <span>View All</span><ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="animate-pulse bg-[#EBEBE8] aspect-[4/5]" />
               ))}
             </div>
          ) : plants.length === 0 ? (
            <div className="bg-white border border-[#1A1A1A]/5 p-16 text-center">
              <Leaf size={32} className="mx-auto text-[#1A1A1A]/20 mb-6" />
              <h3 className="text-lg font-medium mb-3">檔案整理中</h3>
              <p className="text-[#1A1A1A]/60 font-light text-sm max-w-md mx-auto leading-relaxed">
                目前無公開的精選植物檔案。這些隨時間緩慢生長的塊根，可能正處於休眠期或進行換盆修整，暫不開放前台展示。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plants.map((plant) => (
                <div key={plant.id} className="group cursor-pointer" onClick={() => navigate(`/collection/${plant.id}`)}>
                  <div className="aspect-[4/5] bg-[#EBEBE8] mb-4 overflow-hidden relative border border-[#1A1A1A]/5">
                    <img src={plant.coverImageUrl || (plant.images?.[0]?.url)} alt={plant.id} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {plant.status === 'sold' && (
                      <div className="absolute top-4 right-4 bg-red-800 text-white text-[10px] uppercase tracking-widest px-2 py-1">已釋出</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{plant.localName || plant.name}</h3>
                    <p className="text-[10px] text-[#1A1A1A]/40 font-mono mt-1">{plant.serialNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {cms.sections.links && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 md:p-16 border border-[#1A1A1A]/5 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/learn')}>
            <BookOpen size={24} className="text-[#5A6B58] mb-8" />
            <h2 className="text-2xl font-light mb-4">判讀與培育指南</h2>
            <p className="text-[#1A1A1A]/60 font-light leading-relaxed mb-12">
              我們將長期的觀察整理為五個維度：龜甲表現、面相平衡、塊根比例、健康完成度與培育未來性。提供客觀的參考框架。
            </p>
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase text-[#1A1A1A] group-hover:text-[#5A6B58] transition-colors font-medium">
              <span>閱讀指南</span><ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="bg-[#1A1A1A] text-[#F7F7F5] p-10 md:p-16 cursor-pointer group" onClick={() => navigate('/business')}>
            <Briefcase size={24} className="text-[#F7F7F5]/50 mb-8" />
            <h2 className="text-2xl font-light mb-4">商業與合作洽詢</h2>
            <p className="text-[#F7F7F5]/60 font-light leading-relaxed mb-12">
              針對實體空間陳列、品牌合作、批發採購或專業培育顧問需求，我們提供專屬的討論與規劃服務。
            </p>
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase text-white group-hover:text-[#5A6B58] transition-colors font-medium">
              <span>聯繫我們</span><ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </section>
      )}
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

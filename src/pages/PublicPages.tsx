import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Leaf, Briefcase } from 'lucide-react';
import { SafeImage, plantDatabase } from '../components/Shared';
import { motion, AnimatePresence } from 'motion/react';
import { usePolicy } from '../PolicyContext';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-32">
      <section className="relative pt-12 md:pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#5A6B58] mb-6 font-medium">Role Plant Archive</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] mb-8">
              專注於龜甲龍的<br />長期培育與個體判讀。
            </h1>
            <p className="text-[#1A1A1A]/70 font-light leading-relaxed max-w-md mb-12 text-lg">
              龜甲龍不是快速消費的植物，而是需要時間沉澱的生命。我們整理長期的培育經驗與判讀標準，為喜愛龜甲龍的收藏者提供清晰的參考與選擇。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/collection" className="bg-[#1A1A1A] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors flex items-center justify-center gap-3">
                <Leaf size={16} /><span>查看選拔檔案</span>
              </Link>
              <Link to="/learn" className="border border-[#1A1A1A]/20 bg-white/50 px-8 py-4 text-sm tracking-widest uppercase hover:border-[#1A1A1A] transition-colors flex items-center justify-center gap-3">
                <BookOpen size={16} /><span>學習判讀標準</span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden bg-[#EBEBE8]">
            <SafeImage src="/images/hero.jpg" alt="Dioscorea elephantipes Detail" className="w-full h-full object-cover" fallbackText="請上傳 hero.jpg" />
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-mono text-[#1A1A1A]/70">Ref. RP-24-001</div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-light mb-6">時間的具象化</h2>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-lg">
          它的價值不只在表面的龜裂，更在於養成過程中的節奏與觀察。我們在意的不是炒作稀有，而是把選拔、判讀與培育這些原本模糊的事，慢慢整理清楚。
        </p>
        <Link to="/about" className="mt-8 text-sm tracking-widest uppercase text-[#1A1A1A]/50 hover:text-[#5A6B58] transition-colors inline-flex items-center gap-2">
          <span>了解我們的理念</span><ArrowRight size={16} />
        </Link>
      </section>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plantDatabase.map((plant) => (
            <div key={plant.id} className="group cursor-pointer" onClick={() => navigate(`/collection/${plant.id}`)}>
              <div className="aspect-[4/5] bg-[#EBEBE8] mb-4 overflow-hidden relative">
                <SafeImage src={plant.image} alt={plant.id} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" fallbackText={plant.image.split('/').pop() || ''} />
              </div>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <h3 className="font-mono text-sm">{plant.id}</h3>
                  <p className="text-xs text-[#1A1A1A]/50 mt-1">{plant.name}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 group-hover:text-[#5A6B58] transition-colors">
                  <span>查看檔案</span><ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
    </div>
  );
}

export function MembershipPage() {
  const navigate = useNavigate();
  const { membershipPolicy: MEMBERSHIP_POLICY } = usePolicy();
  
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-32">
      <header className="mb-20">
        <h1 className="text-4xl font-light tracking-tight mb-4">{MEMBERSHIP_POLICY.hero.title}</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-8">{MEMBERSHIP_POLICY.hero.subtitle}</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed max-w-2xl text-lg">
          {MEMBERSHIP_POLICY.hero.description}
        </p>
      </header>

      <section className="mb-20">
        <h2 className="text-2xl font-light mb-8 border-b border-[#1A1A1A]/10 pb-4">{MEMBERSHIP_POLICY.audience.title}</h2>
        <div className="bg-[#EBEBE8]/50 p-8 text-[#1A1A1A]/80 font-light leading-relaxed space-y-4">
          <p>{MEMBERSHIP_POLICY.audience.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            {MEMBERSHIP_POLICY.audience.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-light mb-8 border-b border-[#1A1A1A]/10 pb-4">{MEMBERSHIP_POLICY.process.title}</h2>
          <ul className="space-y-6">
            {MEMBERSHIP_POLICY.process.steps.map(step => (
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
          <h2 className="text-2xl font-light mb-8 border-b border-[#1A1A1A]/10 pb-4">{MEMBERSHIP_POLICY.approvedBenefits.title}</h2>
          <ul className="space-y-6">
            {MEMBERSHIP_POLICY.approvedBenefits.items.map((benefit, index) => (
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
          前往登入 / 申請加入
        </button>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 pt-12 text-center">
      <h1 className="text-4xl font-light tracking-tight mb-4">時間的觀察者與檔案管理員</h1>
      <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-16">About Role Plant</p>
      <div className="space-y-12 text-left">
        <p className="text-[#1A1A1A]/80 font-light leading-relaxed text-lg">
          ROLE PLANT 是一個專注於 Dioscorea elephantipes（龜甲龍）的獨立培育與紀錄計畫。
        </p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed">
          我們深知，面對生長週期動輒數十年的塊根植物，人類的時間顯得短暫。因此，我們不以「製造者」自居，而是將自己定位為「觀察者」與「檔案管理員」。
        </p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed">
          龜甲龍不是生活必需品，但它值得被認真對待。它的價值不在於短期的視覺刺激，而在於長期的養成與理解。透過建立客觀的判讀標準（龜甲表現、面相平衡、塊根比例、健康完成度、培育未來性），我們試圖在自然的不確定性中，尋找可供依循的脈絡。
        </p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed">
          我們希望提供的不是單次交易，而是一套可參考、可理解、可長期信任的方法。與同樣欣賞龜甲龍質樸之美的收藏者，建立長期的交流。
        </p>
      </div>
    </div>
  );
}

export function BusinessPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      brandName: formData.get('brandName'),
      contactName: formData.get('contactName'),
      email: formData.get('email'),
      details: formData.get('details'),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const { db } = await import('../firebase');
      const { collection, addDoc } = await import('firebase/firestore');
      await addDoc(collection(db, 'inquiries'), data);
      alert('洽詢已送出，我們將盡快與您聯繫。');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert('送出失敗，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12">
      <header className="mb-16">
        <h1 className="text-4xl font-light tracking-tight mb-4">合作與業務</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-6">Business & Partnerships</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-lg">
          除了針對個人收藏者的檔案釋出，我們也為商業空間、設計品牌與同業提供專業的植物規劃與批發服務。
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="border-t border-[#1A1A1A]/10 pt-6">
          <h3 className="text-lg font-medium mb-4">空間陳列與顧問</h3>
          <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
            為商業空間、展覽或私人宅邸提供龜甲龍的挑選、搭配與長期養護顧問服務。我們將依據空間的光照、通風條件，挑選最具培育未來性的個體。
          </p>
        </div>
        <div className="border-t border-[#1A1A1A]/10 pt-6">
          <h3 className="text-lg font-medium mb-4">同業批發與合作</h3>
          <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
            針對具備專業養護能力的植物店鋪或品牌，提供經過初步選拔與健康度確認的批發方案。歡迎來信討論您的需求與數量。
          </p>
        </div>
      </div>
      <div className="bg-white p-8 md:p-12 border border-[#1A1A1A]/10">
        <h2 className="text-2xl font-light mb-8">聯繫我們</h2>
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
          <button type="submit" disabled={loading} className="bg-[#1A1A1A] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors w-full md:w-auto mt-4 disabled:opacity-50">
            {loading ? '處理中...' : '送出洽詢'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function LearnPage() {
  const [activeTab, setActiveTab] = useState<'standards' | 'faq'>('standards');

  const standards = [
    { name: '龜甲表現', desc: '觀察裂紋的清晰度、板塊的立體感與整體的節奏。' },
    { name: '面相平衡', desc: '評估植物在不同視角下的視覺重心與對稱性。' },
    { name: '塊根比例', desc: '分析塊根的寬高比與整體飽滿度。' },
    { name: '健康完成度', desc: '檢視表皮質地、芽點活性與根系穩固程度。' },
    { name: '培育未來性', desc: '基於目前的生長趨勢，預測其未來的型態發展潛力。' },
  ];

  const faqs = [
    { q: '龜甲龍適合新手嗎？', a: '適合。只要掌握「生長季給水、休眠季斷水」的基本節奏，並維持良好通風，它是一品相當強健的植物。' },
    { q: '怎麼判斷值不值得買？', a: '價值取決於您欣賞的面向。建議先確認「健康完成度」（根系穩固、無腐爛），再依據個人審美挑選龜甲表現或面相平衡符合期待的個體。' },
    { q: '實生是什麼？', a: '實生（Seed-grown）指的是從種子開始培育的植物。每一株實生苗都具有獨特的基因表現，型態各異，這也是培育龜甲龍最大的樂趣之一。' },
    { q: '收到植物後怎麼照顧？', a: '建議先放置於通風且有明亮散射光的環境適應一至兩週。請勿立即換盆，觀察其適應狀況後再逐步調整給水頻率。' },
    { q: '休眠期怎麼觀察？', a: '當氣溫逐漸升高（通常在春末夏初），葉片會開始自然黃化枯萎，這時應逐步減少給水。完全落葉後即進入休眠期，需移至陰涼通風處，偶爾在盆邊微量給水防根系乾枯即可。' },
    { q: '在售 / 培育中 / Archive 有什麼差別？', a: '「可釋出」為狀態穩定可供收藏的個體；「觀察中」為剛換盆或型態調整中，暫不釋出；「已收藏」為歷史紀錄或已由他人收藏的檔案。' },
    { q: '你們怎麼分線與保留？', a: '我們會將具備特殊龜甲表現、優異比例，或需要更長時間驗證其培育未來性的個體保留下來，作為後續觀察與標準建立的參考母本。' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-4">判讀與培育</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-6">Standards & Cultivation</p>
        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-lg">
          我們將長期的培育經驗與觀察，整理成可供參考的知識與問答。
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
                  <h2 className="text-xl font-medium mb-4">龜甲龍是什麼</h2>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
                    龜甲龍（Dioscorea elephantipes）是一種生長極為緩慢的冬型種塊根植物。它的價值不只在於表面的龜裂紋理，更在於漫長歲月累積出的獨特型態。這是一場與時間的長期對話。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-4">新手入門的基本理解</h2>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">
                    龜甲龍具有明確的生長季（秋至春）與休眠季（夏）。在生長季給予充足日照與水分，休眠季則需保持通風乾燥。理解它的生理時鐘，是培育的第一步。
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
                  {standards.map((std, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 items-baseline">
                      <div className="md:col-span-1 flex items-center gap-3">
                        <span className="text-xs font-mono text-[#1A1A1A]/30">0{idx + 1}</span>
                        <h3 className="text-base font-medium">{std.name}</h3>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm">{std.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <section>
              <div className="space-y-8">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-[#1A1A1A]/5 pb-8">
                    <h3 className="text-base font-medium mb-3 flex gap-4">
                      <span className="text-[#1A1A1A]/30 font-mono">Q.</span>{faq.q}
                    </h3>
                    <p className="text-[#1A1A1A]/70 font-light leading-relaxed text-sm pl-8">{faq.a}</p>
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

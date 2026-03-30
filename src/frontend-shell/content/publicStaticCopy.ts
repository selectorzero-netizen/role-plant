export type AssetKind = 'gemini' | 'placeholder' | 'real';

export type AssetSpec = {
  label: string;
  path: string;
  kind: AssetKind;
  ratio?: string;
  note: string;
};

export const STATIC_PUBLIC_COPY = {
  home: {
    hero: {
      eyebrow: 'Home',
      title: '裂痕不是瑕疵，是時間留下來的表面。',
      description:
        '我們不是把龜甲龍當商品堆滿，而是用選擇、判讀與養成，把值得被看見的變化裱框。',
      primaryCta: 'See Current Selection',
      secondaryCta: 'Read Standards',
      asset: {
        label: 'Home Hero',
        path: 'frontend-review-assets/01_home/hero/rp-home-hero-room-main-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: 'Hero 氣氛圖，可先用 Gemini，之後再換實拍或最終授權素材。',
      },
    },
    whatWeFrame: {
      title: 'What We Frame',
      description: '這一段把首頁的觀看方式壓成三個最小判準。',
      items: [
        {
          title: 'Look at the shell, not the scar.',
          body: '裂痕不是殘破效果，而是時間如何累積在表面的證據。',
          asset: {
            label: 'Crack Macro',
            path: 'frontend-review-assets/01_home/standards-preview/rp-home-standards-crack-tempAI-4x5-v001.png',
            kind: 'gemini',
            ratio: '4/5',
            note: '可先用 Gemini macro，之後可換實拍近拍。',
          },
        },
        {
          title: 'Look at the green, not the novelty.',
          body: '新綠不是裝飾，而是生命仍在往前推進的證據。',
          asset: {
            label: 'Green Macro',
            path: 'frontend-review-assets/01_home/standards-preview/rp-home-standards-green-tempAI-4x5-v001.png',
            kind: 'gemini',
            ratio: '4/5',
            note: '可先用 Gemini macro，之後可換實拍近拍。',
          },
        },
        {
          title: 'Look at rhythm, not short-term noise.',
          body: '這個品牌看的是節奏是否成立，而不是短時間的刺激變化。',
          asset: {
            label: 'Rhythm Macro',
            path: 'frontend-review-assets/01_home/standards-preview/rp-home-standards-rhythm-tempAI-4x5-v001.png',
            kind: 'gemini',
            ratio: '4/5',
            note: '可先用 Gemini macro，之後可換實拍近拍。',
          },
        },
      ],
    },
    currentBatch: {
      title: 'Current Selection',
      description:
        '首頁只證明現在有東西可看，不把它做成完整商品總表。若沒有完整真圖，先用規範化 placeholder，不假裝成熟。',
      primaryCta: 'See Current Selection',
      secondaryCta: 'View Archive',
      asset: {
        label: 'Current Batch Atmosphere',
        path: 'frontend-review-assets/01_home/selection-preview/rp-home-selection-batch-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: '批次氣氛圖可先用 Gemini；真正 specimen 卡位用 placeholder 或實拍。',
      },
      previewCards: [
        {
          label: 'Specimen Preview A',
          path: 'frontend-review-assets/01_home/selection-preview/rp-home-selection-card-placeholder-3x4-v001.png',
          kind: 'placeholder',
          ratio: '3/4',
          note: '沒有真圖時一律用 placeholder，不用 AI 假商品圖。',
        },
        {
          label: 'Specimen Preview B',
          path: 'frontend-review-assets/01_home/selection-preview/rp-home-selection-card-placeholder-3x4-v001.png',
          kind: 'placeholder',
          ratio: '3/4',
          note: '沒有真圖時一律用 placeholder，不用 AI 假商品圖。',
        },
        {
          label: 'Specimen Preview C',
          path: 'frontend-review-assets/01_home/selection-preview/rp-home-selection-card-placeholder-3x4-v001.png',
          kind: 'placeholder',
          ratio: '3/4',
          note: '沒有真圖時一律用 placeholder，不用 AI 假商品圖。',
        },
      ],
    },
    standardsPreview: {
      title: 'Standards',
      description: '這個品牌不是只靠氣氛站住，而是靠它怎麼看、怎麼留、怎麼拒絕。',
      cta: 'Read Standards',
      asset: {
        label: 'Standards Preview Asset',
        path: 'frontend-review-assets/01_home/standards-preview/rp-home-standards-entry-tempAI-3x2-v001.png',
        kind: 'gemini',
        ratio: '3/2',
        note: '抽象 support image，可先用 Gemini。',
      },
    },
    cultivationPreview: {
      title: 'Cultivation',
      description: '不是把它催大，而是別打亂它的節奏。這一頁只做方法母頁的入口。',
      cta: 'Read Cultivation',
      asset: {
        label: 'Cultivation Environment',
        path: 'frontend-review-assets/01_home/cultivation-preview/rp-home-cultivation-env-tempAI-4x3-v001.png',
        kind: 'gemini',
        ratio: '4/3',
        note: '環境圖可先用 Gemini，之後可替換成實際場域圖。',
      },
    },
    membershipPreview: {
      title: 'Membership',
      description:
        '帳號不是門票，而是你與個體互動、紀錄與售後的起點。這一輪只做靜態敘事殼，不驗真流程。',
      ctaLearnMore: 'What is Membership',
      ctaStart: 'Start with Google',
      ctaContinue: 'Continue to Account',
      asset: {
        label: 'Membership Notes',
        path: 'frontend-review-assets/01_home/membership-preview/rp-home-membership-notes-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: '可先用筆記與標籤感氣氛圖，不用流程圖主導首頁。',
      },
    },
    supportPreview: {
      title: 'Support',
      description:
        '公開 FAQ 與一般詢問會留在 /support；綁單與售後問題不在首頁處理，只先讓人知道入口位置。',
      cta: 'Go to Support',
      asset: {
        label: 'Support Texture',
        path: 'frontend-review-assets/01_home/support-preview/rp-home-support-paper-tempAI-3x2-v001.png',
        kind: 'gemini',
        ratio: '3/2',
        note: '可先用紙張與材質圖，避免首頁 support 區太像客服系統。',
      },
    },
  },
  standards: {
    hero: {
      eyebrow: 'Standards',
      title: '標準，不是情緒。',
      description: '我們不是在找最稀有的，而是在找最值得被長時間觀看的。',
      primaryCta: 'Read Cultivation',
      secondaryCta: 'See Selection',
      asset: {
        label: 'Standards Hero',
        path: 'frontend-review-assets/03_standards/hero/rp-standards-hero-shellbud-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: 'Hero macro 可先用 Gemini，之後可替換實拍近拍。',
      },
    },
    whatWeSee: {
      title: 'What We See',
      description: '三個核心觀看軸，用來把抽象的品牌判準落成可掃描的頁面。',
      items: [
        { title: 'Geometry', body: '看比例與輪廓，不先看稀有度。' },
        { title: 'Surface', body: '看殼面與裂紋，不把殘破誤認為成熟。' },
        { title: 'Vitality', body: '看芽點與生命狀態，不被短期熱鬧騙走。' },
      ],
    },
    keepReject: {
      title: 'What We Keep / Reject',
      keep: [
        '值得被長時間觀看的節奏',
        '自然成立的殼面與新生',
        '不靠誇張敘事也能站住的個體',
      ],
      reject: [
        '只靠稀有標籤撐價值',
        '把做舊效果誤認成成熟',
        '短時間強刺激但節奏不穩的個體',
      ],
    },
    readingExample: {
      title: 'How We Read a Specimen',
      description: '這一區先用 annotation placeholder 佔位，不假裝已有完整 diagram。',
      asset: {
        label: 'Reading Annotation Placeholder',
        path: 'frontend-review-assets/03_standards/support/rp-standards-reading-annotation-placeholder-16x9-v001.png',
        kind: 'placeholder',
        ratio: '16/9',
        note: '此圖只能 placeholder，等之後再補正式 reading annotation。',
      },
    },
    whyItMatters: {
      title: 'Why Standards Matter',
      body: '如果沒有標準，Selection 只會變成一堆看起來差不多的個體。這頁存在的目的，就是替 Selection 建立可被理解的閱讀語法。',
    },
    ctas: {
      primary: 'Read Cultivation',
      secondary: 'See Selection',
    },
  },
  cultivation: {
    hero: {
      eyebrow: 'Cultivation',
      title: '養護不是把它催大，而是別打亂它的節奏。',
      description: '方法不是秘密；真正重要的是你是否理解它的時間感。',
      primaryCta: 'See Selection',
      secondaryCta: 'Need Support',
      asset: {
        label: 'Cultivation Hero',
        path: 'frontend-review-assets/04_cultivation/hero/rp-cultivation-hero-environment-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: 'Hero 用環境圖，不用商品主體大圖。',
      },
    },
    seasonalRhythm: {
      title: 'Seasonal Rhythm',
      description: '先理解季節節奏，再談任何水、盆、根系操作。',
      asset: {
        label: 'Seasonal Diagram',
        path: 'frontend-review-assets/04_cultivation/support/rp-cultivation-season-diagram-placeholder-16x9-v001.png',
        kind: 'placeholder',
        ratio: '16/9',
        note: '這一輪只放 diagram placeholder，不做精細圖解美術。',
      },
    },
    waterTemperature: {
      title: 'Water / Temperature',
      items: [
        { title: 'Water', body: '不是越多越好，而是要跟節奏對位。' },
        { title: 'Temperature', body: '不要把刺激當生長；穩定比猛推重要。' },
      ],
    },
    rootSpace: {
      title: 'Space / Pot / Root',
      description: '這一段用來把根系、空間與容器感講清楚。',
      asset: {
        label: 'Root / Pot Support',
        path: 'frontend-review-assets/04_cultivation/support/rp-cultivation-rootpot-tempAI-4x3-v001.png',
        kind: 'gemini',
        ratio: '4/3',
        note: '可先用 Gemini support image，之後再換實際場景。',
      },
    },
    mistakes: {
      title: 'Common Mistakes',
      items: [
        '過度暴曬不是強化，常常只是更快把節奏打亂。',
        '太早判斷完成度，會讓你錯看小苗。',
        '把養護當催化，而不是節奏管理，最後只會越養越亂。',
      ],
    },
    ctas: {
      primary: 'See Selection',
      secondary: 'Need Support',
    },
  },
  membership: {
    hero: {
      eyebrow: 'Membership',
      title: '先登入，再決定你要不要申請。',
      description: '帳號不是門檻，是你與個體互動、紀錄與售後的起點。',
      startCta: 'Start with Google',
      continueCta: 'Continue to Account',
      selectionCta: 'Return to Selection',
      asset: {
        label: 'Membership Hero',
        path: 'frontend-review-assets/05_membership/hero/rp-membership-hero-notes-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: '可先用關係感與筆記感 support image。',
      },
    },
    whyAccountExists: {
      title: 'Why an Account Exists',
      items: [
        { title: 'Follow', body: '把你想繼續看的個體留在一個地方。' },
        { title: 'Apply', body: '把真正的申請動作與公開瀏覽分開。' },
        { title: 'Records & Aftercare', body: '把申請、訂單與售後都留在帳號裡。' },
      ],
    },
    firstTime: {
      title: 'What Happens First Time',
      description: '這一輪只放靜態時間線與文字，不做真 flow；First Apply Gate 之後再驗。',
      asset: {
        label: 'Membership Timeline Placeholder',
        path: 'frontend-review-assets/05_membership/flow/rp-membership-flow-timeline-placeholder-16x9-v001.png',
        kind: 'placeholder',
        ratio: '16/9',
        note: '本輪只做 timeline placeholder，不做互動 flow。',
      },
    },
    whatNot: {
      title: 'What Membership Is Not',
      items: [
        '不是折扣卡',
        '不是神祕門票',
        '不是一進站就逼你填大表單',
      ],
    },
    timeline: {
      title: 'Flow Timeline',
      description: '先理解帳號與申請關係，實際互動會在登入後進一步完成。',
    },
    ctas: {
      start: 'Start with Google',
      continue: 'Continue to Account',
      selection: 'Return to Selection',
    },
  },
  story: {
    hero: {
      eyebrow: 'Story',
      title: '我們不是去創造侘寂，而是辨識它何時已經開始成立。',
      description: '龜甲龍不是奇物收藏，而是時間如何被看見的一個載體。',
      primaryCta: 'Read Standards',
      secondaryCta: 'See Selection',
      asset: {
        label: 'Story Hero',
        path: 'frontend-review-assets/07_story/hero/rp-story-hero-alcove-tempAI-16x9-v001.png',
        kind: 'gemini',
        ratio: '16/9',
        note: 'Hero 只用單一空間主圖，不做生活風拼貼。',
      },
    },
    whyThisPlant: {
      title: 'Why This Plant',
      body: '我們喜歡它，不是因為它稀有，而是因為它把時間留下來。',
      asset: {
        label: 'Story Macro',
        path: 'frontend-review-assets/07_story/support/rp-story-support-crackgreen-tempAI-4x5-v001.png',
        kind: 'gemini',
        ratio: '4/5',
        note: '可先用 crack + green macro，之後再換實拍。',
      },
    },
    whatWeFrame: {
      title: 'What We Frame',
      body: '這不是做舊風格，而是辨識、接受、裱框一段仍在變化中的生命時間。',
      asset: {
        label: 'Story Texture',
        path: 'frontend-review-assets/07_story/support/rp-story-texture-claywall-tempAI-3x2-v001.png',
        kind: 'gemini',
        ratio: '3/2',
        note: '可先用 clay texture 強化空間語氣。',
      },
    },
    transition: {
      title: 'From Selection to Cultivation',
      body: '這個品牌不是只會選，也不是只會養；它把看與對待接成同一條路。',
      asset: {
        label: 'Story Transition Image',
        path: 'frontend-review-assets/07_story/support/rp-story-support-transition-tempAI-3x2-v001.png',
        kind: 'gemini',
        ratio: '3/2',
        note: '若沒有更合適的 support image，可先用 Gemini 氣氛圖。',
      },
    },
    future: {
      title: 'What This Brand Will Become',
      body: '現在從 Selection 開始，未來會慢慢走向更完整的自培與自有系統；但不管在哪個階段，做的都是同一件事：把值得被長時間觀看的變化留下來。',
      asset: {
        label: 'Story Longform Placeholder',
        path: 'frontend-review-assets/07_story/support/rp-story-longform-placeholder-3x2-v001.png',
        kind: 'placeholder',
        ratio: '3/2',
        note: '若沒有合適長文 support 圖，先用 placeholder。',
      },
    },
    ctas: {
      primary: 'Read Standards',
      secondary: 'See Selection',
    },
  },
} as const;

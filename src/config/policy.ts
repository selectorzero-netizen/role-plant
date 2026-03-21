export interface MembershipPolicySchema {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  audience: {
    title: string;
    description: string;
    items: string[];
  };
  process: {
    title: string;
    steps: Array<{
      id: string;
      label: string;
      title: string;
      content: string;
    }>;
  };
  approvedBenefits: {
    title: string;
    items: Array<{
      title: string;
      content: string;
    }>;
  };
  loginNotice: {
    text: string;
  };
  pendingBanner: {
    title: string;
    description: string;
  };
}

export const MEMBERSHIP_POLICY: MembershipPolicySchema = {
  hero: {
    title: '收藏級植物檔案庫',
    subtitle: 'ROLE PLANT ARCHIVE MEMBERSHIP',
    description: '這是一個審核制的社群與植物檔案庫。我們不追求大量的快速交易，而是希望與真正欣賞龜甲龍質樸之美、具備基礎養護概念的收藏者，建立長期的交流與信任。'
  },
  audience: {
    title: '誰適合申請？',
    description: '我們的植物釋出頻率極低，且釋出前皆經過完整的紀錄與健康度檢驗。因此，本站會員優先開放給以下對象：',
    items: [
      '具備基礎塊根植物養護經驗，能理解植物週期變化的收藏者。',
      '認同「以時間換取植物完成度」理念，不急於追求短期炒作。',
      '願意長期交流培育紀錄，甚至協助參與資料庫追蹤者。'
    ]
  },
  process: {
    title: '申請後流程與審核說明',
    steps: [
      {
        id: 'step-1',
        label: 'Step 1',
        title: '授權與建立存檔',
        content: '只需透過 Google 帳號授權登入，系統即會為您自動建立基礎資料，減少表單填寫的繁瑣。進入此階段後，您的身分將顯示為「審核中 (Pending)」。'
      },
      {
        id: 'step-2',
        label: 'Step 2',
        title: '等待人工審核',
        content: 'Pending 期間，您已經可以進入 Member Area 查看個人檔案框架，但進階功能（如加入追蹤清單、申請認養）將暫時鎖定。系統將不定期檢查 Pending 名單。'
      },
      {
        id: 'step-3',
        label: 'Step 3',
        title: '若未獲通過或名額已滿',
        content: '由於我們釋出的數量極其有限，我們無法核准所有申請。若您長期處於 Pending 狀態，表示目前並無開放名額，或者與我們當下的審核標的不符，我們將不另行退件通知。'
      }
    ]
  },
  approvedBenefits: {
    title: '核准後 (Approved) 解鎖功能',
    items: [
      {
        title: '第一優先釋出申請權',
        content: '當植物完成評估轉為「可釋出 (Available)」時，正式會員有第一時間的認養申請資格。'
      },
      {
        title: '專屬追蹤清單與深度數據',
        content: '解鎖所有植物的詳細培育日誌與專屬追蹤清單，持續觀察植物變化。'
      },
      {
        title: '參與線下觀賞與會談',
        content: '不定期的實體展示與培育心得交流會，將僅向 Approved 會員發送邀請。'
      }
    ]
  },
  loginNotice: {
    text: '採用 Google 帳戶驗證您的身分。\n登入後將進入「審核中 (Pending)」狀態，等待管理團隊確認資格與名額。'
  },
  pendingBanner: {
    title: '審核中 (Pending)',
    description: '您的帳號已成功建立，目前正在等待管理團隊審核。\nPending 期間，您可先熟悉 Member Area 介面並自由瀏覽公開檔案。\n請注意：我們釋出名額有限，若您長期處於此狀態，代表目前並無開放名額或未達審核標準，將不另行通知。'
  }
};

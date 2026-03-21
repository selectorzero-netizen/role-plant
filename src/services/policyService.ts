import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MEMBERSHIP_POLICY, MembershipPolicySchema } from '../config/policy';

export type PolicySource = 'firestore' | 'local_fallback' | 'partial_fallback' | 'invalid_remote_data';

export const policyService = {
  async getMembershipPolicy(): Promise<{ data: MembershipPolicySchema, source: PolicySource }> {
    try {
      const docRef = doc(db, 'settings', 'membership');
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.warn('Membership policy not found in Firestore. Using default runtime config.');
        return { data: MEMBERSHIP_POLICY, source: 'local_fallback' };
      }

      const data = docSnap.data();
      
      let isPartial = false;
      
      const safeMergeArray = (remoteArr: any, defaultArr: any[], mapper: (item: any, idx: number) => any) => {
        if (!Array.isArray(remoteArr)) {
          isPartial = true;
          return defaultArr;
        }
        return remoteArr.length > 0 ? remoteArr.map(mapper) : defaultArr;
      };

      const mergedData = {
        hero: {
          title: data.hero?.title ?? MEMBERSHIP_POLICY.hero.title,
          subtitle: data.hero?.subtitle ?? MEMBERSHIP_POLICY.hero.subtitle,
          description: data.hero?.description ?? MEMBERSHIP_POLICY.hero.description,
        },
        audience: {
          title: data.audience?.title ?? MEMBERSHIP_POLICY.audience.title,
          description: data.audience?.description ?? MEMBERSHIP_POLICY.audience.description,
          items: safeMergeArray(data.audience?.items, MEMBERSHIP_POLICY.audience.items, (item: any) => item),
        },
        process: {
          title: data.process?.title ?? MEMBERSHIP_POLICY.process.title,
          steps: safeMergeArray(data.process?.steps, MEMBERSHIP_POLICY.process.steps, (step: any, idx: number) => ({
            id: step?.id ?? MEMBERSHIP_POLICY.process.steps[idx]?.id ?? `step-${idx}`,
            label: step?.label ?? MEMBERSHIP_POLICY.process.steps[idx]?.label ?? `Step ${idx + 1}`,
            title: step?.title ?? MEMBERSHIP_POLICY.process.steps[idx]?.title ?? '未定義標題',
            content: step?.content ?? MEMBERSHIP_POLICY.process.steps[idx]?.content ?? '無內容'
          })),
        },
        approvedBenefits: {
          title: data.approvedBenefits?.title ?? MEMBERSHIP_POLICY.approvedBenefits.title,
          items: safeMergeArray(data.approvedBenefits?.items, MEMBERSHIP_POLICY.approvedBenefits.items, (item: any, idx: number) => ({
            title: item?.title ?? MEMBERSHIP_POLICY.approvedBenefits.items[idx]?.title ?? '未定義標題',
            content: item?.content ?? MEMBERSHIP_POLICY.approvedBenefits.items[idx]?.content ?? '無內容'
          })),
        },
        loginNotice: {
          text: data.loginNotice?.text ?? MEMBERSHIP_POLICY.loginNotice.text,
        },
        pendingBanner: {
          title: data.pendingBanner?.title ?? MEMBERSHIP_POLICY.pendingBanner.title,
          description: data.pendingBanner?.description ?? MEMBERSHIP_POLICY.pendingBanner.description,
        }
      };

      // If data exists but has no recognized keys, it's totally invalid.
      if (Object.keys(data).length === 0) {
        return { data: MEMBERSHIP_POLICY, source: 'invalid_remote_data' };
      }

      return { data: mergedData, source: isPartial ? 'partial_fallback' : 'firestore' };
    } catch (error) {
      console.error('Failed to fetch membership policy. Falling back to default.', error);
      return { data: MEMBERSHIP_POLICY, source: 'local_fallback' };
    }
  },

  async saveMembershipPolicy(policy: MembershipPolicySchema): Promise<void> {
    const docRef = doc(db, 'settings', 'membership');
    await setDoc(docRef, policy);
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MEMBERSHIP_POLICY, MembershipPolicySchema } from './config/policy';
import { policyService, PolicySource } from './services/policyService';

interface PolicyContextType {
  membershipPolicy: MembershipPolicySchema;
  isLoadingProvider: boolean;
  source: PolicySource | 'loading';
}

const PolicyContext = createContext<PolicyContextType>({
  membershipPolicy: MEMBERSHIP_POLICY, // Immediate synchronous fallback
  isLoadingProvider: true,
  source: 'loading',
});

export const PolicyProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with local file config to prevent white screen / layout shift
  const [membershipPolicy, setMembershipPolicy] = useState<MembershipPolicySchema>(MEMBERSHIP_POLICY);
  const [isLoadingProvider, setIsLoadingProvider] = useState(true);
  const [source, setSource] = useState<PolicySource | 'loading'>('loading');

  useEffect(() => {
    let mounted = true;
    policyService.getMembershipPolicy().then(res => {
      if (mounted) {
        setMembershipPolicy(res.data);
        setSource(res.source);
        setIsLoadingProvider(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PolicyContext.Provider value={{ membershipPolicy, isLoadingProvider, source }}>
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => useContext(PolicyContext);

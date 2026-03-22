/**
 * contentService.ts
 *
 * Manages the `content` Firestore collection with fixed document schemas per page.
 */

import { db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

// ─── Types per Page ─────────────────────────────────────────────────────────

export interface HomeContent {
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  taglineTitle: string;
  taglineDescription: string;
  sections: {
    hero: boolean;
    tagline: boolean;
    featured: boolean;
    links: boolean;
  };
}

export interface AboutContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface BusinessContent {
  title: string;
  subtitle: string;
  description: string;
  services: { title: string; description: string; enabled: boolean }[];
}

export interface MembershipContent {
  title: string;
  subtitle: string;
  description: string;
  audienceTitle: string;
  audienceDescription: string;
  audienceItems: string[];
  ctaText: string;
}

export interface LearnContent {
  title: string;
  subtitle: string;
  description: string;
  intro1Title: string;
  intro1Content: string;
  intro2Title: string;
  intro2Content: string;
  standards: { name: string; description: string; enabled: boolean }[];
}

export interface FaqContent {
  title: string;
  subtitle: string;
  description: string;
  items: { question: string; answer: string; enabled: boolean }[];
}

const COL = 'content';

export const contentService = {
  async getPageContent<T>(pageId: string): Promise<T | null> {
    try {
      const snap = await getDoc(doc(db, COL, pageId));
      if (!snap.exists()) return null;
      return snap.data() as T;
    } catch (err) {
      console.error(`contentService.getPageContent(${pageId}) failed:`, err);
      return null;
    }
  },

  async savePageContent<T>(pageId: string, content: T): Promise<void> {
    await setDoc(doc(db, COL, pageId), content as any, { merge: true });
  },
};

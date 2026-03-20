export type Role = 'public' | 'member' | 'editor' | 'admin';
export type Status = 'pending' | 'approved';

export interface UserProfile {
  uid: string;
  email: string | null;
  name?: string | null;
  role: Role;
  status: Status;
  favorites?: string[];
  createdAt?: string | number;
}

export interface Plant {
  id: string;
  name: string;
  status: string;
  image: string;
  size: string;
  source: string;
  stats: {
    expression: string;
    balance: string;
    proportion: string;
  };
  details: {
    summary: string;
    suitableFor: string;
    cultivationNotes: string;
  };
  isPublic?: boolean;
  sortOrder?: number;
}

export interface MemberApplication {
  id?: string;
  userId: string;
  plantId?: string;
  requestType?: string;
  status: string;
  createdAt?: number | string;
}

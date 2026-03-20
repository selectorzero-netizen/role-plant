import { UserProfile } from '../types';
import { profileService } from './profileService';

export const authService = {
  initializeProfileIfNew: async (uid: string, email: string | null, name?: string | null): Promise<UserProfile> => {
    let profile = await profileService.getProfile(uid);
    if (!profile) {
      profile = {
        uid,
        email,
        name,
        role: 'member',
        status: 'pending',
        favorites: [],
        createdAt: Date.now()
      };
      await profileService.createProfile(uid, profile);
    }
    return profile;
  }
};

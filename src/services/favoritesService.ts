import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, collection, query, getDocs } from 'firebase/firestore';
import { Plant } from '../types';
import { plantDatabase } from '../components/Shared';

export const favoritesService = {
  addFavorite: async (userId: string, plantId: string) => {
    await updateDoc(doc(db, 'profiles', userId), {
      favorites: arrayUnion(plantId)
    });
  },
  removeFavorite: async (userId: string, plantId: string) => {
    await updateDoc(doc(db, 'profiles', userId), {
      favorites: arrayRemove(plantId)
    });
  },
  getFavoritePlants: async (favoriteIds: string[]): Promise<Plant[]> => {
    if (!favoriteIds || favoriteIds.length === 0) return [];
    try {
      const q = query(collection(db, 'plants'));
      const snapshot = await getDocs(q);
      const allPlants = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Plant));
      const favs = allPlants.filter(p => favoriteIds.includes(p.id));
      if (favs.length === 0) {
        return plantDatabase.filter(p => favoriteIds.includes(p.id)) as Plant[];
      }
      return favs;
    } catch (e) {
      console.error("Error fetching favs:", e);
      return plantDatabase.filter(p => favoriteIds.includes(p.id)) as Plant[];
    }
  }
};

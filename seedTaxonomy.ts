/**
 * seedTaxonomy.ts
 * 
 * Run this in the browser console or as a temporary script to seed taxonomy.
 */
import { taxonomyService } from './src/services/taxonomyService';

const seed = async () => {
  const items = [
    // Plant Categories
    { type: 'plant_category', key: 'agave', label: '龍舌蘭 Agave', sortOrder: 1, isActive: true },
    { type: 'plant_category', key: 'aroid', label: '天南星 Aroid', sortOrder: 2, isActive: true },
    { type: 'plant_category', key: 'cactus', label: '仙人掌 Cactus', sortOrder: 3, isActive: true },
    
    // Plant Grades
    { type: 'plant_grade', key: 'S', label: 'S 級 (博物館級)', sortOrder: 1, isActive: true },
    { type: 'plant_grade', key: 'A', label: 'A 級 (精品)', sortOrder: 2, isActive: true },
    { type: 'plant_grade', key: 'B', label: 'B 級 (進階)', sortOrder: 3, isActive: true },
    
    // Post Categories
    { type: 'post_category', key: 'news', label: '品牌公告 News', sortOrder: 1, isActive: true },
    { type: 'post_category', key: 'guide', label: '養護指南 Guide', sortOrder: 2, isActive: true }
  ];

  for (const item of items) {
    await taxonomyService.create(item as any);
  }
  console.log('Seeding complete!');
};

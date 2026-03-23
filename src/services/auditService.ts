import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuditLog } from '../types';

export const auditService = {
  log: async (log: Omit<AuditLog, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'audit_logs'), {
        ...log,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to write audit log:', error);
    }
  }
};

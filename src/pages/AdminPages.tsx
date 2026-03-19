import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db, functions } from '../firebase';
import { collection, query, getDocs, updateDoc, doc, addDoc, getDoc, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!userProfile || !['admin', 'editor'].includes(userProfile.role))) {
      navigate('/');
    }
  }, [userProfile, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">Loading...</div>;
  }

  if (!userProfile || !['admin', 'editor'].includes(userProfile.role)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex">
      <aside className="w-64 bg-[#1A1A1A] text-white p-6 flex flex-col">
        <div className="mb-12">
          <Link to="/" className="text-lg tracking-widest font-medium text-white">
            ROLE PLANT<span className="text-[#5A6B58]">.</span>
          </Link>
          <p className="text-[10px] tracking-widest uppercase text-white/50 mt-2">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-4">
          <Link to="/admin" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/admin/plants" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Plants</Link>
          {userProfile.role === 'admin' && (
            <>
              <Link to="/admin/applications" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Applications</Link>
              <Link to="/admin/inquiries" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Inquiries</Link>
              <Link to="/admin/orders" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Orders</Link>
              <Link to="/admin/notifications" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Notifications</Link>
              <Link to="/admin/users" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Users</Link>
            </>
          )}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-xs text-white/50">Logged in as {userProfile.role}</p>
        </div>
      </aside>
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Dashboard</h1>
      <p className="text-[#1A1A1A]/70">Welcome to the private admin panel. Select an option from the sidebar to manage content.</p>
    </div>
  );
}

export function AdminPlants() {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const q = query(collection(db, 'plants'));
        const snapshot = await getDocs(q);
        const plantsData = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        // Sort by sortOrder
        plantsData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        setPlants(plantsData);
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const handleDelete = async (plantId: string) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await deleteDoc(doc(db, 'plants', plantId));
        setPlants(plants.filter(p => p.id !== plantId));
      } catch (error) {
        console.error("Error deleting plant:", error);
        alert('Error deleting plant');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight">Manage Plants</h1>
        <button onClick={() => navigate('/admin/plants/new')} className="bg-[#1A1A1A] text-white px-4 py-2 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-2">
          <Plus size={16} /> Add Plant
        </button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white border border-[#1A1A1A]/10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10 bg-[#F7F7F5]">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Public</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map(plant => (
                <tr key={plant.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F7F7F5]/50">
                  <td className="px-6 py-4 font-mono">{plant.id}</td>
                  <td className="px-6 py-4">{plant.name}</td>
                  <td className="px-6 py-4">{plant.status}</td>
                  <td className="px-6 py-4 font-mono">${plant.price}</td>
                  <td className="px-6 py-4">{plant.isPublic ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => navigate(`/admin/plants/${plant.id}`)} className="text-[#5A6B58] hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(plant.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {plants.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#1A1A1A]/50">No plants found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminPlantEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [formData, setFormData] = useState<any>({
    id: '',
    name: '',
    batchSource: '',
    status: '培育中',
    price: 0,
    size: '',
    stats: { expression: '', balance: '', proportion: '' },
    details: { summary: '', cultivationNotes: '', suitableFor: '' },
    image: '',
    isPublic: false,
    sortOrder: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const fetchPlant = async () => {
        try {
          const docRef = doc(db, 'plants', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as any);
          } else {
            alert('Plant not found');
            navigate('/admin/plants');
          }
        } catch (error) {
          console.error("Error fetching plant:", error);
        }
      };
      fetchPlant();
    }
  }, [id, isNew, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value;
    
    if (name.startsWith('stats.')) {
      const statName = name.split('.')[1];
      setFormData(prev => ({ ...prev, stats: { ...prev.stats, [statName]: val } }));
    } else if (name.startsWith('details.')) {
      const detailName = name.split('.')[1];
      setFormData(prev => ({ ...prev, details: { ...prev.details, [detailName]: val } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: val }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const plantData = {
        ...formData,
        createdAt: isNew ? serverTimestamp() : formData.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (isNew) {
        if (!formData.id) {
          alert("ID is required");
          setLoading(false);
          return;
        }
        await setDoc(doc(db, 'plants', formData.id), plantData);
      } else {
        await updateDoc(doc(db, 'plants', id!), plantData);
      }
      alert('Saved successfully');
      navigate('/admin/plants');
    } catch (error) {
      console.error("Error saving plant:", error);
      alert('Error saving plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/plants')} className="text-[#1A1A1A]/50 hover:text-[#1A1A1A]"><ArrowLeft size={24} /></button>
        <h1 className="text-3xl font-light tracking-tight">{isNew ? 'Add Plant' : 'Edit Plant'}</h1>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10 p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">ID (e.g. RP-24-001)</label>
            <input type="text" name="id" value={formData.id} onChange={handleChange} disabled={!isNew} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58] disabled:bg-gray-100" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Batch / Source</label>
            <input type="text" name="batchSource" value={formData.batchSource} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]">
              <option value="培育中">培育中</option>
              <option value="可申請">可申請</option>
              <option value="可售">可售</option>
              <option value="保留中">保留中</option>
              <option value="已售">已售</option>
              <option value="Archive">Archive</option>
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Size</label>
            <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Sort Order</label>
            <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
          </div>
          <div className="flex items-center gap-3 pt-8">
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} id="isPublic" className="w-4 h-4" />
            <label htmlFor="isPublic" className="text-sm">Is Public (Visible on website)</label>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-6">
          <h3 className="text-sm font-medium mb-4">Stats (判讀評級)</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Expression (表現)</label>
              <input type="text" name="stats.expression" value={formData.stats.expression} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Balance (面相)</label>
              <input type="text" name="stats.balance" value={formData.stats.balance} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Proportion (比例)</label>
              <input type="text" name="stats.proportion" value={formData.stats.proportion} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-6 space-y-4">
          <h3 className="text-sm font-medium mb-4">Details</h3>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Summary (判讀摘要)</label>
            <textarea name="details.summary" value={formData.details.summary} onChange={handleChange} rows={3} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]"></textarea>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Cultivation Notes (培育提醒)</label>
            <textarea name="details.cultivationNotes" value={formData.details.cultivationNotes} onChange={handleChange} rows={3} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]"></textarea>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Suitable For (適合對象)</label>
            <textarea name="details.suitableFor" value={formData.details.suitableFor} onChange={handleChange} rows={2} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]"></textarea>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-6">
          <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Image URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#5A6B58]" placeholder="/images/plant-1.jpg" />
          {formData.image && (
            <div className="mt-4 w-32 h-32 bg-gray-100 border border-gray-200 overflow-hidden">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="pt-6 flex justify-end">
          <button onClick={handleSave} disabled={loading} className="bg-[#1A1A1A] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#5A6B58] transition-colors flex items-center gap-2 disabled:opacity-50">
            <Save size={16} /> {loading ? 'Saving...' : 'Save Plant'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'profiles'));
        const snapshot = await getDocs(q);
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // If we use Firebase Functions for custom claims, we can call it here.
      // For now, we update the Firestore document as the source of truth for UI,
      // but remember actual secure rules require the function.
      await updateDoc(doc(db, 'profiles', userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      alert('權限已更新');
    } catch (error) {
      console.error("Error updating role:", error);
      alert('更新失敗');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'profiles', userId), { status: newStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Error updating status:", error);
      alert('狀態更新失敗');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Manage Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white border border-[#1A1A1A]/10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10 bg-[#F7F7F5]">
              <tr>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F7F7F5]/50">
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.name || '-'}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={user.status || 'pending'} 
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="border border-[#1A1A1A]/20 p-2 text-sm focus:outline-none focus:border-[#5A6B58]"
                    >
                      <option value="pending">Pending (審核中)</option>
                      <option value="approved">Approved (已通過)</option>
                      <option value="rejected">Rejected (拒絕)</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={user.role || 'member'} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border border-[#1A1A1A]/20 p-2 text-sm focus:outline-none focus:border-[#5A6B58]"
                    >
                      <option value="member">Member</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const q = query(collection(db, 'memberApplications'));
        const snapshot = await getDocs(q);
        setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'memberApplications', appId), { status: newStatus });
      setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    } catch (error) {
      console.error("Error updating status:", error);
      alert('Error updating status');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Manage Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white border border-[#1A1A1A]/10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10 bg-[#F7F7F5]">
              <tr>
                <th className="px-6 py-4 font-medium">Plant ID</th>
                <th className="px-6 py-4 font-medium">User ID</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F7F7F5]/50">
                  <td className="px-6 py-4 font-mono">{app.plantId}</td>
                  <td className="px-6 py-4 font-mono text-xs">{app.userId}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={app.status} 
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="border border-[#1A1A1A]/20 p-2 text-sm focus:outline-none focus:border-[#5A6B58]"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-[#1A1A1A]/50">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const q = query(collection(db, 'inquiries'));
        const snapshot = await getDocs(q);
        setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), { status: newStatus });
      setInquiries(inqs => inqs.map(inq => inq.id === inquiryId ? { ...inq, status: newStatus } : inq));
    } catch (error) {
      console.error("Error updating status:", error);
      alert('Error updating status');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Manage Inquiries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white border border-[#1A1A1A]/10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10 bg-[#F7F7F5]">
              <tr>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => (
                <tr key={inq.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F7F7F5]/50">
                  <td className="px-6 py-4">{inq.contactName}</td>
                  <td className="px-6 py-4">{inq.email}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{inq.details}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={inq.status} 
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className="border border-[#1A1A1A]/20 p-2 text-sm focus:outline-none focus:border-[#5A6B58]"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="done">Done</option>
                    </select>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#1A1A1A]/50">No inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'));
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus, updatedAt: serverTimestamp() });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Manage Orders</h1>
      <div className="bg-white border border-[#1A1A1A]/10">
        <table className="w-full text-sm text-left">
          <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10">
            <tr>
              <th className="px-6 py-4 font-normal">Order ID</th>
              <th className="px-6 py-4 font-normal">User ID</th>
              <th className="px-6 py-4 font-normal">Total</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-[#1A1A1A]/5">
                <td className="px-6 py-4 font-mono">{order.id}</td>
                <td className="px-6 py-4 font-mono">{order.uid}</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status || 'pending'} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-transparent border border-[#1A1A1A]/20 px-2 py-1 text-xs uppercase tracking-widest"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#5A6B58] hover:underline text-xs tracking-widest uppercase">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNotification, setNewNotification] = useState({ uid: '', title: '', message: '' });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const q = query(collection(db, 'notifications'));
        const snapshot = await getDocs(q);
        setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'notifications'), {
        ...newNotification,
        read: false,
        createdAt: serverTimestamp()
      });
      setNotifications([{ id: docRef.id, ...newNotification, read: false }, ...notifications]);
      setNewNotification({ uid: '', title: '', message: '' });
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("Error creating notification");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await deleteDoc(doc(db, 'notifications', id));
        setNotifications(notifications.filter(n => n.id !== id));
      } catch (error) {
        console.error("Error deleting notification:", error);
        alert("Error deleting notification");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Manage Notifications</h1>
      
      <div className="bg-white border border-[#1A1A1A]/10 p-6 mb-8">
        <h2 className="text-lg mb-4">Create Notification</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">User ID (or 'all')</label>
            <input 
              type="text" 
              value={newNotification.uid} 
              onChange={e => setNewNotification({...newNotification, uid: e.target.value})}
              className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#1A1A1A]"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Title</label>
            <input 
              type="text" 
              value={newNotification.title} 
              onChange={e => setNewNotification({...newNotification, title: e.target.value})}
              className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#1A1A1A]"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/50 mb-2">Message</label>
            <textarea 
              value={newNotification.message} 
              onChange={e => setNewNotification({...newNotification, message: e.target.value})}
              className="w-full border border-[#1A1A1A]/20 p-3 text-sm focus:outline-none focus:border-[#1A1A1A] h-24"
              required
            />
          </div>
          <button type="submit" className="bg-[#1A1A1A] text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-black transition-colors">
            Send Notification
          </button>
        </form>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10">
        <table className="w-full text-sm text-left">
          <thead className="text-xs tracking-widest uppercase text-[#1A1A1A]/50 border-b border-[#1A1A1A]/10">
            <tr>
              <th className="px-6 py-4 font-normal">User ID</th>
              <th className="px-6 py-4 font-normal">Title</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <tr key={notification.id} className="border-b border-[#1A1A1A]/5">
                <td className="px-6 py-4 font-mono">{notification.uid}</td>
                <td className="px-6 py-4">{notification.title}</td>
                <td className="px-6 py-4">{notification.read ? 'Read' : 'Unread'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(notification.id)} className="text-red-500 hover:underline text-xs tracking-widest uppercase">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

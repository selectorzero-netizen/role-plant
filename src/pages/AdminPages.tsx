import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, getDocs, updateDoc, doc, addDoc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
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
               <Link to="/admin/users" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Users</Link>
               <Link to="/admin/content" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Content</Link>
               <Link to="/admin/settings" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Settings</Link>
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
      await updateDoc(doc(db, 'profiles', userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      // Removed noisy success alert
    } catch (error) {
      console.error("Error updating role:", error);
      alert('Error updating role');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'profiles', userId), { status: newStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Error updating status:", error);
      alert('Error updating status');
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
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F7F7F5]/50">
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.name || '-'}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border border-[#1A1A1A]/20 p-2 text-sm focus:outline-none focus:border-[#5A6B58] w-full"
                    >
                      <option value="member">Member</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={user.status || 'pending'} 
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="border border-[#1A1A1A]/20 p-2 text-sm focus:outline-none focus:border-[#5A6B58] w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
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
        const q = query(collection(db, 'applications'));
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
      await updateDoc(doc(db, 'applications', appId), { status: newStatus });
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

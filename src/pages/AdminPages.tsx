import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Routes, Route, Link, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, getDocs, updateDoc, doc, addDoc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowLeft, Plus, Save, Trash2, User, FileText, Check, X, ShieldAlert } from 'lucide-react';
import { adminService, ApplicationWithUser } from '../services/adminService';
import { UserProfile, AuditLog } from '../types';
import { auditService } from '../services/auditService';

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
          <Link to="/admin/posts" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Posts</Link>
          <Link to="/admin/media" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Media</Link>
          {userProfile.role === 'admin' && (
            <>
              <Link to="/admin/applications" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Applications</Link>
               <Link to="/admin/inquiries" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Inquiries</Link>
               <Link to="/admin/users" className="block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">Members</Link>
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
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { userProfile: currentUser } = useAuth();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllMembers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: any) => {
    if (userId === currentUser?.uid) {
      alert("You cannot change your own role to prevent self-lockout.");
      return;
    }
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    try {
      const oldUser = users.find(u => u.uid === userId);
      await adminService.updateMemberRole(userId, newRole);

      if (currentUser) {
        await auditService.log({
          userId: currentUser.uid,
          userName: currentUser.name,
          action: 'role_change',
          entityType: 'member',
          entityId: userId,
          details: `Changed member ${oldUser?.name || userId} role from ${oldUser?.role} to ${newRole}`,
          before: { role: oldUser?.role },
          after: { role: newRole }
        });
      }

      setUsers(users.map(u => u.uid === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: any) => {
    if (userId === currentUser?.uid && newStatus !== 'approved') {
      alert("You cannot deactivate your own account status.");
      return;
    }
    if (!confirm(`確定要將此會員狀態更改為 ${newStatus.toUpperCase()} 嗎？`)) return;
    try {
      const oldUser = users.find(u => u.uid === userId);
      await adminService.updateMemberStatus(userId, newStatus);
      
      if (currentUser) {
        await auditService.log({
          userId: currentUser.uid,
          userName: currentUser.name,
          action: 'status_change',
          entityType: 'member',
          entityId: userId,
          details: `Changed member ${oldUser?.name || userId} status from ${oldUser?.status} to ${newStatus}`,
          before: { status: oldUser?.status },
          after: { status: newStatus }
        });
      }

      setUsers(users.map(u => u.uid === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredUsers = users.filter(u => filterStatus === 'all' || u.status === filterStatus);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Members</h1>
          <p className="text-xs tracking-widest uppercase text-[#1A1A1A]/50">Manage system users and statuses</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-[#1A1A1A]/10 px-4 py-2 text-xs tracking-widest uppercase focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 border-b border-[#1A1A1A]/10 bg-[#F7F7F5]">
            <tr>
              <th className="px-8 py-4 font-medium">User Info</th>
              <th className="px-8 py-4 font-medium w-48">Role</th>
              <th className="px-8 py-4 font-medium w-48">Status</th>
              <th className="px-8 py-4 font-medium w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]/5">
            {filteredUsers.map(user => (
              <tr key={user.uid} className="hover:bg-[#F7F7F5]/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#EBEBE8] rounded-full flex items-center justify-center text-[#1A1A1A]/30">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{user.name || 'Unnamed'}</p>
                      <p className="text-xs text-[#1A1A1A]/50">{user.email}</p>
                      <p className="text-[9px] font-mono text-[#1A1A1A]/30 mt-1">{user.uid}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                    disabled={user.uid === currentUser?.uid}
                    className="w-full bg-transparent border border-[#1A1A1A]/10 p-2 text-xs focus:outline-none focus:border-[#5A6B58] disabled:opacity-50"
                  >
                    <option value="member">Member</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-8 py-6">
                  <span className={`inline-block px-3 py-1 text-[9px] tracking-widest uppercase border ${
                    user.status === 'approved' ? 'bg-[#5A6B58]/10 border-[#5A6B58]/20 text-[#5A6B58]' :
                    user.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-600' :
                    'bg-orange-50 border-orange-100 text-orange-600'
                  }`}>
                    {user.status || 'pending'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    {user.status !== 'approved' && (
                      <button 
                        onClick={() => handleStatusChange(user.uid, 'approved')}
                        className="p-2 text-[#5A6B58] hover:bg-[#5A6B58]/10 rounded transition-colors"
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    {user.status !== 'rejected' && user.uid !== currentUser?.uid && (
                      <button 
                        onClick={() => handleStatusChange(user.uid, 'rejected')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-[#1A1A1A]/40 text-xs tracking-widest uppercase">
                  No matches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminApplications() {
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [selectedApp, setSelectedApp] = useState<ApplicationWithUser | null>(null);
  const { userProfile: currentUser } = useAuth();

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const handleStatusChange = async (appId: string, newStatus: any) => {
    if (!confirm(`確定要將此申請單狀態更改為 ${newStatus.toUpperCase()} 嗎？`)) return;
    try {
      const oldApp = applications.find(a => a.id === appId);
      const currentUserProfile = (window as any).__USER_PROFILE__ || currentUser; // Fallback for context timing

      await adminService.updateApplicationStatus(appId, newStatus);
      
      if (currentUser) {
        await auditService.log({
          userId: currentUser.uid,
          userName: currentUser.name,
          action: 'status_change',
          entityType: 'application',
          entityId: appId,
          details: `Changed application ${appId} status from ${oldApp?.status} to ${newStatus}`,
          before: { status: oldApp?.status },
          after: { status: newStatus }
        });
      }

      setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
      if (selectedApp?.id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredApps = applications.filter(a => filterStatus === 'all' || a.status === filterStatus);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Plant Applications</h1>
          <p className="text-xs tracking-widest uppercase text-[#1A1A1A]/50">Review and manage plant procurement requests</p>
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-[#1A1A1A]/10 px-4 py-2 text-xs tracking-widest uppercase focus:outline-none"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-[#1A1A1A]/10">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 border-b border-[#1A1A1A]/10 bg-[#F7F7F5]">
              <tr>
                <th className="px-6 py-4 font-medium">Plant ID</th>
                <th className="px-6 py-4 font-medium">Applicant</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/5">
              {filteredApps.map(app => (
                <tr 
                  key={app.id} 
                  onClick={() => setSelectedApp(app)}
                  className={`cursor-pointer hover:bg-[#F7F7F5]/50 transition-colors ${selectedApp?.id === app.id ? 'bg-[#F7F7F5]' : ''}`}
                >
                  <td className="px-6 py-5 font-mono text-xs">{app.plantId}</td>
                  <td className="px-6 py-5">
                    <p className="font-medium text-xs">{app.user?.name || 'Unknown'}</p>
                    <p className="text-[10px] text-[#1A1A1A]/50">{app.user?.email}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 border ${
                      app.status === 'approved' ? 'bg-[#5A6B58]/10 border-[#5A6B58]/20 text-[#5A6B58]' :
                      app.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-600' :
                      'bg-orange-50 border-orange-100 text-orange-600'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && !loading && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-[#1A1A1A]/40 text-xs tracking-widest uppercase">
                    None found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-[#1A1A1A]/10 p-8 h-fit sticky top-8">
          {selectedApp ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="border-b border-[#1A1A1A]/10 pb-4">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-2">Application Details</h3>
                <p className="font-mono text-xs text-[#1A1A1A]/50">ID: {selectedApp.id}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 mb-1">Plant Reference</label>
                  <p className="font-mono text-base">{selectedApp.plantId}</p>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 mb-1">Applicant</label>
                  <p className="text-sm">{selectedApp.user?.name} ({selectedApp.user?.email})</p>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 mb-1">Submitted At</label>
                  <p className="text-sm">{selectedApp.createdAt ? new Date(selectedApp.createdAt as any).toLocaleString() : '-'}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#1A1A1A]/10 space-y-4">
                <p className="text-xs text-[#1A1A1A]/50 lowercase italic">Update status:</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleStatusChange(selectedApp.id, 'approved')}
                    disabled={selectedApp.status === 'approved'}
                    className="flex items-center justify-center gap-2 py-3 bg-[#5A6B58] text-white text-xs tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors disabled:opacity-30"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedApp.id, 'rejected')}
                    disabled={selectedApp.status === 'rejected'}
                    className="flex items-center justify-center gap-2 py-3 border border-red-600 text-red-600 text-xs tracking-widest uppercase hover:bg-red-50 transition-colors disabled:opacity-30"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
                {selectedApp.status !== 'pending' && (
                  <button 
                    onClick={() => handleStatusChange(selectedApp.id, 'pending')}
                    className="w-full py-2 text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                  >
                    Reset to Pending
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
              <FileText size={48} strokeWidth={1} />
              <p className="text-xs tracking-widest uppercase font-light">Select an application<br/>to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


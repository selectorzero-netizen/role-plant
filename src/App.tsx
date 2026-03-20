import React from 'react';
import { HomePage, AboutPage, BusinessPage, LearnPage } from './pages/PublicPages';
import { CollectionPage, SinglePlantPage } from './pages/CollectionPages';
import { MemberPage, LoginPage } from './pages/MemberPages';
import { AdminLayout, AdminDashboard, AdminPlants, AdminPlantEdit, AdminUsers, AdminApplications, AdminInquiries } from './pages/AdminPages';
import { Layout } from './components/Shared';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requireRole, requireApproved }: { children: React.ReactNode, requireRole?: 'admin' | 'editor' | 'member', requireApproved?: boolean }) => {
  const { userProfile, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) return <div className="h-screen flex items-center justify-center text-sm tracking-widest uppercase">載入權限中... Loading...</div>;
  if (!userProfile) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requireRole && userProfile.role !== requireRole && userProfile.role !== 'admin') {
    return <div className="h-screen flex items-center justify-center flex-col"><h1 className="text-4xl mb-4 font-light">403</h1><p className="text-sm tracking-widest uppercase text-gray-500">Access Denied</p></div>;
  }
  if (requireApproved && userProfile.status !== 'approved') {
    return <div className="h-screen flex items-center justify-center flex-col bg-[#F7F7F5]"><h1 className="text-2xl mb-2 font-light tracking-widest text-[#1A1A1A]">Pending Approval</h1><p className="text-sm tracking-widest text-[#1A1A1A]/50">您的帳號仍在審核中</p></div>;
  }
  return children;
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/plants" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminPlants /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/plants/:id" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminPlantEdit /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminApplications /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminInquiries /></AdminLayout></ProtectedRoute>} />
        
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/collection" element={<Layout><CollectionPage /></Layout>} />
        <Route path="/collection/:id" element={<Layout><SinglePlantPage /></Layout>} />
        <Route path="/learn" element={<Layout><LearnPage /></Layout>} />
        <Route path="/business" element={<Layout><BusinessPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/member" element={<ProtectedRoute><Layout><MemberPage /></Layout></ProtectedRoute>} />
      </Routes>
    </>
  );
}




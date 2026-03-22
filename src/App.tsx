import React from 'react';
import { HomePage, AboutPage, BusinessPage, LearnPage, MembershipPage } from './pages/PublicPages';
import { PostListPage, PostDetailPage } from './pages/PostPages';
import { CollectionPage, SinglePlantPage } from './pages/CollectionPages';
import { MemberPage, LoginPage } from './pages/MemberPages';
import { AdminLayout, AdminDashboard, AdminUsers, AdminApplications } from './pages/AdminPages';
import { AdminPlants } from './pages/AdminPlants';
import { AdminPlantEditor } from './pages/AdminPlantEditor';
import { AdminSettings } from './pages/AdminSettings';
import { AdminContentList, AdminContentEditor } from './pages/AdminContentEditor';
import { AdminInquiries } from './pages/AdminInquiries';
import { AdminPosts } from './pages/AdminPosts';
import { AdminPostEditor } from './pages/AdminPostEditor';
import { AdminMedia } from './pages/AdminMedia';
import { Layout, AuthLayout } from './components/Shared';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requireRole, requireApproved }: { children: React.ReactNode, requireRole?: 'admin' | 'editor' | 'member', requireApproved?: boolean }) => {
  const { userProfile, isAuthReady, authError, retryInit } = useAuth();
  const location = useLocation();

  if (authError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F7F7F5] px-6">
        <h1 className="text-2xl mb-2 font-light tracking-widest text-red-800">登入驗證失敗</h1>
        <p className="text-sm tracking-widest text-[#1A1A1A]/50 mb-8">無法載入會員資料 (連線超時或初始失敗)。</p>
        <div className="flex gap-4">
          <button onClick={retryInit} className="px-6 py-3 bg-[#1A1A1A] text-white text-xs tracking-widest hover:bg-[#5A6B58] transition-colors">重新嘗試 (Retry)</button>
          <a href="/login" className="px-6 py-3 border border-[#1A1A1A]/20 text-xs tracking-widest hover:bg-[#1A1A1A]/5 transition-colors">返回登入 (Back)</a>
        </div>
      </div>
    );
  }

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
        <Route path="/admin/plants/:id" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminPlantEditor /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminApplications /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminInquiries /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminPosts /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/posts/:id" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminPostEditor /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/media" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminMedia /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/content" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminContentList /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/content/:pageId" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminContentEditor /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute requireRole="admin"><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/collection" element={<Layout><CollectionPage /></Layout>} />
        <Route path="/collection/:id" element={<Layout><SinglePlantPage /></Layout>} />
        <Route path="/learn" element={<Layout><LearnPage /></Layout>} />
        <Route path="/business" element={<Layout><BusinessPage /></Layout>} />
        <Route path="/posts" element={<Layout><PostListPage /></Layout>} />
        <Route path="/posts/:slug" element={<Layout><PostDetailPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/membership" element={<Layout><MembershipPage /></Layout>} />
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/member" element={<ProtectedRoute><Layout><MemberPage /></Layout></ProtectedRoute>} />
      </Routes>
    </>
  );
}




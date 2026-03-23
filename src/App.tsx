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
import { AdminTaxonomy } from './pages/AdminTaxonomy';
import { Layout, AuthLayout } from './components/Shared';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserRole } from './types';

const ProtectedRoute = ({ 
  children, 
  requireRole, 
  requireApproved 
}: { 
  children: React.ReactNode, 
  requireRole?: UserRole | UserRole[], 
  requireApproved?: boolean 
}) => {
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

  // Admin access check
  if (requireRole) {
    const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
    const hasRole = roles.includes(userProfile.role as UserRole) || userProfile.role === 'super_admin';
    
    if (!hasRole) {
      return (
        <div className="h-screen flex items-center justify-center flex-col bg-[#F7F7F5]">
          <h1 className="text-4xl mb-4 font-light tracking-tighter">403</h1>
          <p className="text-[10px] tracking-widest uppercase text-gray-500">Access Denied - 權限不足</p>
          <a href="/" className="mt-8 text-[10px] uppercase tracking-widest border-b border-[#1A1A1A]/20 pb-1">返回首頁 Back to Home</a>
        </div>
      );
    }
  }

  if (requireApproved && userProfile.status !== 'approved') {
    return <div className="h-screen flex items-center justify-center flex-col bg-[#F7F7F5]"><h1 className="text-2xl mb-2 font-light tracking-widest text-[#1A1A1A]">Pending Approval</h1><p className="text-sm tracking-widest text-[#1A1A1A]/50">您的帳號仍在審核中</p></div>;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>
  },
  {
    path: '/collection',
    element: <Layout><CollectionPage /></Layout>
  },
  {
    path: '/collection/:id',
    element: <Layout><SinglePlantPage /></Layout>
  },
  {
    path: '/learn',
    element: <Layout><LearnPage /></Layout>
  },
  {
    path: '/business',
    element: <Layout><BusinessPage /></Layout>
  },
  {
    path: '/posts',
    element: <Layout><PostListPage /></Layout>
  },
  {
    path: '/posts/:slug',
    element: <Layout><PostDetailPage /></Layout>
  },
  {
    path: '/about',
    element: <Layout><AboutPage /></Layout>
  },
  {
    path: '/membership',
    element: <Layout><MembershipPage /></Layout>
  },
  {
    path: '/login',
    element: <AuthLayout><LoginPage /></AuthLayout>
  },
  {
    path: '/member',
    element: <ProtectedRoute><Layout><MemberPage /></Layout></ProtectedRoute>
  },
  // Admin Routes
  {
    path: '/admin',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/plants',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminPlants /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/plants/:id',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminPlantEditor /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/users',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/members',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/applications',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminApplications /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/inquiries',
    element: <ProtectedRoute requireRole="admin"><AdminLayout><AdminInquiries /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/posts',
    element: <ProtectedRoute requireRole={['admin', 'editor']}><AdminLayout><AdminPosts /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/posts/:id',
    element: <ProtectedRoute requireRole={['admin', 'editor']}><AdminLayout><AdminPostEditor /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/media',
    element: <ProtectedRoute requireRole={['admin', 'editor']}><AdminLayout><AdminMedia /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/content',
    element: <ProtectedRoute requireRole={['admin', 'editor']}><AdminLayout><AdminContentList /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/content/:pageId',
    element: <ProtectedRoute requireRole={['admin', 'editor']}><AdminLayout><AdminContentEditor /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/settings',
    element: <ProtectedRoute requireRole="super_admin"><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>
  },
  {
    path: '/admin/taxonomy',
    element: <ProtectedRoute requireRole="super_admin"><AdminLayout><AdminTaxonomy /></AdminLayout></ProtectedRoute>
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}




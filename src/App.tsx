import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';
import { AppShell } from './frontend-shell/shell/AppShell';
import { ROUTES, LEGACY_RETIRED_ROUTES } from './frontend-shell/config/siteRoutes';
import { ProtectedAppRoute, AdminProtectedRoute } from './frontend-shell/routes/ProtectedAppRoute';
import {
  LegacyRetiredPage,
  LoginShellPage,
  SupportShellPage,
} from './frontend-shell/pages/RouteShellPages';
import { SelectionArchivePage, SelectionDossierPage, SelectionListPage } from './frontend-shell/pages/SelectionPages';
import { LoginGatewayPage } from './frontend-shell/pages/LoginGatewayPage';
import { AccountPage, ApplicationDetailPage } from './frontend-shell/pages/AccountPages';
import {
  CultivationPage,
  HomePage,
  MembershipPage,
  StandardsPage,
  StoryPage,
} from './frontend-shell/pages/PublicStaticPages';

import { AdminLayout, AdminDashboard, AdminUsers, AdminApplications } from './pages/AdminPages';
import { AdminPlants } from './pages/AdminPlants';
import { AdminPlantEditor } from './pages/AdminPlantEditor';
import { AdminInquiries } from './pages/AdminInquiries';
import { AdminMedia } from './pages/AdminMedia';
import { AdminTaxonomy } from './pages/AdminTaxonomy';

// BATCH_B_STATIC_PUBLIC
// Batch B upgrades static public pages on top of Batch A shell.
// Selection / Support / Login / Account flows stay in shell/prototype state for Batch C.

const wrapShell = (node: React.ReactNode) => <AppShell>{node}</AppShell>;

const ProtectedAccountOverviewRoute = () => (
  <ProtectedAppRoute intent="account-access" postLoginTarget={ROUTES.account}>
    <AccountPage />
  </ProtectedAppRoute>
);

const ProtectedApplicationDetailRoute = () => {
  const { id = '' } = useParams();

  return (
    <ProtectedAppRoute
      intent="application-access"
      applicationId={id}
      postLoginTarget={`/account/applications/${id}`}
    >
      <ApplicationDetailPage />
    </ProtectedAppRoute>
  );
};

const router = createBrowserRouter([
  { path: ROUTES.home, element: wrapShell(<HomePage />) },
  { path: ROUTES.selection, element: wrapShell(<SelectionListPage />) },
  { path: ROUTES.selectionArchive, element: wrapShell(<SelectionArchivePage />) },
  { path: ROUTES.selectionDetail, element: wrapShell(<SelectionDossierPage />) },
  { path: ROUTES.standards, element: wrapShell(<StandardsPage />) },
  { path: ROUTES.cultivation, element: wrapShell(<CultivationPage />) },
  { path: ROUTES.membership, element: wrapShell(<MembershipPage />) },
  { path: ROUTES.support, element: wrapShell(<SupportShellPage />) },
  { path: ROUTES.story, element: wrapShell(<StoryPage />) },
  { path: ROUTES.login, element: wrapShell(<LoginGatewayPage />) },
  { path: ROUTES.account, element: wrapShell(<ProtectedAccountOverviewRoute />) },
  { path: ROUTES.applicationDetail, element: wrapShell(<ProtectedApplicationDetailRoute />) },

  ...LEGACY_RETIRED_ROUTES.map((item) => ({
    path: item.legacyPath,
    element: wrapShell(
      <LegacyRetiredPage
        legacyPath={item.legacyPath}
        replacementTo={item.replacementTo}
        replacementLabel={item.replacementLabel}
      />
    ),
  })),

  {
    path: '/admin',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/plants',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminPlants />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/plants/:id',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminPlantEditor />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminUsers />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/members',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminUsers />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/applications',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminApplications />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/inquiries',
    element: (
      <AdminProtectedRoute requireRoles={['admin']}>
        <AdminLayout>
          <AdminInquiries />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/media',
    element: (
      <AdminProtectedRoute requireRoles={['admin', 'editor']}>
        <AdminLayout>
          <AdminMedia />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/taxonomy',
    element: (
      <AdminProtectedRoute requireRoles={['super_admin']}>
        <AdminLayout>
          <AdminTaxonomy />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },

  { path: '*', element: <Navigate to={ROUTES.home} replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}


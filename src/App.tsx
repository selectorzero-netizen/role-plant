import React from 'react';
import { HomePage, AboutPage, BusinessPage, LearnPage } from './pages/PublicPages';
import { CollectionPage, SinglePlantPage } from './pages/CollectionPages';
import { MemberPage, LoginPage } from './pages/MemberPages';
import { AdminLayout, AdminDashboard, AdminPlants, AdminPlantEdit, AdminUsers, AdminApplications, AdminInquiries } from './pages/AdminPages';
import { Layout } from './components/Shared';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/plants" element={<AdminLayout><AdminPlants /></AdminLayout>} />
      <Route path="/admin/plants/:id" element={<AdminLayout><AdminPlantEdit /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/applications" element={<AdminLayout><AdminApplications /></AdminLayout>} />
      <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
      
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/collection" element={<Layout><CollectionPage /></Layout>} />
      <Route path="/collection/:id" element={<Layout><SinglePlantPage /></Layout>} />
      <Route path="/learn" element={<Layout><LearnPage /></Layout>} />
      <Route path="/business" element={<Layout><BusinessPage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      <Route path="/member" element={<Layout><MemberPage /></Layout>} />
    </Routes>
  );
}




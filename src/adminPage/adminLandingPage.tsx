import UsersTable from 'components/usersTable';
import React from 'react';
import { EditUserFoodProvider } from './hooks/useEditUserFoodContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminInsightsPage from './adminInsightsPage';
const AdminLandingPage: React.FC = () => {
  return (
    <EditUserFoodProvider>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="stats" element={<AdminInsightsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </EditUserFoodProvider>
  );
};

export default AdminLandingPage;

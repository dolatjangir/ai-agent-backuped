// app/dashboard/properties/page.tsx
import AdminPropertiesPage from '@/components/property-admin/properties';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute>
  <AdminPropertiesPage />
  </ProtectedRoute>
);
}
import RequirementsPage from '@/components/getRequirement/requirement';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return (
  <ProtectedRoute>
  <RequirementsPage />
   </ProtectedRoute>)
}
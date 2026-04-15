import BrokersPage from '@/components/explore-broker/exploreBroker';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return (
   <ProtectedRoute>
  <BrokersPage />
 </ProtectedRoute>
);
}
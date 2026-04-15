import JoinBrokerApplicationsAdmin from '@/components/join-broker-network/joinNetwork';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return(
    <ProtectedRoute>
     <JoinBrokerApplicationsAdmin />
     </ProtectedRoute>
    );
}
import MasterProtectedRoute from "@/utils/masterProtectedRoute";
import ProtectedRoute from "@/utils/ProtectedRoute";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <MasterProtectedRoute>
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500 mt-2">Welcome to your admin panel</p>
    </div>
    </MasterProtectedRoute>
  );
}
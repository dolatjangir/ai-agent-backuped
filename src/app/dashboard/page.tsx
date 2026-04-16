import ProtectedRoute from "@/utils/ProtectedRoute";
import Page from "./properties/page";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <ProtectedRoute>
    <Page/>
    </ProtectedRoute>
  );
}
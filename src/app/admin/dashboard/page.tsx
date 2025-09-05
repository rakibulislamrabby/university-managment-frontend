import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import { UserRole } from '@/types/auth';

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardLayout>
        <AdminDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}

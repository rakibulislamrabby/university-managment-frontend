import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FacultyDashboard from '@/components/dashboards/FacultyDashboard';
import { UserRole } from '@/types/auth';

export default function FacultyDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.FACULTY]}>
      <DashboardLayout>
        <FacultyDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}


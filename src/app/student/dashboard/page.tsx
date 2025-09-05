import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import { UserRole } from '@/types/auth';

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
      <DashboardLayout>
        <StudentDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}


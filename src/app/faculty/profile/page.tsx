import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import { UserRole } from '@/types/auth';

export default function FacultyProfilePage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.FACULTY]}>
      <DashboardLayout>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Faculty Profile</h1>
          <ProfileForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}


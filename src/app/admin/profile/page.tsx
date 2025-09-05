import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import { UserRole } from '@/types/auth';

export default function AdminProfilePage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <DashboardLayout>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Administrator Profile</h1>
          <ProfileForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

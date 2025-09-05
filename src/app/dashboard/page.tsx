'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import ClientOnly from '@/components/ClientOnly';

function DashboardContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
        return;
      }

      // Redirect to role-specific dashboard
      switch (user.role) {
        case UserRole.ADMIN:
          router.push('/admin/dashboard');
          break;
        case UserRole.FACULTY:
          router.push('/faculty/dashboard');
          break;
        case UserRole.STUDENT:
          router.push('/student/dashboard');
          break;
        default:
          router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <DashboardContent />
    </ClientOnly>
  );
}

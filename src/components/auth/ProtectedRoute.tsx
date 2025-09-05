'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push('/login');
        return;
      }

      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        const dashboardPath = getDashboardPath(user.role);
        router.push(dashboardPath);
        return;
      }
    }
  }, [user, isLoading, requireAuth, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null; // Will redirect to login
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null; // Will redirect to appropriate dashboard
  }

  return <>{children}</>;
}

function getDashboardPath(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return '/admin/dashboard';
    case UserRole.FACULTY:
      return '/faculty/dashboard';
    case UserRole.STUDENT:
      return '/student/dashboard';
    default:
      return '/dashboard';
  }
}


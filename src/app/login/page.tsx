'use client';

import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ClientOnly from '@/components/ClientOnly';

function LoginContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to dashboard if already logged in
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <ClientOnly
      fallback={<LoginForm />}
    >
      <LoginContent />
    </ClientOnly>
  );
}

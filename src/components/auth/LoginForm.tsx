'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        onLoginSuccess?.();
        // Redirect based on role will be handled by the route protection
        router.push('/dashboard');
      } else {
        setError('Invalid user ID or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = (role: UserRole) => {
    switch (role) {
      case UserRole.STUDENT:
        setEmail('student-1');
        setPassword('student123');
        break;
      case UserRole.FACULTY:
        setEmail('faculty-1');
        setPassword('faculty123');
        break;
      case UserRole.ADMIN:
        setEmail('admin-1');
        setPassword('admin123');
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            University Management System
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                User ID
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your user ID"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="text-sm text-gray-600 text-center mb-3">
              Demo Accounts:
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fillDemoCredentials(UserRole.STUDENT)}
                type="button"
              >
                Student Demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fillDemoCredentials(UserRole.FACULTY)}
                type="button"
              >
                Faculty Demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fillDemoCredentials(UserRole.ADMIN)}
                type="button"
              >
                Admin Demo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


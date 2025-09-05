'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  const getDisplayName = () => {
    const profile = user.profile;
    if ('name' in profile) {
      return `${profile.name.firstName} ${profile.name.lastName}`;
    }
    return 'User';
  };

  const getRoleDisplayName = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return 'Administrator';
      case UserRole.FACULTY:
        return 'Faculty';
      case UserRole.STUDENT:
        return 'Student';
      default:
        return user.role;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                University Management System
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{getDisplayName()}</span>
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
                {getRoleDisplayName()}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}


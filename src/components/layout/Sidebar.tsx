'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface SidebarItem {
  name: string;
  href: string;
  icon?: string;
}

const adminNavigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'User Management', href: '/admin/users' },
  { name: 'Academic Management', href: '/admin/academic' },
  { name: 'Semester Management', href: '/admin/semesters' },
  { name: 'Course Management', href: '/admin/courses' },
  { name: 'Faculty Management', href: '/admin/faculty' },
  { name: 'Student Management', href: '/admin/students' },
  { name: 'Building & Rooms', href: '/admin/buildings' },
  { name: 'Payment Management', href: '/admin/payments' },
  { name: 'Permissions', href: '/admin/permissions' },
  { name: 'Activity Logs', href: '/admin/activity' },
  { name: 'Profile', href: '/admin/profile' }
];

const facultyNavigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/faculty/dashboard' },
  { name: 'My Courses', href: '/faculty/courses' },
  { name: 'Student Grades', href: '/faculty/grades' },
  { name: 'Class Schedule', href: '/faculty/schedule' },
  { name: 'Lecture Resources', href: '/faculty/resources' },
  { name: 'Student Information', href: '/faculty/students' },
  { name: 'Profile', href: '/faculty/profile' }
];

const studentNavigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/student/dashboard' },
  { name: 'Course Enrollment', href: '/student/enrollment' },
  { name: 'My Courses', href: '/student/courses' },
  { name: 'Class Schedule', href: '/student/schedule' },
  { name: 'Fee Payment', href: '/student/payments' },
  { name: 'Transaction History', href: '/student/transactions' },
  { name: 'Results', href: '/student/results' },
  { name: 'Notice Board', href: '/student/notices' },
  { name: 'Teacher Evaluation', href: '/student/evaluations' },
  { name: 'Profile', href: '/student/profile' }
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const getNavigation = (): SidebarItem[] => {
    switch (user.role) {
      case UserRole.ADMIN:
        return adminNavigation;
      case UserRole.FACULTY:
        return facultyNavigation;
      case UserRole.STUDENT:
        return studentNavigation;
      default:
        return [];
    }
  };

  const navigation = getNavigation();

  const isActive = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:z-30">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50 border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive(item.href)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}


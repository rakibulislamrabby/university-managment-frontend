'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Student } from '@/types/auth';

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = user?.profile as Student;

  if (!student) return null;

  const quickActions = [
    { title: 'Course Enrollment', description: 'Enroll in new courses', href: '/student/enrollment' },
    { title: 'Fee Payment', description: 'Pay tuition fees', href: '/student/payments' },
    { title: 'View Results', description: 'Check your academic results', href: '/student/results' },
    { title: 'Class Schedule', description: 'View your class timetable', href: '/student/schedule' }
  ];

  const recentActivities = [
    'Enrolled in Data Structures course',
    'Paid semester fee (Partial)',
    'Viewed midterm results',
    'Updated profile information'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {student.name.firstName}!
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your academic journey.
        </p>
      </div>

      {/* Student Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Student ID:</span> {student.id}</p>
              <p><span className="font-medium">Department:</span> Computer Science</p>
              <p><span className="font-medium">Semester:</span> Spring 2024</p>
              <p><span className="font-medium">CGPA:</span> 3.75</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Enrolled Courses:</span> 6</p>
              <p><span className="font-medium">Credit Hours:</span> 18</p>
              <p><span className="font-medium">Attendance:</span> 92%</p>
              <p><span className="font-medium">Status:</span> Active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Total Fee:</span> $5,000</p>
              <p><span className="font-medium">Paid:</span> $3,000</p>
              <p><span className="font-medium">Due:</span> $2,000</p>
              <p><span className="font-medium text-red-600">Due Date:</span> Mar 15, 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used features for easy access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2"
                onClick={() => window.location.href = action.href}
              >
                <span className="font-medium">{action.title}</span>
                <span className="text-sm text-gray-600">{action.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Your latest academic activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>
            Important dates to remember
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
              <div>
                <p className="font-medium text-sm">Fee Payment Due</p>
                <p className="text-xs text-gray-600">Semester fee balance</p>
              </div>
              <span className="text-sm font-medium text-yellow-700">Mar 15, 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
              <div>
                <p className="font-medium text-sm">Course Registration</p>
                <p className="text-xs text-gray-600">Summer 2024 enrollment</p>
              </div>
              <span className="text-sm font-medium text-blue-700">Apr 1, 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
              <div>
                <p className="font-medium text-sm">Final Exams</p>
                <p className="text-xs text-gray-600">Spring 2024 semester</p>
              </div>
              <span className="text-sm font-medium text-green-700">May 15, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


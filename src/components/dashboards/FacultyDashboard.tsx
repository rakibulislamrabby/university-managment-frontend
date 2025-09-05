'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Faculty } from '@/types/auth';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const faculty = user?.profile as Faculty;

  if (!faculty) return null;

  const quickActions = [
    { title: 'Grade Management', description: 'Update student grades', href: '/faculty/grades' },
    { title: 'Upload Resources', description: 'Share lecture materials', href: '/faculty/resources' },
    { title: 'View Students', description: 'Access student information', href: '/faculty/students' },
    { title: 'Class Schedule', description: 'View teaching schedule', href: '/faculty/schedule' }
  ];

  const recentActivities = [
    'Updated grades for Data Structures course',
    'Uploaded lecture notes for Database Systems',
    'Reviewed student attendance records',
    'Updated course syllabus'
  ];

  const currentCourses = [
    { code: 'CS201', name: 'Data Structures', students: 45, schedule: 'MWF 10:00-11:00' },
    { code: 'CS301', name: 'Database Systems', students: 38, schedule: 'TTh 14:00-15:30' },
    { code: 'CS401', name: 'Software Engineering', students: 32, schedule: 'MWF 15:00-16:00' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {faculty.designation} {faculty.name.firstName} {faculty.name.lastName}!
        </h1>
        <p className="text-gray-600">
          Manage your courses and student academic progress.
        </p>
      </div>

      {/* Faculty Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Faculty Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Faculty ID:</span> {faculty.id}</p>
              <p><span className="font-medium">Designation:</span> {faculty.designation}</p>
              <p><span className="font-medium">Department:</span> Computer Science</p>
              <p><span className="font-medium">Experience:</span> 8 years</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teaching Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Current Courses:</span> 3</p>
              <p><span className="font-medium">Total Students:</span> 115</p>
              <p><span className="font-medium">Credit Hours:</span> 9</p>
              <p><span className="font-medium">Office Hours:</span> MTW 2-4 PM</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Semester:</span> Spring 2024</p>
              <p><span className="font-medium">Research Projects:</span> 2</p>
              <p><span className="font-medium">Publications:</span> 12</p>
              <p><span className="font-medium">Rating:</span> 4.7/5.0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used teaching and administrative functions
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

      {/* Current Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Current Courses</CardTitle>
          <CardDescription>
            Courses you are teaching this semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentCourses.map((course, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{course.code} - {course.name}</h3>
                    <p className="text-sm text-gray-600">Schedule: {course.schedule}</p>
                    <p className="text-sm text-gray-600">Enrolled Students: {course.students}</p>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Your latest teaching and administrative activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>
            Important academic deadlines and tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-md">
              <div>
                <p className="font-medium text-sm">Grade Submission Deadline</p>
                <p className="text-xs text-gray-600">Midterm grades for CS201</p>
              </div>
              <span className="text-sm font-medium text-red-700">Mar 20, 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
              <div>
                <p className="font-medium text-sm">Faculty Meeting</p>
                <p className="text-xs text-gray-600">Department monthly meeting</p>
              </div>
              <span className="text-sm font-medium text-blue-700">Mar 25, 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
              <div>
                <p className="font-medium text-sm">Research Presentation</p>
                <p className="text-xs text-gray-600">Conference paper presentation</p>
              </div>
              <span className="text-sm font-medium text-purple-700">Apr 5, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


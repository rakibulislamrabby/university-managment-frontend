'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Admin } from '@/types/auth';

export default function AdminDashboard() {
  const { user } = useAuth();
  const admin = user?.profile as Admin;

  if (!admin) return null;

  const quickActions = [
    { title: 'User Management', description: 'Manage user accounts', href: '/admin/users' },
    { title: 'Academic Setup', description: 'Configure academic structure', href: '/admin/academic' },
    { title: 'Course Management', description: 'Manage courses and sections', href: '/admin/courses' },
    { title: 'Reports', description: 'Generate system reports', href: '/admin/reports' }
  ];

  const systemStats = [
    { label: 'Total Students', value: '2,456', change: '+12%', color: 'blue' },
    { label: 'Active Faculty', value: '184', change: '+3%', color: 'green' },
    { label: 'Current Courses', value: '89', change: '+8%', color: 'purple' },
    { label: 'Pending Payments', value: '$124,500', change: '-5%', color: 'yellow' }
  ];

  const recentActivities = [
    'Created new academic semester: Fall 2024',
    'Approved 15 new student registrations',
    'Updated course schedule for CS Department',
    'Generated monthly financial report',
    'Processed faculty promotion requests'
  ];

  const pendingTasks = [
    { task: 'Review new faculty applications', count: 8, priority: 'high' },
    { task: 'Approve course modifications', count: 12, priority: 'medium' },
    { task: 'Process fee waivers', count: 25, priority: 'medium' },
    { task: 'Update system permissions', count: 4, priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {admin.name.firstName}!
        </h1>
        <p className="text-gray-600">
          Manage university operations and oversee system administration.
        </p>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Administrator Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Admin ID:</span> {admin.id}</p>
              <p><span className="font-medium">Designation:</span> {admin.designation}</p>
              <p><span className="font-medium">Department:</span> {admin.managementDepartment}</p>
              <p><span className="font-medium">Access Level:</span> Super Admin</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Server Status:</span> Online</p>
              <p><span className="font-medium">Database:</span> Connected</p>
              <p><span className="font-medium">Last Backup:</span> 2 hours ago</p>
              <p><span className="font-medium">System Load:</span> 73%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Active Sessions:</span> 1,234</p>
              <p><span className="font-medium">Today's Logins:</span> 856</p>
              <p><span className="font-medium">Pending Approvals:</span> 47</p>
              <p><span className="font-medium">System Alerts:</span> 3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Actions</CardTitle>
          <CardDescription>
            Frequently used administrative functions
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

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>
            Administrative tasks requiring your attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{item.task}</p>
                    <p className="text-xs text-gray-600">{item.count} items pending</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Administrative Activities</CardTitle>
          <CardDescription>
            Latest system and administrative actions
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

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>
            Important system notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div>
                <p className="font-medium text-sm text-yellow-800">Scheduled Maintenance</p>
                <p className="text-xs text-yellow-700">System maintenance scheduled for this weekend</p>
              </div>
              <span className="text-sm font-medium text-yellow-700">Mar 16, 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div>
                <p className="font-medium text-sm text-blue-800">Database Backup</p>
                <p className="text-xs text-blue-700">Weekly database backup completed successfully</p>
              </div>
              <span className="text-sm font-medium text-blue-700">Completed</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-md">
              <div>
                <p className="font-medium text-sm text-green-800">Security Update</p>
                <p className="text-xs text-green-700">Latest security patches applied</p>
              </div>
              <span className="text-sm font-medium text-green-700">Up to date</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


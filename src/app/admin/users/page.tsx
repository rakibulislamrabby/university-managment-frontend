'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers, mockStudents, mockFaculty, mockAdmins, getUserProfile } from '@/data/mockData';
import { UserRole } from '@/types/auth';

export default function UserManagementPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Filter users based on role and search
  const filteredUsers = mockUsers.filter(user => {
    const roleMatch = selectedRole === 'all' || user.role === selectedRole;
    const profile = getUserProfile(user);
    const searchMatch = !searchTerm || 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (profile && 'email' in profile && profile.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (profile && 'name' in profile && 
        `${profile.name.firstName} ${profile.name.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return roleMatch && searchMatch;
  });

  const handleBlockUser = async (userId: string) => {
    // In real app, make API call
    if (confirm('Are you sure you want to block this user?')) {
      alert('User blocked successfully');
    }
  };

  const handleUnblockUser = async (userId: string) => {
    // In real app, make API call
    if (confirm('Are you sure you want to unblock this user?')) {
      alert('User unblocked successfully');
    }
  };

  const handleChangePassword = async (userId: string) => {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      alert('Password changed successfully');
    }
  };

  const handleForceLogout = async (userId: string) => {
    if (confirm('Force logout this user from all devices?')) {
      alert('User logged out from all devices');
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'bg-red-100 text-red-800';
      case UserRole.FACULTY: return 'bg-blue-100 text-blue-800';
      case UserRole.STUDENT: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive: boolean, isBlocked: boolean) => {
    if (isBlocked) return 'bg-red-100 text-red-800';
    if (isActive) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (isActive: boolean, isBlocked: boolean) => {
    if (isBlocked) return 'Blocked';
    if (isActive) return 'Active';
    return 'Inactive';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage user accounts, permissions, and access</p>
      </div>

      {/* User Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockUsers.length}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mockUsers.filter(u => u.role === UserRole.STUDENT).length}
              </div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {mockUsers.filter(u => u.role === UserRole.FACULTY).length}
              </div>
              <div className="text-sm text-gray-600">Faculty</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {mockUsers.filter(u => u.role === UserRole.ADMIN).length}
              </div>
              <div className="text-sm text-gray-600">Admins</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {mockUsers.filter(u => u.isBlocked).length}
              </div>
              <div className="text-sm text-gray-600">Blocked</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {mockUsers.filter(u => u.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole | 'all')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Roles</option>
                <option value={UserRole.STUDENT}>Students</option>
                <option value={UserRole.FACULTY}>Faculty</option>
                <option value={UserRole.ADMIN}>Admins</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search Users</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Search by ID, name, or email..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {filteredUsers.length} users found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">User ID</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-center py-2">Role</th>
                    <th className="text-center py-2">Status</th>
                    <th className="text-center py-2">Created</th>
                    <th className="text-center py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const profile = getUserProfile(user);
                    return (
                      <tr key={user.id} className="border-b">
                        <td className="py-3 font-medium">{user.id}</td>
                        <td className="py-3">
                          {profile && 'name' in profile 
                            ? `${profile.name.firstName} ${profile.name.lastName}`
                            : 'N/A'
                          }
                        </td>
                        <td className="py-3">
                          {profile && 'email' in profile ? profile.email : 'N/A'}
                        </td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.isActive, user.isBlocked)}`}>
                            {getStatusText(user.isActive, user.isBlocked)}
                          </span>
                        </td>
                        <td className="py-3 text-center text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                            >
                              {selectedUser === user.id ? 'Hide' : 'View'}
                            </Button>
                            {user.isBlocked ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnblockUser(user.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                Unblock
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBlockUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Block
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details */}
      {selectedUser && (() => {
        const user = mockUsers.find(u => u.id === selectedUser);
        const profile = user ? getUserProfile(user) : null;
        
        if (!user || !profile) return null;

        return (
          <Card>
            <CardHeader>
              <CardTitle>
                User Details - {user.id}
              </CardTitle>
              <CardDescription>Detailed information and management options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div>
                  <h4 className="font-semibold mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-medium">{user.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.isActive, user.isBlocked)}`}>
                        {getStatusText(user.isActive, user.isBlocked)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{new Date(user.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div>
                  <h4 className="font-semibold mb-3">Profile Information</h4>
                  <div className="space-y-2 text-sm">
                    {'name' in profile && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">
                          {profile.name.firstName} {profile.name.middleName} {profile.name.lastName}
                        </span>
                      </div>
                    )}
                    {'email' in profile && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{profile.email}</span>
                      </div>
                    )}
                    {'contactNo' in profile && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">{profile.contactNo}</span>
                      </div>
                    )}
                    {'gender' in profile && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium capitalize">{profile.gender}</span>
                      </div>
                    )}
                    {'dateOfBirth' in profile && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{profile.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Management Actions */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Management Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleChangePassword(user.id)}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleForceLogout(user.id)}
                  >
                    Force Logout
                  </Button>
                  {user.isBlocked ? (
                    <Button
                      variant="outline"
                      onClick={() => handleUnblockUser(user.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Unblock User
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleBlockUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Block User
                    </Button>
                  )}
                  <Button variant="outline">
                    View Permissions
                  </Button>
                  <Button variant="outline">
                    Activity Log
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedUser(null)}
                >
                  Close Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16">
              ➕<br/>Create User
            </Button>
            <Button variant="outline" className="h-16">
              📊<br/>Export Users
            </Button>
            <Button variant="outline" className="h-16">
              📧<br/>Send Notifications
            </Button>
            <Button variant="outline" className="h-16">
              🔄<br/>Bulk Actions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

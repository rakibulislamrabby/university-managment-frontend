'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Student, Faculty, Admin, UserRole } from '@/types/auth';
import authService from '@/services/authService';

export default function ProfileForm() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  if (!user) return null;

  const profile = user.profile;

  React.useEffect(() => {
    // Initialize form data with current profile
    setFormData(profile);
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      // Handle nested fields like name.firstName
      const [parent, child] = field.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await authService.updateProfile(formData);
      if (success) {
        setIsEditing(false);
        // You might want to show a success message here
      } else {
        // Handle error
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEditableFields = () => {
    // Define which fields can be edited based on role
    const commonFields = ['contactNo', 'emergencyContactNo', 'presentAddress'];
    
    switch (user.role) {
      case UserRole.STUDENT:
        return [...commonFields, 'bloodGroup'];
      case UserRole.FACULTY:
        return [...commonFields];
      case UserRole.ADMIN:
        return [...commonFields];
      default:
        return commonFields;
    }
  };

  const editableFields = getEditableFields();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and settings
              </CardDescription>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              disabled={isLoading}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Fields */}
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={formData.name?.firstName || ''}
                  onChange={(e) => handleInputChange('name.firstName', e.target.value)}
                  disabled={true} // Name is usually not editable
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={formData.name?.lastName || ''}
                  onChange={(e) => handleInputChange('name.lastName', e.target.value)}
                  disabled={true} // Name is usually not editable
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  disabled={true} // Email is usually not editable
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <input
                  type="text"
                  value={formData.gender || ''}
                  disabled={true}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Number</label>
                <input
                  type="tel"
                  value={formData.contactNo || ''}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
                  disabled={!isEditing || !editableFields.includes('contactNo')}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                    !isEditing || !editableFields.includes('contactNo') 
                      ? 'bg-gray-50 text-gray-600' 
                      : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Emergency Contact</label>
                <input
                  type="tel"
                  value={formData.emergencyContactNo || ''}
                  onChange={(e) => handleInputChange('emergencyContactNo', e.target.value)}
                  disabled={!isEditing || !editableFields.includes('emergencyContactNo')}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                    !isEditing || !editableFields.includes('emergencyContactNo') 
                      ? 'bg-gray-50 text-gray-600' 
                      : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Blood Group (for students) */}
              {user.role === UserRole.STUDENT && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Group</label>
                  <input
                    type="text"
                    value={formData.bloodGroup || ''}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    disabled={!isEditing || !editableFields.includes('bloodGroup')}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                      !isEditing || !editableFields.includes('bloodGroup') 
                        ? 'bg-gray-50 text-gray-600' 
                        : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>
              )}

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  disabled={true}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Present Address</label>
                <textarea
                  value={formData.presentAddress || ''}
                  onChange={(e) => handleInputChange('presentAddress', e.target.value)}
                  disabled={!isEditing || !editableFields.includes('presentAddress')}
                  rows={3}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                    !isEditing || !editableFields.includes('presentAddress') 
                      ? 'bg-gray-50 text-gray-600' 
                      : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Permanent Address</label>
                <textarea
                  value={formData.permanentAddress || ''}
                  disabled={true}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Additional Info based on role */}
            {user.role === UserRole.FACULTY && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <input
                  type="text"
                  value={formData.designation || ''}
                  disabled={true}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            )}

            {user.role === UserRole.ADMIN && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Management Department</label>
                <input
                  type="text"
                  value={formData.managementDepartment || ''}
                  disabled={true}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


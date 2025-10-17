'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockAcademicFaculties, mockAcademicDepartments, mockAcademicSemesters } from '@/data/mockData';

export default function AcademicManagementPage() {
  const [activeTab, setActiveTab] = useState('faculties');
  const [newFaculty, setNewFaculty] = useState('');
  const [newDepartment, setNewDepartment] = useState({ name: '', facultyId: '' });
  const [newSemester, setNewSemester] = useState({ name: '', year: '', code: '' });

  const handleAddFaculty = () => {
    if (newFaculty.trim()) {
      // In real app, make API call
      alert(`Faculty "${newFaculty}" added successfully`);
      setNewFaculty('');
    }
  };

  const handleAddDepartment = () => {
    if (newDepartment.name.trim() && newDepartment.facultyId) {
      // In real app, make API call
      alert(`Department "${newDepartment.name}" added successfully`);
      setNewDepartment({ name: '', facultyId: '' });
    }
  };

  const handleAddSemester = () => {
    if (newSemester.name.trim() && newSemester.year && newSemester.code) {
      // In real app, make API call
      alert(`Semester "${newSemester.name} ${newSemester.year}" added successfully`);
      setNewSemester({ name: '', year: '', code: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Academic Management</h1>
        <p className="text-gray-600">Manage faculties, departments, and semesters</p>
      </div>

      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockAcademicFaculties.length}</div>
              <div className="text-sm text-gray-600">Faculties</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockAcademicDepartments.length}</div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{mockAcademicSemesters.length}</div>
              <div className="text-sm text-gray-600">Semesters</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <Card>
        <CardHeader>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('faculties')}
              className={`px-4 py-2 rounded-md ${activeTab === 'faculties' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              Faculties
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-4 py-2 rounded-md ${activeTab === 'departments' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('semesters')}
              className={`px-4 py-2 rounded-md ${activeTab === 'semesters' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              Semesters
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Faculties Tab */}
          {activeTab === 'faculties' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Add New Faculty</h3>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    placeholder="Faculty name"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                  <Button onClick={handleAddFaculty}>Add Faculty</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Existing Faculties</h3>
                <div className="space-y-3">
                  {mockAcademicFaculties.map((faculty) => (
                    <div key={faculty.id} className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{faculty.name}</h4>
                        <p className="text-sm text-gray-600">
                          {mockAcademicDepartments.filter(d => d.academicFaculty === faculty.id).length} departments
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Add New Department</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                    placeholder="Department name"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    value={newDepartment.facultyId}
                    onChange={(e) => setNewDepartment({...newDepartment, facultyId: e.target.value})}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Faculty</option>
                    {mockAcademicFaculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                    ))}
                  </select>
                  <Button onClick={handleAddDepartment}>Add Department</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Existing Departments</h3>
                <div className="space-y-3">
                  {mockAcademicDepartments.map((department) => {
                    const faculty = mockAcademicFaculties.find(f => f.id === department.academicFaculty);
                    return (
                      <div key={department.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{department.name}</h4>
                          <p className="text-sm text-gray-600">Faculty: {faculty?.name}</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Semesters Tab */}
          {activeTab === 'semesters' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Add New Semester</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={newSemester.name}
                    onChange={(e) => setNewSemester({...newSemester, name: e.target.value})}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Semester</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                  </select>
                  <input
                    type="number"
                    value={newSemester.year}
                    onChange={(e) => setNewSemester({...newSemester, year: e.target.value})}
                    placeholder="Year"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={newSemester.code}
                    onChange={(e) => setNewSemester({...newSemester, code: e.target.value})}
                    placeholder="Code (e.g., SP24)"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <Button onClick={handleAddSemester}>Add Semester</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Existing Semesters</h3>
                <div className="space-y-3">
                  {mockAcademicSemesters.map((semester) => (
                    <div key={semester.id} className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{semester.name} {semester.year}</h4>
                        <p className="text-sm text-gray-600">Code: {semester.code}</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses, mockEnrollments, mockStudents, mockAcademicDepartments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function StudentInformationPage() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Get faculty's courses
  const facultyCourses = mockCourses.filter(course => course.faculty === user?.id);

  // Get all students enrolled in faculty's courses
  const facultyStudentEnrollments = mockEnrollments.filter(enrollment =>
    facultyCourses.some(course => course.id === enrollment.courseId)
  );

  // Get unique students
  const uniqueStudentIds = [...new Set(facultyStudentEnrollments.map(e => e.studentId))];
  const facultyStudents = mockStudents.filter(student => 
    uniqueStudentIds.includes(student.id)
  );

  // Filter students based on course and search
  const filteredStudents = facultyStudents.filter(student => {
    const courseMatch = !selectedCourse || facultyStudentEnrollments.some(e => 
      e.studentId === student.id && e.courseId === selectedCourse
    );
    const searchMatch = !searchTerm || 
      `${student.name.firstName} ${student.name.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return courseMatch && searchMatch;
  });

  const getStudentCourses = (studentId: string) => {
    return facultyStudentEnrollments
      .filter(e => e.studentId === studentId)
      .map(enrollment => {
        const course = facultyCourses.find(c => c.id === enrollment.courseId);
        return { ...course, enrollment };
      })
      .filter(Boolean);
  };

  const selectedStudentData = selectedStudent 
    ? mockStudents.find(s => s.id === selectedStudent)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Information</h1>
        <p className="text-gray-600">View academic and personal information of your students</p>
      </div>

      {/* Student Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Student Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{facultyStudents.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {facultyStudentEnrollments.filter(e => e.status === 'enrolled').length}
              </div>
              <div className="text-sm text-gray-600">Active Enrollments</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {facultyStudentEnrollments.filter(e => e.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed Courses</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{facultyCourses.length}</div>
              <div className="text-sm text-gray-600">My Courses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Courses</option>
                {facultyCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search Students</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Search by name, ID, or email..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            {filteredStudents.length} students found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No students found</p>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map((student) => {
                const studentCourses = getStudentCourses(student.id);
                const department = mockAcademicDepartments.find(d => d.id === student.academicDepartment);
                
                return (
                  <div key={student.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {student.name.firstName[0]}{student.name.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {student.name.firstName} {student.name.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">ID: {student.id}</p>
                          <p className="text-sm text-gray-600">Email: {student.email}</p>
                          <p className="text-sm text-gray-600">Department: {department?.name}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {studentCourses.map((courseData) => (
                              <span
                                key={courseData.id}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                              >
                                {courseData.code}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStudent(
                            selectedStudent === student.id ? null : student.id
                          )}
                        >
                          {selectedStudent === student.id ? 'Hide' : 'View'} Details
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      {selectedStudentData && (
        <Card>
          <CardHeader>
            <CardTitle>
              Student Details - {selectedStudentData.name.firstName} {selectedStudentData.name.lastName}
            </CardTitle>
            <CardDescription>Academic and personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h4 className="font-semibold mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student ID:</span>
                    <span className="font-medium">{selectedStudentData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="font-medium">
                      {selectedStudentData.name.firstName} {selectedStudentData.name.middleName} {selectedStudentData.name.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedStudentData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{selectedStudentData.contactNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium">{selectedStudentData.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium capitalize">{selectedStudentData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Group:</span>
                    <span className="font-medium">{selectedStudentData.bloodGroup}</span>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h4 className="font-semibold mb-3">Academic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">
                      {mockAcademicDepartments.find(d => d.id === selectedStudentData.academicDepartment)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Present Address:</span>
                    <span className="font-medium">{selectedStudentData.presentAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Permanent Address:</span>
                    <span className="font-medium">{selectedStudentData.permanentAddress}</span>
                  </div>
                </div>

                <h4 className="font-semibold mb-3 mt-6">Enrolled Courses</h4>
                <div className="space-y-2">
                  {getStudentCourses(selectedStudentData.id).map((courseData) => (
                    <div key={courseData.id} className="p-3 bg-gray-50 rounded border">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{courseData.title}</div>
                          <div className="text-sm text-gray-600">{courseData.code}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            Status: <span className={`font-medium ${
                              courseData.enrollment.status === 'enrolled' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {courseData.enrollment.status}
                            </span>
                          </div>
                          {courseData.enrollment.grade && (
                            <div className="text-sm">
                              Grade: <span className="font-medium">{courseData.enrollment.grade}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Guardian Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Father's Information</h5>
                  <div className="space-y-1">
                    <div>Name: {selectedStudentData.guardian.fatherName}</div>
                    <div>Occupation: {selectedStudentData.guardian.fatherOccupation}</div>
                    <div>Contact: {selectedStudentData.guardian.fatherContactNo}</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Mother's Information</h5>
                  <div className="space-y-1">
                    <div>Name: {selectedStudentData.guardian.motherName}</div>
                    <div>Occupation: {selectedStudentData.guardian.motherOccupation}</div>
                    <div>Contact: {selectedStudentData.guardian.motherContactNo}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedStudent(null)}
              >
                Close Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

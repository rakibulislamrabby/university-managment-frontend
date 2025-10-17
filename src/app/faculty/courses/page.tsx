'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses, mockEnrollments, mockStudents, mockAcademicSemesters } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function FacultyCoursesPage() {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('as-1');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Get faculty's courses
  const facultyCourses = mockCourses.filter(course => course.faculty === user?.id);
  
  // Filter by semester
  const semesterCourses = facultyCourses.filter(course => 
    selectedSemester === 'all' || course.semester === selectedSemester
  );

  // Get enrollments for selected course
  const selectedCourseEnrollments = selectedCourse 
    ? mockEnrollments.filter(e => e.courseId === selectedCourse)
    : [];

  const enrolledStudents = selectedCourseEnrollments.map(enrollment => {
    const student = mockStudents.find(s => s.id === enrollment.studentId);
    return {
      ...student,
      enrollment
    };
  }).filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">Manage your assigned courses and students</p>
      </div>

      {/* Course Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{facultyCourses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mockEnrollments.filter(e => 
                  facultyCourses.some(c => c.id === e.courseId) && e.status === 'enrolled'
                ).length}
              </div>
              <div className="text-sm text-gray-600">Active Enrollments</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {semesterCourses.length}
              </div>
              <div className="text-sm text-gray-600">This Semester</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(mockEnrollments
                  .filter(e => facultyCourses.some(c => c.id === e.courseId))
                  .map(e => e.studentId)
                ).size}
              </div>
              <div className="text-sm text-gray-600">Unique Students</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semester Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-2">Select Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Semesters</option>
              {mockAcademicSemesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name} {semester.year}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>
            {semesterCourses.length} courses for selected semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          {semesterCourses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No courses found for the selected semester</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {semesterCourses.map((course) => {
                const courseEnrollments = mockEnrollments.filter(e => e.courseId === course.id);
                const activeEnrollments = courseEnrollments.filter(e => e.status === 'enrolled');
                const completedEnrollments = courseEnrollments.filter(e => e.status === 'completed');
                
                return (
                  <Card key={course.id} className="border-blue-200">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCourse(selectedCourse === course.id ? '' : course.id)}
                        >
                          {selectedCourse === course.id ? 'Hide' : 'View'} Students
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Active Students:</span>
                          <span className="font-semibold text-blue-600">{activeEnrollments.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completed:</span>
                          <span className="font-semibold text-green-600">{completedEnrollments.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Enrollments:</span>
                          <span className="font-semibold">{courseEnrollments.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student List for Selected Course */}
      {selectedCourse && (
        <Card>
          <CardHeader>
            <CardTitle>
              Students in {mockCourses.find(c => c.id === selectedCourse)?.title}
            </CardTitle>
            <CardDescription>
              {enrolledStudents.length} students enrolled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enrolledStudents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No students enrolled in this course</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Student ID</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-center py-2">Status</th>
                      <th className="text-center py-2">Grade</th>
                      <th className="text-center py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledStudents.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="py-3 font-medium">{student.id}</td>
                        <td className="py-3">
                          {student.name?.firstName} {student.name?.lastName}
                        </td>
                        <td className="py-3">{student.email}</td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            student.enrollment.status === 'enrolled' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {student.enrollment.status}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          {student.enrollment.grade || 'Not Graded'}
                        </td>
                        <td className="py-3 text-center">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16">
              📝<br/>Grade Students
            </Button>
            <Button variant="outline" className="h-16">
              📋<br/>Take Attendance
            </Button>
            <Button variant="outline" className="h-16">
              📚<br/>Upload Resources
            </Button>
            <Button variant="outline" className="h-16">
              📊<br/>View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

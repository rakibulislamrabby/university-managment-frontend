'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses, mockAcademicSemesters, mockEnrollments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function CourseEnrollmentPage() {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('as-1');
  const [enrolledCourses, setEnrolledCourses] = useState(
    mockEnrollments.filter(e => e.studentId === user?.id).map(e => e.courseId)
  );

  const availableCourses = mockCourses.filter(course => 
    course.semester === selectedSemester && !enrolledCourses.includes(course.id)
  );

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses([...enrolledCourses, courseId]);
    // In real app, make API call
  };

  const handleDrop = (courseId: string) => {
    setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
    // In real app, make API call
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Course Enrollment</h1>
        <p className="text-gray-600">Enroll in courses for the selected semester</p>
      </div>

      {/* Semester Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Semester</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {mockAcademicSemesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name} {semester.year}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Available Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Available Courses</CardTitle>
          <CardDescription>
            Courses available for {mockAcademicSemesters.find(s => s.id === selectedSemester)?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {availableCourses.length === 0 ? (
            <p className="text-gray-500">No available courses for this semester</p>
          ) : (
            <div className="space-y-4">
              {availableCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-600">Code: {course.code} | Credits: {course.credits}</p>
                  </div>
                  <Button onClick={() => handleEnroll(course.id)}>
                    Enroll
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
          <CardDescription>Your current course enrollments</CardDescription>
        </CardHeader>
        <CardContent>
          {enrolledCourses.length === 0 ? (
            <p className="text-gray-500">No enrolled courses</p>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((courseId) => {
                const course = mockCourses.find(c => c.id === courseId);
                if (!course) return null;
                return (
                  <div key={courseId} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600">Code: {course.code} | Credits: {course.credits}</p>
                    </div>
                    <Button variant="outline" onClick={() => handleDrop(courseId)}>
                      Drop
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

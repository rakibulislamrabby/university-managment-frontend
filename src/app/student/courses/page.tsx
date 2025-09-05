'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCourses, mockEnrollments, mockFaculty } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function MyCoursesPage() {
  const { user } = useAuth();
  
  const studentEnrollments = mockEnrollments.filter(e => e.studentId === user?.id);
  const enrolledCourses = studentEnrollments.map(enrollment => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    const faculty = mockFaculty.find(f => f.id === course?.faculty);
    return {
      ...course,
      enrollment,
      instructor: faculty ? `${faculty.name.firstName} ${faculty.name.lastName}` : 'Unknown'
    };
  }).filter(Boolean);

  const currentCourses = enrolledCourses.filter(c => c.enrollment.status === 'enrolled');
  const completedCourses = enrolledCourses.filter(c => c.enrollment.status === 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">View your current and completed courses</p>
      </div>

      {/* Current Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Current Courses</CardTitle>
          <CardDescription>Courses you are currently enrolled in</CardDescription>
        </CardHeader>
        <CardContent>
          {currentCourses.length === 0 ? (
            <p className="text-gray-500">No current courses</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {currentCourses.map((course) => (
                <Card key={course.id} className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          In Progress
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Courses</CardTitle>
          <CardDescription>Courses you have completed with grades</CardDescription>
        </CardHeader>
        <CardContent>
          {completedCourses.length === 0 ? (
            <p className="text-gray-500">No completed courses</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {completedCourses.map((course) => (
                <Card key={course.id} className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                      <p><span className="font-medium">Grade:</span> 
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                          {course.enrollment.grade}
                        </span>
                      </p>
                      <p><span className="font-medium">GPA:</span> {course.enrollment.gpa}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{currentCourses.length}</div>
              <div className="text-sm text-gray-600">Current Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{completedCourses.length}</div>
              <div className="text-sm text-gray-600">Completed Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {completedCourses.reduce((sum, course) => sum + course.credits, 0)}
              </div>
              <div className="text-sm text-gray-600">Credits Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {completedCourses.length > 0 
                  ? (completedCourses.reduce((sum, course) => sum + course.enrollment.gpa, 0) / completedCourses.length).toFixed(2)
                  : '0.00'
                }
              </div>
              <div className="text-sm text-gray-600">Average GPA</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

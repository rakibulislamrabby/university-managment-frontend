'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses, mockEnrollments, mockStudents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function StudentGradesPage() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingGrades, setEditingGrades] = useState<{[key: string]: string}>({});

  // Get faculty's courses
  const facultyCourses = mockCourses.filter(course => course.faculty === user?.id);

  // Get enrollments for selected course
  const courseEnrollments = selectedCourse 
    ? mockEnrollments.filter(e => e.courseId === selectedCourse)
    : [];

  const studentsWithGrades = courseEnrollments.map(enrollment => {
    const student = mockStudents.find(s => s.id === enrollment.studentId);
    return {
      ...student,
      enrollment
    };
  }).filter(Boolean);

  const handleGradeChange = (enrollmentId: string, grade: string) => {
    setEditingGrades(prev => ({
      ...prev,
      [enrollmentId]: grade
    }));
  };

  const handleSaveGrade = (enrollmentId: string) => {
    const newGrade = editingGrades[enrollmentId];
    if (newGrade) {
      // In real app, make API call to save grade
      alert(`Grade ${newGrade} saved successfully!`);
      setEditingGrades(prev => {
        const updated = { ...prev };
        delete updated[enrollmentId];
        return updated;
      });
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade?.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade?.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade?.startsWith('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const calculateGPA = (grade: string): number => {
    switch (grade) {
      case 'A': return 4.0;
      case 'A-': return 3.7;
      case 'B+': return 3.5;
      case 'B': return 3.0;
      case 'B-': return 2.7;
      case 'C+': return 2.5;
      case 'C': return 2.0;
      case 'D': return 1.0;
      default: return 0.0;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Grades</h1>
        <p className="text-gray-600">Manage and update student grades for your courses</p>
      </div>

      {/* Grading Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Grading Overview</CardTitle>
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
                  facultyCourses.some(c => c.id === e.courseId) && e.grade
                ).length}
              </div>
              <div className="text-sm text-gray-600">Graded Students</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {mockEnrollments.filter(e => 
                  facultyCourses.some(c => c.id === e.courseId) && !e.grade
                ).length}
              </div>
              <div className="text-sm text-gray-600">Pending Grades</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {mockEnrollments.filter(e => 
                  facultyCourses.some(c => c.id === e.courseId) && e.status === 'completed'
                ).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Course</CardTitle>
          <CardDescription>Choose a course to manage student grades</CardDescription>
        </CardHeader>
        <CardContent>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a course...</option>
            {facultyCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Student Grades Table */}
      {selectedCourse && (
        <Card>
          <CardHeader>
            <CardTitle>
              Student Grades - {facultyCourses.find(c => c.id === selectedCourse)?.title}
            </CardTitle>
            <CardDescription>
              {studentsWithGrades.length} students enrolled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {studentsWithGrades.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No students enrolled in this course</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Student ID</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-center py-2">Current Grade</th>
                      <th className="text-center py-2">GPA</th>
                      <th className="text-center py-2">Status</th>
                      <th className="text-center py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsWithGrades.map((student) => {
                      const isEditing = editingGrades[student.enrollment.id];
                      return (
                        <tr key={student.id} className="border-b">
                          <td className="py-3 font-medium">{student.id}</td>
                          <td className="py-3">
                            {student.name.firstName} {student.name.lastName}
                          </td>
                          <td className="py-3 text-center">
                            {isEditing ? (
                              <select
                                value={isEditing}
                                onChange={(e) => handleGradeChange(student.enrollment.id, e.target.value)}
                                className="p-1 border border-gray-300 rounded"
                              >
                                <option value="">Select Grade</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="F">F</option>
                              </select>
                            ) : student.enrollment.grade ? (
                              <span className={`px-2 py-1 rounded-full text-sm ${getGradeColor(student.enrollment.grade)}`}>
                                {student.enrollment.grade}
                              </span>
                            ) : (
                              <span className="text-gray-500">Not Graded</span>
                            )}
                          </td>
                          <td className="py-3 text-center">
                            {student.enrollment.gpa?.toFixed(2) || 
                             (isEditing ? calculateGPA(isEditing).toFixed(2) : '-')}
                          </td>
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
                            {isEditing ? (
                              <div className="space-x-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSaveGrade(student.enrollment.id)}
                                >
                                  Save
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setEditingGrades(prev => {
                                      const updated = { ...prev };
                                      delete updated[student.enrollment.id];
                                      return updated;
                                    });
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleGradeChange(
                                  student.enrollment.id, 
                                  student.enrollment.grade || ''
                                )}
                              >
                                Edit Grade
                              </Button>
                            )}
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
      )}

      {/* Grade Distribution */}
      {selectedCourse && studentsWithGrades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const gradeCounts = studentsWithGrades.reduce((acc, student) => {
                const grade = student.enrollment.grade || 'Ungraded';
                acc[grade] = (acc[grade] || 0) + 1;
                return acc;
              }, {} as Record<string, number>);

              return (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(gradeCounts).map(([grade, count]) => (
                    <div key={grade} className="text-center p-3 border rounded">
                      <div className="text-xl font-bold">{count}</div>
                      <div className="text-sm text-gray-600">{grade}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Grading Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Grading Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Grade Scale</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>A (90-100%)</span>
                  <span className="font-medium">4.0 GPA</span>
                </div>
                <div className="flex justify-between">
                  <span>A- (85-89%)</span>
                  <span className="font-medium">3.7 GPA</span>
                </div>
                <div className="flex justify-between">
                  <span>B+ (80-84%)</span>
                  <span className="font-medium">3.5 GPA</span>
                </div>
                <div className="flex justify-between">
                  <span>B (75-79%)</span>
                  <span className="font-medium">3.0 GPA</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Grading Tips</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Ensure consistency across all students</li>
                <li>• Consider multiple assessment methods</li>
                <li>• Provide constructive feedback</li>
                <li>• Submit grades before deadline</li>
                <li>• Keep detailed records of assessments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

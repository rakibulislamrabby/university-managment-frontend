'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEnrollments, mockCourses, mockAcademicSemesters } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function ResultsPage() {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('all');

  const studentEnrollments = mockEnrollments.filter(e => e.studentId === user?.id && e.status === 'completed');
  
  const filteredResults = studentEnrollments.filter(enrollment => 
    selectedSemester === 'all' || enrollment.semesterId === selectedSemester
  );

  // Group results by semester
  const resultsBySemester = filteredResults.reduce((acc, enrollment) => {
    const semester = enrollment.semesterId;
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(enrollment);
    return acc;
  }, {} as Record<string, typeof filteredResults>);

  // Calculate overall statistics
  const totalCredits = filteredResults.reduce((sum, enrollment) => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    return sum + (course?.credits || 0);
  }, 0);

  const totalGradePoints = filteredResults.reduce((sum, enrollment) => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    return sum + ((enrollment.gpa || 0) * (course?.credits || 0));
  }, 0);

  const overallCGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 3.7) return 'text-green-600';
    if (cgpa >= 3.0) return 'text-blue-600';
    if (cgpa >= 2.5) return 'text-yellow-600';
    if (cgpa >= 2.0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
        <p className="text-gray-600">View your semester-wise and overall academic performance</p>
      </div>

      {/* Overall Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Your cumulative academic statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className={`text-3xl font-bold ${getCGPAColor(overallCGPA)}`}>
                {overallCGPA.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Overall CGPA</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{totalCredits}</div>
              <div className="text-sm text-gray-600">Credits Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{filteredResults.length}</div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {Object.keys(resultsBySemester).length}
              </div>
              <div className="text-sm text-gray-600">Semesters</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semester Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Results</CardTitle>
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

      {/* Results by Semester */}
      {Object.entries(resultsBySemester)
        .sort(([a], [b]) => b.localeCompare(a)) // Sort by semester ID descending
        .map(([semesterId, enrollments]) => {
          const semester = mockAcademicSemesters.find(s => s.id === semesterId);
          const semesterCredits = enrollments.reduce((sum, enrollment) => {
            const course = mockCourses.find(c => c.id === enrollment.courseId);
            return sum + (course?.credits || 0);
          }, 0);
          
          const semesterGradePoints = enrollments.reduce((sum, enrollment) => {
            const course = mockCourses.find(c => c.id === enrollment.courseId);
            return sum + ((enrollment.gpa || 0) * (course?.credits || 0));
          }, 0);
          
          const semesterGPA = semesterCredits > 0 ? semesterGradePoints / semesterCredits : 0;

          return (
            <Card key={semesterId}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{semester?.name} {semester?.year}</CardTitle>
                    <CardDescription>{enrollments.length} courses completed</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getCGPAColor(semesterGPA)}`}>
                      {semesterGPA.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Semester GPA</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Course Code</th>
                        <th className="text-left py-2">Course Title</th>
                        <th className="text-center py-2">Credits</th>
                        <th className="text-center py-2">Grade</th>
                        <th className="text-center py-2">GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((enrollment) => {
                        const course = mockCourses.find(c => c.id === enrollment.courseId);
                        return (
                          <tr key={enrollment.id} className="border-b">
                            <td className="py-3 font-medium">{course?.code}</td>
                            <td className="py-3">{course?.title}</td>
                            <td className="py-3 text-center">{course?.credits}</td>
                            <td className="py-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-sm ${getGradeColor(enrollment.grade || '')}`}>
                                {enrollment.grade}
                              </span>
                            </td>
                            <td className="py-3 text-center font-semibold">{enrollment.gpa?.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 font-semibold">
                        <td colSpan={2} className="py-3">Semester Total</td>
                        <td className="py-3 text-center">{semesterCredits}</td>
                        <td className="py-3 text-center">-</td>
                        <td className={`py-3 text-center ${getCGPAColor(semesterGPA)}`}>
                          {semesterGPA.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}

      {filteredResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No results found for the selected criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Grade Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded bg-green-100 text-green-600">A</span>
              <span>4.0 (90-100%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-600">B+</span>
              <span>3.5 (80-89%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-600">B</span>
              <span>3.0 (70-79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-600">C+</span>
              <span>2.5 (60-69%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

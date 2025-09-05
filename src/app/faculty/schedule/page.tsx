'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSchedule, mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function FacultySchedulePage() {
  const { user } = useAuth();

  // Get faculty's courses
  const facultyCourses = mockCourses.filter(course => course.faculty === user?.id);
  const facultyCourseIds = facultyCourses.map(c => c.id);

  // Filter schedule for faculty's courses
  const facultySchedule = mockSchedule.filter(s => facultyCourseIds.includes(s.courseId));

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '8:00 AM - 9:30 AM',
    '9:00 AM - 10:30 AM', 
    '10:00 AM - 11:30 AM',
    '11:00 AM - 12:30 PM',
    '12:00 PM - 1:30 PM',
    '1:00 PM - 2:30 PM',
    '2:00 PM - 3:30 PM',
    '3:00 PM - 4:30 PM',
    '4:00 PM - 5:30 PM'
  ];

  const getClassForDayAndTime = (day: string, time: string) => {
    return facultySchedule.find(s => s.day === day && s.time === time);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Teaching Schedule</h1>
        <p className="text-gray-600">Your weekly class timetable</p>
      </div>

      {/* Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{facultySchedule.length}</div>
              <div className="text-sm text-gray-600">Total Classes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {facultySchedule.filter(s => s.type === 'lecture').length}
              </div>
              <div className="text-sm text-gray-600">Lectures</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {facultySchedule.filter(s => s.type === 'lab').length}
              </div>
              <div className="text-sm text-gray-600">Labs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {new Set(facultySchedule.map(s => s.day)).size}
              </div>
              <div className="text-sm text-gray-600">Teaching Days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Teaching Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-50 text-left">Time</th>
                  {days.map(day => (
                    <th key={day} className="border border-gray-300 p-2 bg-gray-50 text-center min-w-32">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="border border-gray-300 p-2 bg-gray-50 font-medium text-sm">
                      {time}
                    </td>
                    {days.map(day => {
                      const classItem = getClassForDayAndTime(day, time);
                      return (
                        <td key={`${day}-${time}`} className="border border-gray-300 p-1">
                          {classItem ? (
                            <div className={`p-2 rounded border ${getTypeColor(classItem.type)}`}>
                              <div className="font-semibold text-xs">{classItem.courseCode}</div>
                              <div className="text-xs">{classItem.courseName}</div>
                              <div className="text-xs">{classItem.room}</div>
                              <div className="text-xs capitalize font-medium">{classItem.type}</div>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Today's Classes */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Classes</CardTitle>
          <CardDescription>Your classes scheduled for today</CardDescription>
        </CardHeader>
        <CardContent>
          {facultySchedule.filter(s => s.day === 'Monday').length === 0 ? (
            <p className="text-gray-500">No classes scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {facultySchedule
                .filter(s => s.day === 'Monday')
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((classItem) => (
                  <div key={classItem.id} className={`p-4 rounded-lg border ${getTypeColor(classItem.type)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{classItem.courseName}</h3>
                        <p className="text-sm">{classItem.courseCode}</p>
                        <p className="text-sm">{classItem.room}, {classItem.building}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{classItem.time}</div>
                        <div className="text-sm capitalize">{classItem.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course List */}
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Courses you are currently teaching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {facultyCourses.map((course) => (
              <Card key={course.id} className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Schedule:</span></p>
                    {facultySchedule
                      .filter(s => s.courseId === course.id)
                      .map(schedule => (
                        <div key={schedule.id} className="text-xs text-gray-600">
                          {schedule.day} - {schedule.time} ({schedule.type})
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

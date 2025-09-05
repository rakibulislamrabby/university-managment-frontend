'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function LectureResourcesPage() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');

  // Get faculty's courses
  const facultyCourses = mockCourses.filter(course => course.faculty === user?.id);

  // Mock resources data
  const mockResources = [
    {
      id: 'res-1',
      courseId: 'course-1',
      title: 'Introduction to Programming - Lecture 1',
      type: 'slides',
      description: 'Basic programming concepts and syntax',
      uploadDate: '2024-01-15',
      size: '2.5 MB'
    },
    {
      id: 'res-2',
      courseId: 'course-1',
      title: 'Programming Assignment 1',
      type: 'assignment',
      description: 'Variables and basic operations',
      uploadDate: '2024-01-18',
      size: '1.2 MB'
    },
    {
      id: 'res-3',
      courseId: 'course-2',
      title: 'Data Structures Overview',
      type: 'video',
      description: 'Introduction to arrays and linked lists',
      uploadDate: '2024-01-20',
      size: '125 MB'
    }
  ];

  const courseResources = selectedCourse 
    ? mockResources.filter(r => r.courseId === selectedCourse)
    : mockResources.filter(r => facultyCourses.some(c => c.id === r.courseId));

  const handleUploadResource = () => {
    if (selectedCourse && resourceType && resourceTitle) {
      // In real app, handle file upload
      alert('Resource uploaded successfully!');
      setResourceTitle('');
      setResourceDescription('');
      setResourceType('');
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'slides': return '📊';
      case 'assignment': return '📝';
      case 'video': return '🎥';
      case 'document': return '📄';
      case 'code': return '💻';
      default: return '📎';
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'slides': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-yellow-100 text-yellow-800';
      case 'code': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lecture Resources</h1>
        <p className="text-gray-600">Manage and share course materials with students</p>
      </div>

      {/* Resources Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Resources Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {mockResources.filter(r => r.type === 'slides').length}
              </div>
              <div className="text-sm text-gray-600">Slides</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mockResources.filter(r => r.type === 'assignment').length}
              </div>
              <div className="text-sm text-gray-600">Assignments</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {mockResources.filter(r => r.type === 'video').length}
              </div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {mockResources.filter(r => r.type === 'document').length}
              </div>
              <div className="text-sm text-gray-600">Documents</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{mockResources.length}</div>
              <div className="text-sm text-gray-600">Total Resources</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload New Resource */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Resource</CardTitle>
          <CardDescription>Add learning materials for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Course</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Resource Type</label>
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select type...</option>
                  <option value="slides">Presentation Slides</option>
                  <option value="assignment">Assignment</option>
                  <option value="video">Video Lecture</option>
                  <option value="document">Document/Reading</option>
                  <option value="code">Code Examples</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Resource Title</label>
                <input
                  type="text"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter resource title"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Describe the resource content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-gray-500">
                    <p>📁 Click to upload or drag and drop</p>
                    <p className="text-sm">PDF, PPT, DOC, MP4, ZIP files supported</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleUploadResource}
                disabled={!selectedCourse || !resourceType || !resourceTitle}
                className="w-full"
              >
                Upload Resource
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full md:w-1/3">
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
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>Course Resources</CardTitle>
          <CardDescription>
            {courseResources.length} resources available
          </CardDescription>
        </CardHeader>
        <CardContent>
          {courseResources.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No resources found</p>
          ) : (
            <div className="space-y-4">
              {courseResources.map((resource) => {
                const course = facultyCourses.find(c => c.id === resource.courseId);
                return (
                  <div key={resource.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getResourceIcon(resource.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{resource.title}</h3>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>📚 {course?.code}</span>
                            <span>📅 {new Date(resource.uploadDate).toLocaleDateString()}</span>
                            <span>💾 {resource.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getResourceColor(resource.type)}`}>
                          {resource.type}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resource Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-3">File Requirements</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Maximum file size: 100MB</li>
                <li>• Supported formats: PDF, PPT, DOC, MP4, ZIP</li>
                <li>• Use descriptive filenames</li>
                <li>• Organize by course and topic</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Best Practices</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Upload resources before class</li>
                <li>• Include clear descriptions</li>
                <li>• Update materials regularly</li>
                <li>• Check accessibility settings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

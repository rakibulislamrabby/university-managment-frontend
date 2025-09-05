'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockNotices } from '@/data/mockData';

export default function NoticesPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const filteredNotices = mockNotices.filter(notice => {
    const typeMatch = selectedType === 'all' || notice.type === selectedType;
    const priorityMatch = selectedPriority === 'all' || notice.priority === selectedPriority;
    return typeMatch && priorityMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'general': return 'text-green-600 bg-green-100';
      case 'opportunity': return 'text-purple-600 bg-purple-100';
      case 'technical': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '🎓';
      case 'general': return '📢';
      case 'opportunity': return '💼';
      case 'technical': return '🔧';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
        <p className="text-gray-600">Stay updated with university announcements and events</p>
      </div>

      {/* Notice Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Notice Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {mockNotices.filter(n => n.type === 'academic').length}
              </div>
              <div className="text-sm text-gray-600">Academic</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mockNotices.filter(n => n.type === 'general').length}
              </div>
              <div className="text-sm text-gray-600">General</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {mockNotices.filter(n => n.type === 'opportunity').length}
              </div>
              <div className="text-sm text-gray-600">Opportunities</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {mockNotices.filter(n => n.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="academic">Academic</option>
                <option value="general">General</option>
                <option value="opportunity">Opportunities</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Priority Notices */}
      {mockNotices.some(n => n.priority === 'high') && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">🚨 High Priority Notices</CardTitle>
            <CardDescription>Important announcements requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockNotices
                .filter(n => n.priority === 'high')
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((notice) => (
                  <div key={notice.id} className="p-4 bg-white border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getTypeIcon(notice.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{notice.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(notice.type)}`}>
                            {notice.type}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{notice.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>By: {notice.author}</span>
                          <span>{new Date(notice.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Notices */}
      <Card>
        <CardHeader>
          <CardTitle>All Notices</CardTitle>
          <CardDescription>
            {filteredNotices.length} of {mockNotices.length} notices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notices found for the selected filters</p>
          ) : (
            <div className="space-y-4">
              {filteredNotices
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((notice) => (
                  <div 
                    key={notice.id} 
                    className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                      notice.priority === 'high' ? 'border-red-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getTypeIcon(notice.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-lg">{notice.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(notice.type)}`}>
                              {notice.type}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(notice.priority)}`}>
                            {notice.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">{notice.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span className="font-medium">📝 {notice.author}</span>
                          <span>📅 {new Date(notice.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notice Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Notice Categories</CardTitle>
          <CardDescription>Understanding different types of notices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🎓</span>
                <span className="font-medium">Academic:</span>
                <span className="text-gray-600">Course, exam, and semester related</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">📢</span>
                <span className="font-medium">General:</span>
                <span className="text-gray-600">University wide announcements</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">💼</span>
                <span className="font-medium">Opportunities:</span>
                <span className="text-gray-600">Jobs, internships, and programs</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔧</span>
                <span className="font-medium">Technical:</span>
                <span className="text-gray-600">System maintenance and updates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

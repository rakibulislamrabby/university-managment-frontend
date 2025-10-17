'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses, mockFaculty, mockEnrollments, mockEvaluations } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function TeacherEvaluationPage() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [ratings, setRatings] = useState({
    teaching_quality: 0,
    course_content: 0,
    communication: 0,
    availability: 0,
    overall: 0
  });
  const [feedback, setFeedback] = useState('');

  // Get student's completed courses
  const studentEnrollments = mockEnrollments.filter(
    e => e.studentId === user?.id && e.status === 'completed'
  );

  // Get courses that can be evaluated
  const evaluatableCourses = studentEnrollments.map(enrollment => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    const faculty = mockFaculty.find(f => f.id === course?.faculty);
    const existingEvaluation = mockEvaluations.find(
      ev => ev.studentId === user?.id && ev.courseId === course?.id
    );
    
    return {
      ...course,
      faculty,
      enrollment,
      hasEvaluated: !!existingEvaluation,
      evaluation: existingEvaluation
    };
  }).filter(Boolean);

  const selectedCourseData = evaluatableCourses.find(c => c.id === selectedCourse);

  const handleRatingChange = (category: string, rating: number) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const handleSubmitEvaluation = () => {
    if (!selectedCourse) return;

    // In real app, submit to API
    alert('Evaluation submitted successfully!');
    
    // Reset form
    setSelectedCourse('');
    setRatings({
      teaching_quality: 0,
      course_content: 0,
      communication: 0,
      availability: 0,
      overall: 0
    });
    setFeedback('');
  };

  const StarRating = ({ 
    rating, 
    onChange, 
    disabled = false 
  }: { 
    rating: number; 
    onChange: (rating: number) => void;
    disabled?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange(star)}
            className={`text-2xl ${
              star <= rating
                ? 'text-yellow-400'
                : 'text-gray-300'
            } ${disabled ? 'cursor-not-allowed' : 'hover:text-yellow-400 cursor-pointer'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Evaluation</h1>
        <p className="text-gray-600">Evaluate your instructors and provide feedback</p>
      </div>

      {/* Evaluation Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{evaluatableCourses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {evaluatableCourses.filter(c => c.hasEvaluated).length}
              </div>
              <div className="text-sm text-gray-600">Evaluated</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {evaluatableCourses.filter(c => !c.hasEvaluated).length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Course to Evaluate</CardTitle>
          <CardDescription>Choose a completed course to evaluate the instructor</CardDescription>
        </CardHeader>
        <CardContent>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a course...</option>
            {evaluatableCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title} 
                {course.hasEvaluated ? ' (Already Evaluated)' : ''}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Evaluation Form */}
      {selectedCourseData && (
        <Card>
          <CardHeader>
            <CardTitle>
              Evaluate: {selectedCourseData.title}
            </CardTitle>
            <CardDescription>
              Instructor: {selectedCourseData.faculty?.name.firstName} {selectedCourseData.faculty?.name.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCourseData.hasEvaluated ? (
              // Show existing evaluation
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    ✅ Evaluation Already Submitted
                  </h3>
                  <p className="text-green-700">
                    You have already evaluated this course on{' '}
                    {selectedCourseData.evaluation?.submissionDate ? new Date(selectedCourseData.evaluation.submissionDate).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Your Ratings:</h4>
                  {Object.entries(selectedCourseData.evaluation?.ratings || {}).map(([category, rating]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="capitalize font-medium">
                        {category.replace('_', ' ')}
                      </span>
                      <StarRating
                        rating={rating}
                        onChange={() => {}}
                        disabled={true}
                      />
                    </div>
                  ))}
                </div>
                
                {selectedCourseData.evaluation?.feedback && (
                  <div>
                    <h4 className="font-semibold mb-2">Your Feedback:</h4>
                    <p className="p-3 bg-gray-50 rounded border italic">
                      &ldquo;{selectedCourseData.evaluation.feedback}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Show evaluation form
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Rate the following aspects:</h3>
                  
                  {Object.entries(ratings).map(([category, rating]) => (
                    <div key={category} className="flex justify-between items-center">
                      <label className="font-medium capitalize">
                        {category.replace('_', ' ')}:
                      </label>
                      <StarRating
                        rating={rating}
                        onChange={(newRating) => handleRatingChange(category, newRating)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Additional Feedback (Optional):
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Share your thoughts about the course and instructor..."
                  />
                </div>

                <Button
                  onClick={handleSubmitEvaluation}
                  disabled={Object.values(ratings).some(r => r === 0)}
                  className="w-full"
                >
                  Submit Evaluation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Evaluation History */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation History</CardTitle>
          <CardDescription>Your previously submitted evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          {evaluatableCourses.filter(c => c.hasEvaluated).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No evaluations submitted yet</p>
          ) : (
            <div className="space-y-4">
              {evaluatableCourses
                .filter(c => c.hasEvaluated)
                .map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {course.code} • {course.faculty?.name.firstName} {course.faculty?.name.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Evaluated on: {course.evaluation?.submissionDate ? new Date(course.evaluation.submissionDate).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600">
                          {course.evaluation?.ratings.overall}/5
                        </div>
                        <div className="text-sm text-gray-600">Overall Rating</div>
                      </div>
                    </div>
                    
                    {course.evaluation?.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded border">
                        <p className="text-sm italic">&ldquo;{course.evaluation.feedback}&rdquo;</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Teaching Quality:</strong> Rate the instructor&apos;s teaching methods, clarity, and engagement.
            </div>
            <div>
              <strong>Course Content:</strong> Evaluate the relevance, organization, and depth of course material.
            </div>
            <div>
              <strong>Communication:</strong> Assess how well the instructor communicates and responds to questions.
            </div>
            <div>
              <strong>Availability:</strong> Rate the instructor&apos;s accessibility for help and office hours.
            </div>
            <div>
              <strong>Overall:</strong> Your general satisfaction with the course and instructor.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

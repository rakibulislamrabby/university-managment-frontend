'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPayments, mockAcademicSemesters } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function TransactionHistoryPage() {
  const { user } = useAuth();
  const [filterSemester, setFilterSemester] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const studentPayments = mockPayments.filter(p => p.studentId === user?.id);
  
  const filteredPayments = studentPayments.filter(payment => {
    const semesterMatch = filterSemester === 'all' || payment.semester === filterSemester;
    const statusMatch = filterStatus === 'all' || payment.status === filterStatus;
    return semesterMatch && statusMatch;
  });

  const totalPaid = studentPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = studentPayments.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'online': return '💳';
      case 'bank_transfer': return '🏦';
      case 'cash': return '💵';
      default: return '💰';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <p className="text-gray-600">View all your payment transactions</p>
      </div>

      {/* Transaction Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalTransactions}</div>
              <div className="text-sm text-gray-600">Total Transactions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Paid</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {totalTransactions > 0 ? (totalPaid / totalTransactions).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-600">Average per Transaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Semester</label>
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
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
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            {filteredPayments.length} of {totalTransactions} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPayments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions found</p>
          ) : (
            <div className="space-y-3">
              {filteredPayments
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((payment) => (
                  <div key={payment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getMethodIcon(payment.method)}</div>
                        <div>
                          <h3 className="font-semibold">Payment #{payment.transactionId}</h3>
                          <p className="text-sm text-gray-600">
                            {mockAcademicSemesters.find(s => s.id === payment.semester)?.name} {
                              mockAcademicSemesters.find(s => s.id === payment.semester)?.year
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            Method: {payment.method.replace('_', ' ')} • Type: {payment.type}
                          </p>
                          <p className="text-sm text-gray-600">Date: {new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">${payment.amount.toLocaleString()}</div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                        {payment.status === 'partial' && (
                          <p className="text-xs text-gray-500 mt-1">
                            of ${payment.totalDue.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Download Options */}
      <Card>
        <CardHeader>
          <CardTitle>Download Reports</CardTitle>
          <CardDescription>Download your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Download PDF
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Download Excel
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Email Report
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

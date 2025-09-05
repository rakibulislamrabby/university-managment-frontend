'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPayments, mockAcademicSemesters } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function FeePaymentPage() {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('as-2');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');

  const studentPayments = mockPayments.filter(p => p.studentId === user?.id);
  const currentSemesterPayment = studentPayments.find(p => p.semester === selectedSemester);
  
  const totalDue = currentSemesterPayment?.totalDue || 50000;
  const paidAmount = currentSemesterPayment?.amount || 0;
  const remainingAmount = totalDue - paidAmount;

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (amount && amount <= remainingAmount) {
      // In real app, process payment
      alert(`Payment of $${amount} submitted successfully!`);
      setPaymentAmount('');
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fee Payment</h1>
        <p className="text-gray-600">Manage your tuition fee payments</p>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>Overview of your fee payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">${totalDue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Due</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Paid Amount</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">${remainingAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Remaining Balance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Make Payment */}
      <Card>
        <CardHeader>
          <CardTitle>Make Payment</CardTitle>
          <CardDescription>Pay your tuition fees online or offline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Semester Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Semester</label>
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
            </div>

            {/* Payment Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Payment Amount</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={remainingAmount}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <Button
                  variant="outline"
                  onClick={() => setPaymentAmount(remainingAmount.toString())}
                >
                  Pay Full
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Maximum payable: ${remainingAmount.toLocaleString()}
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium mb-2">Payment Method</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('online')}
                  className={`p-3 border rounded-md text-center ${
                    paymentMethod === 'online' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300'
                  }`}
                >
                  Online Payment
                </button>
                <button
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 border rounded-md text-center ${
                    paymentMethod === 'bank_transfer' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300'
                  }`}
                >
                  Bank Transfer
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 border rounded-md text-center ${
                    paymentMethod === 'cash' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300'
                  }`}
                >
                  Cash Payment
                </button>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
              className="w-full"
            >
              Make Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your previous payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {studentPayments.length === 0 ? (
            <p className="text-gray-500">No payment history found</p>
          ) : (
            <div className="space-y-3">
              {studentPayments.map((payment) => (
                <div key={payment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Payment #{payment.transactionId}</h3>
                      <p className="text-sm text-gray-600">
                        {mockAcademicSemesters.find(s => s.id === payment.semester)?.name} - {payment.type}
                      </p>
                      <p className="text-sm text-gray-600">Method: {payment.method}</p>
                      <p className="text-sm text-gray-600">Date: {payment.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">${payment.amount.toLocaleString()}</div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">Online Payment:</h4>
              <p className="text-gray-600">Use your student ID and follow the secure payment gateway.</p>
            </div>
            <div>
              <h4 className="font-semibold">Bank Transfer:</h4>
              <p className="text-gray-600">
                Account: University Bank Account<br/>
                Account No: 1234567890<br/>
                Reference: Your Student ID
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Cash Payment:</h4>
              <p className="text-gray-600">Visit the Finance Office during business hours (9 AM - 5 PM).</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

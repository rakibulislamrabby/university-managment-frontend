import { 
  User, 
  Student, 
  Admin, 
  Faculty, 
  UserRole, 
  Gender, 
  BloodGroup,
  AcademicSemester,
  AcademicDepartment,
  AcademicFaculty,
  Permission
} from '@/types/auth';

// Academic data
export const mockAcademicFaculties: AcademicFaculty[] = [
  { id: 'af-1', name: 'Faculty of Engineering' },
  { id: 'af-2', name: 'Faculty of Business Administration' },
  { id: 'af-3', name: 'Faculty of Arts and Sciences' }
];

export const mockAcademicDepartments: AcademicDepartment[] = [
  { id: 'ad-1', name: 'Computer Science & Engineering', academicFaculty: 'af-1' },
  { id: 'ad-2', name: 'Electrical & Electronic Engineering', academicFaculty: 'af-1' },
  { id: 'ad-3', name: 'Business Administration', academicFaculty: 'af-2' },
  { id: 'ad-4', name: 'English Literature', academicFaculty: 'af-3' }
];

export const mockAcademicSemesters: AcademicSemester[] = [
  { id: 'as-1', name: 'Spring', year: 2024, code: 'SP24' },
  { id: 'as-2', name: 'Summer', year: 2024, code: 'SU24' },
  { id: 'as-3', name: 'Fall', year: 2024, code: 'FA24' }
];

// Permissions
export const mockPermissions: Permission[] = [
  { id: 'p-1', title: 'User Management' },
  { id: 'p-2', title: 'Academic Management' },
  { id: 'p-3', title: 'Financial Management' },
  { id: 'p-4', title: 'Course Management' },
  { id: 'p-5', title: 'Grade Management' }
];

// Students
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: {
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe'
    },
    gender: Gender.MALE,
    dateOfBirth: '2000-05-15',
    email: 'john.doe@student.university.edu',
    contactNo: '+1-555-0101',
    emergencyContactNo: '+1-555-0102',
    presentAddress: '123 University Ave, College Town, CT 12345',
    permanentAddress: '456 Main St, Hometown, HT 67890',
    bloodGroup: BloodGroup.A_POSITIVE,
    guardian: {
      fatherName: 'Robert Doe',
      fatherOccupation: 'Engineer',
      fatherContactNo: '+1-555-0103',
      motherName: 'Mary Doe',
      motherOccupation: 'Teacher',
      motherContactNo: '+1-555-0104',
      address: '456 Main St, Hometown, HT 67890'
    },
    localGuardian: {
      name: 'Uncle Steve',
      occupation: 'Doctor',
      contactNo: '+1-555-0105',
      address: '789 Local St, College Town, CT 12345'
    },
    academicSemester: 'as-1',
    academicDepartment: 'ad-1',
    academicFaculty: 'af-1'
  },
  {
    id: 'student-2',
    name: {
      firstName: 'Jane',
      lastName: 'Smith'
    },
    gender: Gender.FEMALE,
    dateOfBirth: '2001-08-22',
    email: 'jane.smith@student.university.edu',
    contactNo: '+1-555-0201',
    emergencyContactNo: '+1-555-0202',
    presentAddress: '321 Campus Rd, College Town, CT 12345',
    permanentAddress: '654 Oak St, Springfield, SP 13579',
    bloodGroup: BloodGroup.B_POSITIVE,
    guardian: {
      fatherName: 'David Smith',
      fatherOccupation: 'Manager',
      fatherContactNo: '+1-555-0203',
      motherName: 'Lisa Smith',
      motherOccupation: 'Nurse',
      motherContactNo: '+1-555-0204',
      address: '654 Oak St, Springfield, SP 13579'
    },
    localGuardian: {
      name: 'Aunt Carol',
      occupation: 'Pharmacist',
      contactNo: '+1-555-0205',
      address: '987 Campus Way, College Town, CT 12345'
    },
    academicSemester: 'as-1',
    academicDepartment: 'ad-3',
    academicFaculty: 'af-2'
  }
];

// Faculty
export const mockFaculty: Faculty[] = [
  {
    id: 'faculty-1',
    name: {
      firstName: 'Dr. Sarah',
      lastName: 'Johnson'
    },
    gender: Gender.FEMALE,
    dateOfBirth: '1985-03-10',
    email: 'sarah.johnson@university.edu',
    contactNo: '+1-555-0301',
    emergencyContactNo: '+1-555-0302',
    presentAddress: '111 Faculty Lane, College Town, CT 12345',
    permanentAddress: '222 Professor St, Academic City, AC 24680',
    bloodGroup: BloodGroup.O_POSITIVE,
    designation: 'Associate Professor',
    academicDepartment: 'ad-1',
    academicFaculty: 'af-1'
  },
  {
    id: 'faculty-2',
    name: {
      firstName: 'Prof. Michael',
      middleName: 'Robert',
      lastName: 'Brown'
    },
    gender: Gender.MALE,
    dateOfBirth: '1978-11-28',
    email: 'michael.brown@university.edu',
    contactNo: '+1-555-0401',
    emergencyContactNo: '+1-555-0402',
    presentAddress: '333 Education Blvd, College Town, CT 12345',
    permanentAddress: '444 Knowledge Ave, Scholar City, SC 97531',
    bloodGroup: BloodGroup.AB_POSITIVE,
    designation: 'Professor',
    academicDepartment: 'ad-3',
    academicFaculty: 'af-2'
  }
];

// Admins
export const mockAdmins: Admin[] = [
  {
    id: 'admin-1',
    name: {
      firstName: 'Emily',
      lastName: 'Davis'
    },
    gender: Gender.FEMALE,
    dateOfBirth: '1980-07-14',
    email: 'emily.davis@university.edu',
    contactNo: '+1-555-0501',
    emergencyContactNo: '+1-555-0502',
    presentAddress: '555 Admin Building, College Town, CT 12345',
    permanentAddress: '666 Management St, Executive City, EC 86420',
    bloodGroup: BloodGroup.A_NEGATIVE,
    designation: 'System Administrator',
    managementDepartment: 'IT Department'
  }
];

// Users
export const mockUsers: User[] = [
  {
    id: 'student-1',
    role: UserRole.STUDENT,
    password: 'student123', // In real app, this would be hashed
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    student: 'student-1',
    isActive: true,
    isBlocked: false
  },
  {
    id: 'student-2',
    role: UserRole.STUDENT,
    password: 'student123',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    student: 'student-2',
    isActive: true,
    isBlocked: false
  },
  {
    id: 'faculty-1',
    role: UserRole.FACULTY,
    password: 'faculty123',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    faculty: 'faculty-1',
    isActive: true,
    isBlocked: false
  },
  {
    id: 'faculty-2',
    role: UserRole.FACULTY,
    password: 'faculty123',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    faculty: 'faculty-2',
    isActive: true,
    isBlocked: false
  },
  {
    id: 'admin-1',
    role: UserRole.ADMIN,
    password: 'admin123',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    admin: 'admin-1',
    isActive: true,
    isBlocked: false
  }
];

// Courses
export const mockCourses = [
  { 
    id: 'course-1', 
    title: 'Programming Fundamentals', 
    code: 'CSE101', 
    credits: 3, 
    department: 'ad-1',
    faculty: 'faculty-1',
    semester: 'as-1'
  },
  { 
    id: 'course-2', 
    title: 'Data Structures and Algorithms', 
    code: 'CSE201', 
    credits: 3, 
    department: 'ad-1',
    faculty: 'faculty-1',
    semester: 'as-1'
  },
  { 
    id: 'course-3', 
    title: 'Database Management Systems', 
    code: 'CSE301', 
    credits: 3, 
    department: 'ad-1',
    faculty: 'faculty-1',
    semester: 'as-2'
  },
  { 
    id: 'course-4', 
    title: 'Business Management Principles', 
    code: 'BBA101', 
    credits: 3, 
    department: 'ad-3',
    faculty: 'faculty-2',
    semester: 'as-1'
  }
];

// Course Enrollments
export const mockEnrollments = [
  { 
    id: 'enroll-1', 
    studentId: 'student-1', 
    courseId: 'course-1', 
    semesterId: 'as-1', 
    grade: 'A', 
    gpa: 4.0,
    status: 'completed'
  },
  { 
    id: 'enroll-2', 
    studentId: 'student-1', 
    courseId: 'course-2', 
    semesterId: 'as-1', 
    grade: 'B+', 
    gpa: 3.5,
    status: 'completed'
  },
  { 
    id: 'enroll-3', 
    studentId: 'student-1', 
    courseId: 'course-3', 
    semesterId: 'as-2', 
    grade: null, 
    gpa: null,
    status: 'enrolled'
  },
  { 
    id: 'enroll-4', 
    studentId: 'student-2', 
    courseId: 'course-4', 
    semesterId: 'as-1', 
    grade: 'A-', 
    gpa: 3.7,
    status: 'completed'
  }
];

// Payments
export const mockPayments = [
  { 
    id: 'payment-1', 
    studentId: 'student-1', 
    amount: 25000, 
    totalDue: 50000,
    type: 'tuition', 
    status: 'completed', 
    date: '2024-01-15',
    method: 'online',
    transactionId: 'TXN001',
    semester: 'as-1'
  },
  { 
    id: 'payment-2', 
    studentId: 'student-1', 
    amount: 20000, 
    totalDue: 50000,
    type: 'tuition', 
    status: 'partial', 
    date: '2024-02-15',
    method: 'bank_transfer',
    transactionId: 'TXN002',
    semester: 'as-2'
  },
  { 
    id: 'payment-3', 
    studentId: 'student-2', 
    amount: 45000, 
    totalDue: 45000,
    type: 'tuition', 
    status: 'completed', 
    date: '2024-01-10',
    method: 'online',
    transactionId: 'TXN003',
    semester: 'as-1'
  }
];

// Notices
export const mockNotices = [
  {
    id: 'notice-1',
    title: 'Spring 2024 Semester Registration Open',
    content: 'Spring 2024 semester registration is now open. Students must complete their course enrollment by March 15, 2024. Late registrations will incur additional fees.',
    date: '2024-02-01',
    type: 'academic',
    priority: 'high',
    author: 'Academic Office'
  },
  {
    id: 'notice-2',
    title: 'Library Hours Extended During Exam Period',
    content: 'The university library will extend its operating hours during the final examination period. New hours: Monday-Sunday 7:00 AM - 1:00 AM.',
    date: '2024-01-28',
    type: 'general',
    priority: 'medium',
    author: 'Library Administration'
  },
  {
    id: 'notice-3',
    title: 'Summer Internship Program Applications',
    content: 'Applications for the Summer 2024 internship program are now being accepted. Deadline for submission is March 30, 2024.',
    date: '2024-01-25',
    type: 'opportunity',
    priority: 'medium',
    author: 'Career Services'
  },
  {
    id: 'notice-4',
    title: 'Campus Network Maintenance',
    content: 'The campus network will undergo scheduled maintenance on February 10, 2024, from 2:00 AM to 6:00 AM. Internet services may be temporarily unavailable.',
    date: '2024-02-05',
    type: 'technical',
    priority: 'high',
    author: 'IT Department'
  }
];

// Class Schedule
export const mockSchedule = [
  {
    id: 'schedule-1',
    courseId: 'course-1',
    courseName: 'Programming Fundamentals',
    courseCode: 'CSE101',
    instructor: 'Dr. Sarah Johnson',
    day: 'Monday',
    time: '9:00 AM - 10:30 AM',
    room: 'Room 101',
    building: 'Engineering Building',
    type: 'lecture'
  },
  {
    id: 'schedule-2',
    courseId: 'course-1',
    courseName: 'Programming Fundamentals',
    courseCode: 'CSE101',
    instructor: 'Dr. Sarah Johnson',
    day: 'Wednesday',
    time: '9:00 AM - 10:30 AM',
    room: 'Lab 201',
    building: 'Engineering Building',
    type: 'lab'
  },
  {
    id: 'schedule-3',
    courseId: 'course-2',
    courseName: 'Data Structures and Algorithms',
    courseCode: 'CSE201',
    instructor: 'Dr. Sarah Johnson',
    day: 'Tuesday',
    time: '11:00 AM - 12:30 PM',
    room: 'Room 102',
    building: 'Engineering Building',
    type: 'lecture'
  },
  {
    id: 'schedule-4',
    courseId: 'course-2',
    courseName: 'Data Structures and Algorithms',
    courseCode: 'CSE201',
    instructor: 'Dr. Sarah Johnson',
    day: 'Thursday',
    time: '11:00 AM - 12:30 PM',
    room: 'Lab 202',
    building: 'Engineering Building',
    type: 'lab'
  }
];

// Teacher Evaluations
export const mockEvaluations = [
  {
    id: 'eval-1',
    studentId: 'student-1',
    facultyId: 'faculty-1',
    courseId: 'course-1',
    semester: 'as-1',
    ratings: {
      teaching_quality: 4,
      course_content: 5,
      communication: 4,
      availability: 3,
      overall: 4
    },
    feedback: 'Excellent professor with clear explanations and helpful examples.',
    submitted: true,
    submissionDate: '2024-01-20'
  }
];

// Buildings and Rooms
export const mockBuildings = [
  {
    id: 'building-1',
    name: 'Engineering Building',
    code: 'ENG',
    address: 'University Campus, Block A',
    floors: 5,
    rooms: ['101', '102', '103', '201', '202', '203']
  },
  {
    id: 'building-2',
    name: 'Business Administration Building',
    code: 'BBA',
    address: 'University Campus, Block B',
    floors: 4,
    rooms: ['B101', 'B102', 'B201', 'B202']
  }
];

export const mockRooms = [
  { id: 'room-1', number: '101', building: 'building-1', capacity: 50, type: 'classroom', facilities: ['projector', 'whiteboard'] },
  { id: 'room-2', number: '102', building: 'building-1', capacity: 45, type: 'classroom', facilities: ['projector', 'whiteboard'] },
  { id: 'room-3', number: '201', building: 'building-1', capacity: 30, type: 'lab', facilities: ['computers', 'projector'] },
  { id: 'room-4', number: '202', building: 'building-1', capacity: 30, type: 'lab', facilities: ['computers', 'projector'] }
];

// Helper function to get profile by user
export const getUserProfile = (user: User): Student | Admin | Faculty | null => {
  switch (user.role) {
    case UserRole.STUDENT:
      return mockStudents.find(s => s.id === user.student) || null;
    case UserRole.FACULTY:
      return mockFaculty.find(f => f.id === user.faculty) || null;
    case UserRole.ADMIN:
      return mockAdmins.find(a => a.id === user.admin) || null;
    default:
      return null;
  }
};


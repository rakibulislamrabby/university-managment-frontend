// Enums
export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  FACULTY = 'faculty'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

// Base interfaces
export interface Permission {
  id: string;
  title: string;
}

export interface UserPermission {
  permissionId: string;
  userId: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface AcademicSemester {
  id: string;
  name: string;
  year: number;
  code: string;
}

export interface AcademicDepartment {
  id: string;
  name: string;
  academicFaculty: string;
}

export interface AcademicFaculty {
  id: string;
  name: string;
}

// User models
export interface User {
  id: string;
  role: UserRole;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  student?: string; // Reference to Student ID
  admin?: string;   // Reference to Admin ID
  faculty?: string; // Reference to Faculty ID
  isActive: boolean;
  isBlocked: boolean;
}

export interface Student {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: Gender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: BloodGroup;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicSemester: string; // Reference
  academicDepartment: string; // Reference
  academicFaculty: string; // Reference
  profileImage?: string;
}

export interface Admin {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: Gender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: BloodGroup;
  profileImage?: string;
  designation: string;
  managementDepartment: string;
}

export interface Faculty {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: Gender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: BloodGroup;
  profileImage?: string;
  designation: string;
  academicDepartment: string; // Reference
  academicFaculty: string; // Reference
}

// Authentication context types
export interface AuthUser {
  id: string;
  role: UserRole;
  profile: Student | Admin | Faculty;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}


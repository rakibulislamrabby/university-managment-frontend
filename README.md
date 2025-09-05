# University Management System - Frontend

A comprehensive university management system built with Next.js 15, Tailwind CSS, and shadcn/ui components, featuring role-based authentication for Students, Faculty, and Administrators.

## Features

### Authentication System
- **Role-based authentication** with three user types:
  - **Students**: Access to enrollment, courses, payments, and academic records
  - **Faculty**: Course management, grading, and student information access
  - **Administrators**: Complete system management and user administration

### Current Implementation
- Static data authentication (ready for API integration)
- Protected routes with role-based access control
- Responsive dashboard layouts for each user role
- Profile management with role-specific editable fields
- Session persistence using localStorage

## Demo Accounts

### Student Account
- **Email**: `john.doe@student.university.edu`
- **Password**: `student123`

### Faculty Account
- **Email**: `sarah.johnson@university.edu`
- **Password**: `faculty123`

### Administrator Account
- **Email**: `emily.davis@university.edu`
- **Password**: `admin123`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Authentication**: Custom context-based system
- **State Management**: React Context API

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Administrator pages
│   ├── faculty/           # Faculty pages
│   ├── student/           # Student pages
│   ├── login/             # Login page
│   └── dashboard/         # Dashboard router
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── dashboards/        # Role-specific dashboards
│   ├── layout/            # Layout components
│   ├── profile/           # Profile management
│   └── ui/                # shadcn/ui components
├── contexts/              # React contexts
├── data/                  # Mock data for testing
├── services/              # Business logic services
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Login Process
1. Visit the application homepage
2. You'll be redirected to the login page
3. Use one of the demo accounts or click the demo buttons to auto-fill credentials
4. After successful login, you'll be redirected to the appropriate dashboard

### Navigation
- Each user role has a customized sidebar with relevant menu items
- The navbar shows user information and provides logout functionality
- All routes are protected and will redirect unauthorized users

### Profile Management
- Users can view their complete profile information
- Certain fields are editable based on role permissions:
  - **Students**: Contact details, emergency contact, present address, blood group
  - **Faculty**: Contact details, emergency contact, present address
  - **Administrators**: Contact details, emergency contact, present address

## Data Models

### User Roles
- `ADMIN`: System administrators with full access
- `FACULTY`: Teaching staff with course and student management access
- `STUDENT`: Students with access to enrollment and academic features

### Core Models
- **User**: Base authentication model with role and profile references
- **Student**: Complete student profile with academic and personal information
- **Faculty**: Faculty profile with teaching and academic details
- **Admin**: Administrator profile with system management information

## API Integration Ready

The authentication system is designed to easily integrate with backend APIs:

- **AuthService**: Centralized service class ready for API calls
- **Type Definitions**: Complete TypeScript interfaces matching backend models
- **Error Handling**: Structured error handling for API responses
- **Loading States**: Built-in loading states for async operations

### Integration Steps
1. Replace mock data in `src/data/mockData.ts` with API calls
2. Update `src/services/authService.ts` to use real HTTP requests
3. Implement proper token management (JWT, etc.)
4. Add error boundaries and proper error handling

## Functional Requirements Coverage

### Student Features
- ✅ Login/logout functionality
- ✅ Profile management with restricted editing
- ✅ Dashboard with academic overview
- 🔄 Course enrollment (UI structure ready)
- 🔄 Fee payment system (UI structure ready)
- 🔄 Grade viewing (UI structure ready)
- 🔄 Class schedule (UI structure ready)

### Faculty Features
- ✅ Login/logout functionality
- ✅ Profile management
- ✅ Dashboard with teaching overview
- 🔄 Grade management (UI structure ready)
- 🔄 Course management (UI structure ready)
- 🔄 Student information access (UI structure ready)

### Admin Features
- ✅ Login/logout functionality
- ✅ Profile management
- ✅ Dashboard with system overview
- 🔄 User management (UI structure ready)
- 🔄 Academic management (UI structure ready)
- 🔄 System administration (UI structure ready)

## Security Features

- **Route Protection**: All pages are protected with role-based access control
- **Session Management**: Automatic session persistence and cleanup
- **Role Validation**: Server-side role checking (ready for implementation)
- **Input Validation**: Form validation on profile updates

## Development

### Adding New Components
```bash
# Add new shadcn/ui components
npx shadcn@latest add [component-name]
```

### Code Structure
- Follow the established folder structure
- Use TypeScript for all new files
- Implement proper error handling
- Add loading states for async operations

### Styling Guidelines
- Use Tailwind CSS classes
- Follow shadcn/ui design patterns
- Maintain responsive design principles
- Use the established color scheme

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for environment-specific configuration:
```
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_APP_NAME=University Management System
```

## Contributing

1. Follow the established code structure
2. Implement proper TypeScript types
3. Add appropriate error handling
4. Test with all three user roles
5. Ensure responsive design
6. Document new features

## License

This project is developed for educational purposes as part of a university management system.
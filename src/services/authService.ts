import { User, AuthUser, LoginCredentials, UserRole } from '@/types/auth';
import { mockUsers, getUserProfile } from '@/data/mockData';

class AuthService {
  private static instance: AuthService;
  private currentUser: AuthUser | null = null;

  private constructor() {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadUserFromStorage(): void {
    if (typeof window === 'undefined') return; // Check if we're in the browser
    
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
    }
  }

  private saveUserToStorage(user: AuthUser | null): void {
    if (typeof window === 'undefined') return; // Check if we're in the browser
    
    try {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  public async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email
      const user = mockUsers.find(u => {
        const profile = getUserProfile(u);
        return profile && 'email' in profile && profile.email === credentials.email;
      });

      if (!user) {
        return { success: false, error: 'User not found' };
      }

      if (!user.isActive) {
        return { success: false, error: 'Account is deactivated' };
      }

      if (user.isBlocked) {
        return { success: false, error: 'Account is blocked' };
      }

      // In a real app, you would hash the password and compare
      if (user.password !== credentials.password) {
        return { success: false, error: 'Invalid password' };
      }

      const profile = getUserProfile(user);
      if (!profile) {
        return { success: false, error: 'Profile not found' };
      }

      const authUser: AuthUser = {
        id: user.id,
        role: user.role,
        profile
      };

      this.currentUser = authUser;
      this.saveUserToStorage(authUser);

      return { success: true, user: authUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  public logout(): void {
    this.currentUser = null;
    this.saveUserToStorage(null);
  }

  public getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  public hasAnyRole(roles: UserRole[]): boolean {
    return this.currentUser ? roles.includes(this.currentUser.role) : false;
  }

  // User management methods (for admin)
  public async blockUser(userId: string): Promise<boolean> {
    // Simulate API call
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.isBlocked = true;
      return true;
    }
    return false;
  }

  public async unblockUser(userId: string): Promise<boolean> {
    // Simulate API call
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.isBlocked = false;
      return true;
    }
    return false;
  }

  public async changeUserPassword(userId: string, newPassword: string): Promise<boolean> {
    // Simulate API call
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.password = newPassword; // In real app, hash this
      return true;
    }
    return false;
  }

  public async forceLogout(userId: string): Promise<boolean> {
    // In a real app, this would invalidate the user's session on the server
    // For now, just return true
    return true;
  }

  // Get all users (for admin)
  public getAllUsers(): User[] {
    return mockUsers.map(user => ({
      ...user,
      password: '***' // Hide password in admin view
    }));
  }

  // Update profile methods
  public async updateProfile(updatedProfile: Partial<any>): Promise<boolean> {
    if (!this.currentUser) return false;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real app, you would make an API call to update the profile
      // For now, just update the current user's profile in memory
      this.currentUser.profile = { ...this.currentUser.profile, ...updatedProfile };
      this.saveUserToStorage(this.currentUser);

      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  }
}

export const authService = AuthService.getInstance();
export default authService;

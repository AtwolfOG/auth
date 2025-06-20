import { create } from "zustand";  
import { persist } from "zustand/middleware";
const api: string = import.meta.env.VITE_API_URL;
// Zustand store for authentication state management
interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  isLoading: boolean;
  isCheckingAuth: boolean;
  isVerified: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<string | void>;
  login: (data: { email: string; password: string }) => Promise<string | void>;
  verifyEmail: (token: string) => Promise<string | void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setResetPassword: (email: string) => Promise<string | undefined>;
  resetPassword: (
    token: string,
    password: string
  ) => Promise<string | undefined>;
  resetVerificationToken: () => Promise<string | undefined>;
}
interface SignupData {
  email: string;
  password: string;
  username: string;
}
interface User {
  _id: string;
  email: string;
  username: string;
  isverified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Zustand store for authentication state management
const useAuthStore = create(persist<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isCheckingAuth: false,
  isVerified: false,
  error: null,
  signup: async ({ email, password, username }: SignupData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${api}/api/signup`, {
        body: JSON.stringify({ email, password, username }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }
      set({ user: data.user, isLoading: false, error: null, isVerified: data.user.isverified });
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
      return errorMessage;
    }
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${api}/api/login`, {
        body: JSON.stringify({ email, password }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null, isVerified: data.user.isverified
      });
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
      return errorMessage;

    }
  },
  verifyEmail: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${api}/api/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Email verification failed");
      }
      set({isAuthenticated: true, isVerified: data.user.isverified, isLoading: false, error: null, user: data.user });
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
      return errorMessage;

    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, isLoading: true });
    try {
      const res = await fetch(`${api}/api/check-auth`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication check failed");
      }
      set({
        isAuthenticated: true,
        user: data.user,
        isLoading: false,
        isCheckingAuth: false, isVerified: data.user.isverified
      });
    } catch (error: unknown) {
      console.log(error);

      set({ isLoading: false, isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      const res = await fetch(`${api}/api/logout`, {
        credentials: "include",
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }
      set({ isAuthenticated: false, user: null, isVerified: false });
    } catch (error: unknown) {
      console.error("Logout error:", error);
    }
  },
  setResetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch(`${api}/api/reset-password`, {
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Reset password request failed");
      }
      set({ isLoading: false, error: null });
      return data.resetUrl; // Return success message
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${api}/api/reset-password/${token}`, {
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Password reset failed");
      }
      set({ isLoading: false});
      return data.message; // Return success message
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
      return errorMessage;

    }
  },
  resetVerificationToken: async () =>{
    set({ error: null})
    try {
      const res = await fetch(`${api}/api/reset-verification-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: useAuthStore.getState().user?.email }),
    })
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error || "Reset verification token failed");
    }
    set({ error: null});
    return data.message; // Return success message
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage});
      return errorMessage;

      
    }
  } 
}),{name: "auth-store",})); // Persist the store in localStorage

export { useAuthStore };

// import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// export type AuthUser = {
//   id: string;
//   email?: string;
//   name?: string;
//   avatarUrl?: string;
//   provider?: "google" | "password" | "demo";
// };

// type AuthContextType = {
//   user: AuthUser | null;
//   signInWithGoogle: () => Promise<void>;
//   signInWithEmailPassword: (email: string, password: string) => Promise<void>;
//   signUpWithEmailPassword: (email: string, password: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   mode: "demo" | "production";
// };

// const AuthContext = createContext<AuthContextType | null>(null);
// const STORAGE_KEY = "app.auth.user";

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       return raw ? (JSON.parse(raw) as AuthUser) : null;
//     } catch {
//       return null;
//     }
//   });

//   const persist = useCallback((u: AuthUser | null) => {
//     if (!u) localStorage.removeItem(STORAGE_KEY);
//     else localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
//   }, []);

//   const signInWithGoogle = useCallback(async () => {
//     // Demo-only Google sign-in. Replace with real provider (e.g., Supabase/Firebase).
//     const demoUser: AuthUser = {
//       id: crypto.randomUUID(),
//       name: "Demo User",
//       email: "demo@example.com",
//       provider: "google",
//       avatarUrl: undefined,
//     };
//     setUser(demoUser);
//     persist(demoUser);
//   }, [persist]);

//   const signInWithEmailPassword = useCallback(async (email: string, _password: string) => {
//     const demoUser: AuthUser = { id: crypto.randomUUID(), email, provider: "password" };
//     setUser(demoUser);
//     persist(demoUser);
//   }, [persist]);

//   const signUpWithEmailPassword = useCallback(async (email: string, _password: string) => {
//     const demoUser: AuthUser = { id: crypto.randomUUID(), email, provider: "password" };
//     setUser(demoUser);
//     persist(demoUser);
//   }, [persist]);

//   const signOut = useCallback(async () => {
//     setUser(null);
//     persist(null);
//   }, [persist]);

//   const value = useMemo<AuthContextType>(() => ({
//     user,
//     signInWithGoogle,
//     signInWithEmailPassword,
//     signUpWithEmailPassword,
//     signOut,
//     mode: "demo",
//   }), [user, signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, signOut]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
//   return ctx;
// }

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

// The AuthUser and AuthContextType definitions are now implicit in JavaScript
// but we keep the structure of the context operations.

const AuthContext = createContext(null);
const STORAGE_KEY = "app.auth.user";

export function AuthProvider({ children }) {
  // Removed explicit type annotation for useState
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // In JS, we assume JSON.parse(raw) returns the user object structure
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Removed explicit type annotation for the parameter (u: AuthUser | null)
  const persist = useCallback((u) => {
    if (!u) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }, []);

  const signInWithGoogle = useCallback(async () => {
    // Demo-only Google sign-in. Replace with real provider (e.g., Supabase/Firebase).
    // The structure of demoUser remains the same.
    const demoUser = {
      id: crypto.randomUUID(),
      name: "Demo User",
      email: "demo@example.com",
      provider: "google",
      avatarUrl: undefined,
    };
    setUser(demoUser);
    persist(demoUser);
  }, [persist]);

  // Removed explicit type annotations for parameters (email: string, _password: string)
  const signInWithEmailPassword = useCallback(async (email, _password) => {
    const demoUser = { id: crypto.randomUUID(), email, provider: "password" };
    setUser(demoUser);
    persist(demoUser);
  }, [persist]);

  // Removed explicit type annotations for parameters (email: string, _password: string)
  const signUpWithEmailPassword = useCallback(async (email, _password) => {
    const demoUser = { id: crypto.randomUUID(), email, provider: "password" };
    setUser(demoUser);
    persist(demoUser);
  }, [persist]);

  const signOut = useCallback(async () => {
    setUser(null);
    persist(null);
    localStorage.removeItem("token");
    localStorage.removeItem("credentials");
    localStorage.removeItem('email')
    
    window.location.href = "/";
  }, [persist]);

  // Removed explicit type annotation for useMemo result
  const value = useMemo(() => ({
    user,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signOut,
    mode: "demo",
  }), [user, signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function generateToken(user) {
  // A fake token with user info + timestamp
  return btoa(JSON.stringify({ ...user, exp: Date.now() + 60 * 60 * 1000 })); // 1h expiry
}

export function isTokenValid(token) {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now(); // check expiry
  } catch {
    return false;
  }
}
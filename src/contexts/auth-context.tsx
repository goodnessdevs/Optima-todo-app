'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This handles the redirect result after a user signs in.
    getRedirectResult(auth)
      .then(result => {
        if (result && result.user) {
          // User successfully signed in via redirect.
          const loggedInUser = result.user;
          const userRef = doc(db, 'users', loggedInUser.uid);
          setDoc(
            userRef,
            {
              displayName: loggedInUser.displayName,
              email: loggedInUser.email,
              photoURL: loggedInUser.photoURL,
              lastLogin: serverTimestamp(),
            },
            { merge: true }
          ).then(() => {
            setUser(loggedInUser);
            router.push('/tasks');
          });
        }
      })
      .catch(error => {
        console.error('Error getting redirect result:', error);
      })
      .finally(() => {
        // Now, set up the onAuthStateChanged listener.
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
          if (currentUser) {
            // User is signed in.
             const userRef = doc(db, 'users', currentUser.uid);
             await setDoc(
                userRef,
                {
                  displayName: currentUser.displayName,
                  email: currentUser.email,
                  photoURL: currentUser.photoURL,
                  lastLogin: serverTimestamp(),
                },
                { merge: true }
              );
            setUser(currentUser);
          } else {
            // User is signed out.
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      });
  }, [router]);

  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

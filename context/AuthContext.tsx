import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export type UserProfile = {
    id: string;
    email: string;
    familyName: string | null;
    givenName: string | null;
    name: string | null;
    photo: string | null;
};

interface AuthContextData {
  user: UserProfile | null;
  isLoading: boolean;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const silentSignIn = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setUser(userInfo.data?.user ?? null);
      } catch (error) {
        if (isErrorWithCode(error) && error.code === statusCodes.SIGN_IN_REQUIRED) {
          console.log('AuthContext: No user signed in yet.');
        } else {
          console.error('AuthContext: Silent sign-in error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    silentSignIn();
  }, []);

  const signIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo.data?.user ?? null);
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('AuthContext: User cancelled the login flow.');
        } else {
          Alert.alert('Sign-In Error', 'An unexpected error occurred. Please try again.');
          console.error('AuthContext: Google Sign-in error:', error);
        }
      } else {
        Alert.alert('An unexpected error occurred.');
        console.error(error);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error('AuthContext: Sign out error:', error);
      Alert.alert('Sign Out Error', 'An error occurred while signing out.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isSigningIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

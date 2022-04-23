import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";

const auth = getAuth(app);

type PropType = { children: React.ReactNode };

interface InputType {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (input: InputType) => Promise<any>;
  signUp: (input: InputType) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
});

export function AuthProvider({ children }: Partial<PropType>) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  async function signUp(input: InputType): Promise<any> {
    setLoading(true);
    try {
      const { email, password } = input;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(user);
      setLoading(false);
      return { user: user };
    } catch (error: any) {
      setLoading(false);
      return { error: error.message };
    }
  }

  async function signIn(input: InputType): Promise<any> {
    setLoading(true);
    try {
      const { email, password } = input;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      setLoading(false);
      return { user: user };
    } catch (error: any) {
      setLoading(false);
      return { error: error.message };
    }
  }

  return { user, loading, signUp, signIn };
}

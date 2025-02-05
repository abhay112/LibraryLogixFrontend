import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { setUser } from "@/store/reducer/authSlice"; // Adjust the path if needed

// 1. Create the AuthContext
const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>; // Here
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

// 2. AuthProvider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }));
      } else {
        dispatch(setUser(null));
      }
    });
    

    return () => unsubscribe();
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // Return the user credential
  };
  

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      setUserState(user);
      // dispatch(setUser(user));
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
      
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserState(null);
    dispatch(setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const AuthContext = createContext(null);

const normalizeRole = (storedRole) => {
  const value = String(storedRole || "").toLowerCase();
  if (value === "mentor") return "core";
  if (value === "office_bearer") return "tech";
  if (value === "core" || value === "tech") return value;
  return null;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "core" | "tech" | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }
      setUser(firebaseUser);
      // fetch role from Firestore
      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const normalizedRole = normalizeRole(snap.data()?.role);
          setRole(normalizedRole);
        } else {
          setRole(null);
        }
      } catch {
        setRole(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const registerWithEmail = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const loginWithEmail = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const saveRole = async (userId, selectedRole) => {
    const userRef = doc(db, "users", userId);
    const normalizedRole = normalizeRole(selectedRole);
    await setDoc(userRef, { role: normalizedRole }, { merge: true });
    setRole(normalizedRole);
  };

  const value = useMemo(() => ({
    user,
    role,
    loading,
    registerWithEmail,
    loginWithEmail,
    logout,
    saveRole,
  }), [user, role, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}



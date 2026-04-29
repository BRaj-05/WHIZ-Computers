import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseReady } from '../firebase';
import { syncUserProfile, updateAuthDisplayName } from '../services/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseReady || !auth || !db) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return undefined;
    }

    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (nextUser) => {
      try {
        setUser(nextUser);

        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }

        if (!nextUser) {
          setProfile(null);
          setLoading(false);
          return;
        }

        await syncUserProfile(nextUser);

        unsubscribeProfile = onSnapshot(
          doc(db, 'users', nextUser.uid),
          (snapshot) => {
            setProfile(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
            setLoading(false);
          },
          () => {
            setProfile(null);
            setLoading(false);
          }
        );
      } catch (error) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const signup = async ({ name, email, password }) => {
    if (!auth) {
      throw new Error('Firebase Authentication is not ready yet.');
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateAuthDisplayName(credential.user, name);
    await syncUserProfile(credential.user, { name });
    return credential;
  };

  const login = async ({ email, password }) => {
    if (!auth) {
      throw new Error('Firebase Authentication is not ready yet.');
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      throw new Error('Firebase Authentication is not ready yet.');
    }

    const credential = await signInWithPopup(auth, googleProvider);
    await syncUserProfile(credential.user, {
      name: credential.user.displayName || 'Google User',
    });
    return credential;
  };

  const logout = async () => {
    if (!auth) {
      return;
    }

    await signOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      signup,
      login,
      loginWithGoogle,
      logout,
      isAdmin: profile?.role === 'admin',
      firebaseReady: isFirebaseReady,
    }),
    [loading, profile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, isFirebaseReady } from '../firebase';
import { sampleCourses } from '../data/sampleCourses';

const ensureFirestore = () => {
  if (!isFirebaseReady || !db) {
    throw new Error('Firebase is not configured. Add valid Vite Firebase environment variables.');
  }

  return db;
};

const getUsersCollection = () => collection(ensureFirestore(), 'users');
const getCoursesCollection = () => collection(ensureFirestore(), 'courses');
const getPurchasesCollection = () => collection(ensureFirestore(), 'purchases');

export const syncUserProfile = async (user, fallbackData = {}) => {
  const userRef = doc(ensureFirestore(), 'users', user.uid);
  const userSnapshot = await getDoc(userRef);
  const nextName = fallbackData.name || user.displayName || 'New Student';

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      name: nextName,
      email: user.email,
      role: 'user',
      createdAt: serverTimestamp(),
    });
    return;
  }

  const existing = userSnapshot.data();
  const patch = {};

  if (!existing.name && nextName) {
    patch.name = nextName;
  }

  if (existing.email !== user.email) {
    patch.email = user.email;
  }

  if (Object.keys(patch).length > 0) {
    await updateDoc(userRef, patch);
  }
};

export const updateAuthDisplayName = async (user, name) => {
  if (!user.displayName && name) {
    await updateProfile(user, { displayName: name });
  }
};

export const watchCourses = (callback, onError) => {
  try {
    return onSnapshot(
      query(getCoursesCollection(), orderBy('title')),
      (snapshot) => {
        callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      },
      onError
    );
  } catch (error) {
    onError?.(error);
    return () => {};
  }
};

export const watchUsers = (callback, onError) => {
  try {
    return onSnapshot(
      query(getUsersCollection(), orderBy('createdAt', 'desc')),
      (snapshot) => {
        callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      },
      onError
    );
  } catch (error) {
    onError?.(error);
    return () => {};
  }
};

export const watchPurchases = (callback, onError) => {
  try {
    return onSnapshot(
      query(getPurchasesCollection(), orderBy('createdAt', 'desc')),
      (snapshot) => {
        callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      },
      onError
    );
  } catch (error) {
    onError?.(error);
    return () => {};
  }
};

export const watchUserPurchases = (userId, callback, onError) => {
  try {
    return onSnapshot(
      query(getPurchasesCollection(), where('userId', '==', userId)),
      (snapshot) => {
        callback(
          snapshot.docs
            .map((item) => ({ id: item.id, ...item.data() }))
            .sort((left, right) => {
              const leftTime = left.createdAt?.seconds || 0;
              const rightTime = right.createdAt?.seconds || 0;
              return rightTime - leftTime;
            })
        );
      },
      onError
    );
  } catch (error) {
    onError?.(error);
    return () => {};
  }
};

export const createPurchase = async ({ userId, courseId }) => {
  const purchaseRef = doc(ensureFirestore(), 'purchases', `${userId}_${courseId}`);
  const purchaseSnapshot = await getDoc(purchaseRef);

  if (purchaseSnapshot.exists()) {
    return { alreadyOwned: true };
  }

  await setDoc(purchaseRef, {
    userId,
    courseId,
    createdAt: serverTimestamp(),
  });

  return { alreadyOwned: false };
};

export const createCourse = async (course) => {
  await addDoc(getCoursesCollection(), {
    title: course.title,
    description: course.description,
    price: Number(course.price),
    image: course.image,
    createdAt: serverTimestamp(),
  });
};

export const seedCourses = async () => {
  const firestore = ensureFirestore();
  const existingCourses = await getDocs(getCoursesCollection());

  if (!existingCourses.empty) {
    return false;
  }

  const batch = writeBatch(firestore);

  sampleCourses.forEach((course) => {
    const courseRef = doc(db, 'courses', course.id);
    batch.set(courseRef, {
      title: course.title,
      description: course.description,
      price: course.price,
      image: course.image,
      createdAt: serverTimestamp(),
    });
  });

  await batch.commit();
  return true;
};

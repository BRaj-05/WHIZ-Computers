import { useEffect, useMemo, useState } from 'react';
import Spinner from '../components/Spinner';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';
import { watchCourses, watchUserPurchases } from '../services/firestore';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [courses, setCourses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    let hasCourses = false;
    let hasPurchases = false;

    const finishLoadingIfReady = () => {
      if (hasCourses && hasPurchases) {
        setLoading(false);
      }
    };

    const unsubscribeCourses = watchCourses(
      (items) => {
        setCourses(items);
        hasCourses = true;
        finishLoadingIfReady();
      },
      () => {
        setMessage('Unable to load your courses right now.');
        hasCourses = true;
        finishLoadingIfReady();
      }
    );

    const unsubscribePurchases = watchUserPurchases(
      user.uid,
      (items) => {
        setPurchases(items);
        hasPurchases = true;
        finishLoadingIfReady();
      },
      () => {
        setMessage('Unable to load your purchase history.');
        hasPurchases = true;
        finishLoadingIfReady();
      }
    );

    return () => {
      unsubscribeCourses();
      unsubscribePurchases();
    };
  }, [user]);

  const purchasedCourses = useMemo(() => {
    const purchasedIds = new Set(purchases.map((purchase) => purchase.courseId));
    return courses.filter((course) => purchasedIds.has(course.id));
  }, [courses, purchases]);

  if (loading) {
    return <Spinner label="Loading your dashboard..." />;
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">User Dashboard</p>
          <h2 className="mt-3 font-display text-4xl font-bold">
            Welcome, {profile?.name || user?.displayName || 'Student'}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            This page combines your Firebase Auth session with Firestore profile data and your real-time purchases.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Profile</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Name:</span> {profile?.name || 'Not available'}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Email:</span> {profile?.email || user?.email}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Role:</span> {profile?.role || 'user'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
              <p className="text-sm font-semibold text-slate-500">Purchased Courses</p>
              <p className="mt-3 font-display text-4xl font-bold">{purchasedCourses.length}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
              <p className="text-sm font-semibold text-slate-500">Available Courses</p>
              <p className="mt-3 font-display text-4xl font-bold">{courses.length}</p>
            </div>
          </div>
        </div>
      </div>

      <StatusMessage tone="error">{message}</StatusMessage>

      <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">My Courses</p>
            <h3 className="mt-2 font-display text-3xl font-bold">Purchased course library</h3>
          </div>
        </div>

        {purchasedCourses.length === 0 ? (
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="font-semibold text-slate-900">You have not purchased a course yet.</p>
            <p className="mt-2 text-sm text-slate-600">Go back to the home page and buy one to see it here instantly.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {purchasedCourses.map((course) => (
              <article key={course.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                <img src={course.image} alt={course.title} className="h-44 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-display text-2xl font-bold">{course.title}</h4>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Enrolled
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{course.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;

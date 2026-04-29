import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';
import { createPurchase, watchCourses, watchUserPurchases } from '../services/firestore';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState('info');
  const [busyCourseId, setBusyCourseId] = useState('');

  useEffect(() => {
    const unsubscribeCourses = watchCourses(
      (items) => {
        setCourses(items);
        setLoadingCourses(false);
      },
      () => {
        setMessageTone('error');
        setMessage('Could not load courses. Please check your Firebase setup.');
        setLoadingCourses(false);
      }
    );

    return unsubscribeCourses;
  }, []);

  useEffect(() => {
    if (!user) {
      setPurchases([]);
      return undefined;
    }

    return watchUserPurchases(
      user.uid,
      (items) => {
        setPurchases(items);
      },
      () => {
        setMessageTone('error');
        setMessage('Could not load your purchase history.');
      }
    );
  }, [user]);

  const ownedCourseIds = useMemo(
    () => new Set(purchases.map((purchase) => purchase.courseId)),
    [purchases]
  );

  const handlePurchase = async (courseId) => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      setBusyCourseId(courseId);
      const result = await createPurchase({ userId: user.uid, courseId });
      setMessageTone(result.alreadyOwned ? 'info' : 'success');
      setMessage(
        result.alreadyOwned
          ? 'You already own this course.'
          : 'Purchase saved successfully. You can now access it from your dashboard.'
      );
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Purchase failed. Please try again.');
    } finally {
      setBusyCourseId('');
    }
  };

  if (loadingCourses) {
    return <Spinner label="Loading live courses..." />;
  }

  return (
    <section className="space-y-10">
      <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white shadow-2xl shadow-cyan-100 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            React + Firebase Learning Hub
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Sell courses, manage users, and protect everything with Firebase.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Students can sign up, buy courses, and track enrollments in real time. Admins can manage
            courses and monitor the platform from one dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-sm text-slate-300">Live courses</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-2xl font-bold">{user ? purchases.length : 0}</p>
              <p className="text-sm text-slate-300">Your purchases</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <div className="rounded-2xl bg-white px-5 py-4 text-slate-900">
            <p className="text-sm font-semibold text-cyan-700">Authentication</p>
            <p className="mt-2 text-sm text-slate-600">Email/password and Google login with session persistence.</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-5 py-4">
            <p className="text-sm font-semibold text-cyan-300">Realtime Firestore</p>
            <p className="mt-2 text-sm text-slate-300">Courses, users, and purchases update without page reloads.</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-5 py-4">
            <p className="text-sm font-semibold text-cyan-300">Role-based admin</p>
            <p className="mt-2 text-sm text-slate-300">Admins can seed starter courses, add new courses, and review activity.</p>
          </div>
        </div>
      </div>

      <StatusMessage tone={messageTone}>{message}</StatusMessage>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-700">Course Catalog</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Browse and buy premium courses</h3>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-10 text-center">
          <h4 className="font-display text-2xl font-bold">No courses found yet</h4>
          <p className="mt-3 text-slate-600">
            Sign in as an admin and use the Admin Dashboard to add courses or seed the starter catalog.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const isOwned = ownedCourseIds.has(course.id);
            const isBusy = busyCourseId === course.id;

            return (
              <article
                key={course.id}
                className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-lg shadow-slate-200/70"
              >
                <img src={course.image} alt={course.title} className="h-52 w-full object-cover" />
                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-display text-2xl font-bold">{course.title}</h4>
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
                      ${course.price}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{course.description}</p>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handlePurchase(course.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isOwned
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-900 text-white hover:bg-cyan-600'
                    }`}
                  >
                    {isBusy ? 'Saving purchase...' : isOwned ? 'Already Purchased' : 'Buy Course'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Home;

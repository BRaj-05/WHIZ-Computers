import { useEffect, useMemo, useState } from 'react';
import StatusMessage from '../components/StatusMessage';
import { createCourse, seedCourses, watchCourses, watchPurchases, watchUsers } from '../services/firestore';

const initialForm = {
  title: '',
  description: '',
  price: '',
  image: '',
};

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [courseForm, setCourseForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState('info');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribeUsers = watchUsers(setUsers, () => {
      setMessageTone('error');
      setMessage('Could not load users.');
    });
    const unsubscribeCourses = watchCourses(setCourses, () => {
      setMessageTone('error');
      setMessage('Could not load courses.');
    });
    const unsubscribePurchases = watchPurchases(setPurchases, () => {
      setMessageTone('error');
      setMessage('Could not load purchases.');
    });

    return () => {
      unsubscribeUsers();
      unsubscribeCourses();
      unsubscribePurchases();
    };
  }, []);

  const purchaseRows = useMemo(() => {
    return purchases.map((purchase) => {
      const matchedUser = users.find((user) => user.id === purchase.userId);
      const matchedCourse = courses.find((course) => course.id === purchase.courseId);

      return {
        id: purchase.id,
        userName: matchedUser?.name || matchedUser?.email || purchase.userId,
        courseTitle: matchedCourse?.title || purchase.courseId,
      };
    });
  }, [courses, purchases, users]);

  const handleChange = (event) => {
    setCourseForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCourseCreate = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage('');
      await createCourse(courseForm);
      setCourseForm(initialForm);
      setMessageTone('success');
      setMessage('Course created successfully.');
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Course creation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeedCourses = async () => {
    try {
      setSubmitting(true);
      setMessage('');
      const seeded = await seedCourses();
      setMessageTone(seeded ? 'success' : 'info');
      setMessage(seeded ? 'Starter courses added to Firestore.' : 'Courses already exist, so seeding was skipped.');
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Could not seed starter courses.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Admin Dashboard</p>
        <h2 className="mt-3 font-display text-4xl font-bold">Manage the platform in real time</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          This admin view is protected by Firestore roles and frontend route guards. Use it to review users, track purchases, and publish courses.
        </p>
      </div>

      <StatusMessage tone={messageTone}>{message}</StatusMessage>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold text-slate-500">Total Users</p>
          <p className="mt-3 font-display text-4xl font-bold">{users.length}</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold text-slate-500">Total Courses</p>
          <p className="mt-3 font-display text-4xl font-bold">{courses.length}</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold text-slate-500">Total Purchases</p>
          <p className="mt-3 font-display text-4xl font-bold">{purchases.length}</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold text-slate-500">Admins</p>
          <p className="mt-3 font-display text-4xl font-bold">
            {users.filter((user) => user.role === 'admin').length}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleCourseCreate} className="space-y-4 rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Add Course</p>
              <h3 className="mt-2 font-display text-3xl font-bold">Publish a new course</h3>
            </div>
            <button
              type="button"
              onClick={handleSeedCourses}
              disabled={submitting}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500"
            >
              Seed starter courses
            </button>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
            <input
              type="text"
              name="title"
              value={courseForm.title}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
            <textarea
              name="description"
              value={courseForm.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Price</span>
              <input
                type="number"
                name="price"
                value={courseForm.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Image URL</span>
              <input
                type="url"
                name="image"
                value={courseForm.image}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            {submitting ? 'Saving course...' : 'Create course'}
          </button>
        </form>

        <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Recent Purchases</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Purchase activity</h3>

          <div className="mt-6 space-y-3">
            {purchaseRows.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                No purchases yet.
              </div>
            ) : (
              purchaseRows.slice(0, 8).map((row) => (
                <div key={row.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{row.userName}</p>
                  <p className="mt-1 text-sm text-slate-600">Purchased: {row.courseTitle}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Users</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Registered accounts</h3>

          <div className="mt-6 space-y-3">
            {users.map((user) => (
              <div key={user.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="mt-1 text-sm text-slate-600">{user.email}</p>
                <span className="mt-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Courses</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Published catalog</h3>

          <div className="mt-6 space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{course.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{course.description}</p>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
                    ${course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;

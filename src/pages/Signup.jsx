import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState('info');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage('');
      await signup(formData);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setMessage('');
      await loginWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Google signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] bg-gradient-to-br from-cyan-500 to-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">Create account</p>
          <h2 className="mt-4 font-display text-4xl font-bold">Join the platform with a smooth Firebase-powered signup flow.</h2>
          <p className="mt-4 text-cyan-50/90">
            New users are stored inside Firestore with a default <code>user</code> role and can purchase courses right away.
          </p>
          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Stored profile fields</p>
              <p className="mt-1 text-sm text-cyan-50/90">name, email, role, createdAt</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Instant dashboard redirect</p>
              <p className="mt-1 text-sm text-cyan-50/90">Session persistence is handled by Firebase Auth.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Signup</p>
            <h1 className="mt-2 font-display text-3xl font-bold">Start learning today</h1>
          </div>

          <StatusMessage tone={messageTone}>{message}</StatusMessage>

          <form className="space-y-4" onSubmit={handleSignup}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignup}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-cyan-500"
          >
            Sign up with Google
          </button>

          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-cyan-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;

import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loginWithGoogle, user, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState('info');

  const redirectTo = location.state?.from || (isAdmin ? '/admin' : '/dashboard');

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage('');
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setMessage('');
      await loginWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setMessageTone('error');
      setMessage(error.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Welcome back</p>
          <h2 className="mt-4 font-display text-4xl font-bold">Sign in and continue learning without page reloads.</h2>
          <p className="mt-4 text-slate-300">
            Your Firebase session stays active, purchases sync in real time, and the dashboard opens immediately after login.
          </p>
          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-semibold">Email and password login</p>
              <p className="mt-1 text-sm text-slate-300">Fast sign in for returning students.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-semibold">Google popup login</p>
              <p className="mt-1 text-sm text-slate-300">New Google users are saved into Firestore automatically.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Login</p>
            <h1 className="mt-2 font-display text-3xl font-bold">Access your dashboard</h1>
          </div>

          <StatusMessage tone={messageTone}>{message}</StatusMessage>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-cyan-500"
          >
            Continue with Google
          </button>

          <p className="text-sm text-slate-600">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-cyan-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

import Spinner from './Spinner';
import { firebaseError, missingFirebaseKeys } from '../firebase';

const FirebaseStatusGate = ({ children }) => {
  if (firebaseError) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Firebase setup required
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold">The app could not start Firebase.</h1>
          <p className="mt-4 text-slate-300">
            This was the main cause of the blank screen: Firebase was being initialized during startup
            without a safe fallback.
          </p>

          {missingFirebaseKeys.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <p className="font-semibold text-amber-200">Missing environment values</p>
              <p className="mt-2 text-sm text-amber-100">
                Add these keys to your `.env` file, then restart `npm run dev`:
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950/80 p-4 text-sm text-amber-100">
                {missingFirebaseKeys.join('\n')}
              </pre>
            </div>
          ) : null}

          <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-rose-200">
            {firebaseError.message}
          </pre>
        </div>
      </div>
    );
  }

  if (!children) {
    return <Spinner label="Starting application..." fullScreen />;
  }

  return children;
};

export default FirebaseStatusGate;

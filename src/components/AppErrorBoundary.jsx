import { Component } from 'react';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Something went wrong
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold">The app hit a render error.</h1>
            <p className="mt-4 text-slate-300">
              A fallback screen is showing so the app does not fail with a blank page.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-rose-200">
              {this.state.error?.message || 'Unknown React render error'}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;

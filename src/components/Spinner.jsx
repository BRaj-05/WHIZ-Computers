const Spinner = ({ label = 'Loading...', fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 text-slate-600 ${
        fullScreen ? 'min-h-screen bg-slate-50 px-4' : 'min-h-[220px]'
      }`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default Spinner;

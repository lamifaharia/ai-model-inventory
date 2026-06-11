const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="flex flex-col items-center gap-4">
      <span className="loading loading-spinner loading-lg text-blue-600"></span>
      <p className="text-sm text-gray-400 font-medium">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
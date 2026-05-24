const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 dark:border-blue-400"></div>
        
        {/* Loading Text */}
        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
          Loading AI Models...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
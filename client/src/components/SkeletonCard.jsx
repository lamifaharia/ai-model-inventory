const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="h-56 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-5/6" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/4" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
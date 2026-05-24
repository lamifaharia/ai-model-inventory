import { Link } from 'react-router-dom';

const ModelCard = ({ model }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={model.image || "https://via.placeholder.com/600x400/1e3a8a/ffffff?text=AI+Model"} 
          alt={model.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {model.framework}
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-bold mb-2 line-clamp-1">{model.name}</h3>
        <div className="flex gap-2 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm px-4 py-1.5 rounded-full font-medium">
            {model.useCase}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 text-[15px] leading-relaxed">
          {model.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-green-600 dark:text-green-400 font-semibold">
            Purchased: {model.purchased}
          </span>
          <Link 
            to={`/models/${model._id}`} 
            className="bg-liner-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
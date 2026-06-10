import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

const ModelCard = ({ model }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={model.image || "https://placehold.co/600x400/1e3a8a/ffffff?text=AI+Model"}
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-medium">
          {model.framework}
        </div>
        {model.price > 0 && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
            ${model.price}
          </div>
        )}
        {model.price === 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
            Free
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{model.name}</h3>

        {/* Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium">
            {model.useCase}
          </span>
          {model.category && model.category !== model.useCase && (
            <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-medium">
              {model.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 text-sm leading-relaxed flex-1">
          {model.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <ShoppingCart size={12} /> {model.purchased || 0} purchased
            </span>
            <span className="text-xs text-yellow-500 flex items-center gap-1">
              <Star size={12} fill="currentColor" /> {model.rating || '0.0'}
            </span>
          </div>
          <Link
            to={`/models/${model._id}`}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
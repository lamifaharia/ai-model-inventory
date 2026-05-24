import { Link } from 'react-router-dom';

const ModelCard = ({ model }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
    <img src={model.image} alt={model.name} className="w-full h-52 object-cover" />
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
      <div className="flex gap-2 mb-4">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm px-3 py-1 rounded-full">
          {model.framework}
        </span>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm px-3 py-1 rounded-full">
          {model.useCase}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-6">{model.description}</p>
      <Link to={`/models/${model._id}`} className="block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
        View Details
      </Link>
    </div>
  </div>
);

export default ModelCard;
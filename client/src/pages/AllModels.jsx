import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ModelCard from '../components/ModelCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AllModels = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/models')
      .then(res => {
        setModels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredModels = useMemo(() => {
    let result = models;

    if (search) {
      result = result.filter(m => 
        m.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (frameworkFilter) {
      result = result.filter(m => m.framework === frameworkFilter);
    }

    return result;
  }, [search, frameworkFilter, models]);

  const frameworks = useMemo(() => {
    return [...new Set(models.map(m => m.framework).filter(Boolean))];
  }, [models]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900 dark:text-white">
      <h1 className="text-5xl font-bold text-center mb-12">All AI Models</h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by model name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-6 py-4 border rounded-2xl dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={frameworkFilter}
          onChange={(e) => setFrameworkFilter(e.target.value)}
          className="px-6 py-4 border rounded-2xl dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        >
          <option value="" className="text-gray-900 dark:text-white">All Frameworks</option>
          {frameworks.map(f => (
            <option key={f} value={f} className="text-gray-900 dark:text-white">{f}</option>
          ))}
        </select>
      </div>

      {/* Grid Display Area */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.length > 0 ? (
            filteredModels.map(model => (
              <ModelCard key={model._id || model.id} model={model} />
            ))
          ) : (
            <p className="text-center text-xl col-span-3 text-gray-500 dark:text-gray-400 py-12">
              No models found matching your filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllModels;
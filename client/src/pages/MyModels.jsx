import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import ModelCard from '../components/ModelCard';
import SkeletonCard from '../components/SkeletonCard';
import useTitle from '../hooks/useTitle';
import { Plus } from 'lucide-react';

const MyModels = () => {
  const { user } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle('My Models');

  useEffect(() => {
    if (!user) return;
    api.get('/api/models/my-models')
      .then(res => { setModels(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">My Models</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{models.length} model{models.length !== 1 ? 's' : ''} added</p>
          </div>
          <Link to="/add-model" className="btn btn-primary rounded-xl gap-2 font-bold">
            <Plus size={18} /> Add New
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : models.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map(m => <ModelCard key={m._id} model={m} />)}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-2xl font-bold text-gray-500 mb-3">No models yet</p>
            <p className="text-gray-400 mb-6">Start by adding your first AI model to the platform.</p>
            <Link to="/add-model" className="btn btn-primary rounded-xl"><Plus size={16} /> Add Your First Model</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyModels;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import ModelCard from '../components/ModelCard';
import SkeletonCard from '../components/SkeletonCard';
import useTitle from '../hooks/useTitle';

const MyPurchases = () => {
  const { user } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle('My Purchases');

  useEffect(() => {
    if (!user) return;
    api.get('/api/models/my-purchases')
      .then(res => { setModels(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">My Purchases</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {models.length} model{models.length !== 1 ? 's' : ''} purchased
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : models.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map(m => (
              <div key={m._id} className="relative">
                <ModelCard model={m} />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                  Purchased
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-5xl mb-5">🛒</div>
            <p className="text-2xl font-bold text-gray-500 mb-3">No purchases yet</p>
            <p className="text-gray-400 mb-6">Browse the marketplace and get your first AI model.</p>
            <Link to="/models" className="btn btn-primary rounded-xl">Explore Models</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
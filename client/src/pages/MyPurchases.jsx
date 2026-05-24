import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ModelCard from '../components/ModelCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const MyPurchases = () => {
  const { user } = useAuth();
  const [purchasedModels, setPurchasedModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guard clause: Wait until the user's login state is loaded and available
    if (!user?.email) return;

    // Fetch only the models purchased by this logged-in user's email
    axios.get(`http://localhost:5000/api/my-purchases?email=${user.email}`)
      .then(res => {
        setPurchasedModels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err); // Keeps ESLint happy and logs the error safely
        toast.error('Failed to load purchased models');
        setLoading(false);
      });
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold">My Purchased Models</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Total Purchased: <span className="font-semibold text-green-600 dark:text-green-400">{purchasedModels.length}</span>
        </p>
      </div>

      {purchasedModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {purchasedModels.map(model => (
            <div key={model._id || model.id} className="relative group">
              <ModelCard model={model} />
              <div className="absolute top-4 right-4 bg-green-600 text-white text-sm px-4 py-1 rounded-full font-medium shadow-md">
                Purchased
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-sm">
          <div className="text-6xl mb-6">🛒</div>
          <h3 className="text-3xl font-semibold mb-4">No Purchases Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto px-4">
            You haven't purchased any models yet. Go to All Models and try purchasing some!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
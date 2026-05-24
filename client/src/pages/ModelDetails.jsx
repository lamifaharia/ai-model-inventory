import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ModelDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/models/${id}`)
      .then(res => {
        setModel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = async () => {
    if (!user) return toast.error('Please login to purchase this model');

    try {
      // Passes the user's email address to seamlessly log the purchase on your server backend
      const res = await axios.post(`http://localhost:5000/api/models/${id}/purchase`, {
        buyerEmail: user?.email
      });
      setModel(res.data); // Update UI in realtime
      toast.success('Model purchased! Count updated.');
    } catch (err) {
      console.error(err); // Clears the linter warning loop safely
      toast.error('Purchase failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this model?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/models/${id}`);
      toast.success('Model deleted successfully');
      navigate('/models');
    } catch (err) {
      console.error(err); // Clears the second linter warning loop safely
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!model) return <h1 className="text-center text-3xl mt-20 text-gray-900 dark:text-white">Model not found</h1>;

  const isOwner = user?.email === model.createdBy;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-900 dark:text-white">
      <div className="grid md:grid-cols-2 gap-12">
        <img src={model.image} alt={model.name} className="w-full rounded-3xl shadow-2xl object-cover border border-gray-100 dark:border-gray-700" />

        <div>
          <h1 className="text-5xl font-bold mb-4">{model.name}</h1>
          <div className="flex gap-4 mb-8 text-sm font-semibold">
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-5 py-2 rounded-full">{model.framework}</span>
            <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-5 py-2 rounded-full">{model.useCase}</span>
          </div>

          <p className="text-xl leading-relaxed mb-8 text-gray-600 dark:text-gray-300">{model.description}</p>

          <div className="space-y-4 text-lg border-t border-gray-100 dark:border-gray-700 pt-6">
            <p><strong className="text-gray-500 dark:text-gray-400">Dataset:</strong> {model.dataset}</p>
            <p><strong className="text-gray-500 dark:text-gray-400">Added by:</strong> {model.createdBy}</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-4">Purchased {model.purchased || 0} times</p>
          </div>

          <button
            onClick={handlePurchase}
            className="mt-10 w-full bg-linear-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-green-500/20"
          >
            Purchase Model
          </button>

          {isOwner && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate(`/update-model/${id}`)}
                className="flex-1 bg-yellow-500 text-white py-4 rounded-2xl font-semibold hover:bg-yellow-600 transition"
              >
                Edit Model
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-semibold hover:bg-red-700 transition"
              >
                Delete Model
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
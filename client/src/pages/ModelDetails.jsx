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
      .catch(() => setLoading(false));
  }, [id]);

  const handlePurchase = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/models/${id}/purchase`);
      setModel(res.data);
      toast.success('✅ Model purchased successfully!', { duration: 2000 });
    } catch (err) {
      console.error(err); // Fixed line 29: err variable is now used!
      toast.error('Purchase failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this model?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/models/${id}`);
      toast.success('Model deleted successfully');
      navigate('/models');
    } catch (err) {
      console.error(err); // Fixed line 40: err variable is now used!
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!model) return <h1 className="text-center text-4xl mt-32">Model not found</h1>;

  const isOwner = user?.email === model.createdBy;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Image Section */}
        <div className="relative">
          <div className="sticky top-24">
            <img 
              src={model.image || "https://via.placeholder.com/800x600/1e3a8a/ffffff?text=Model+Architecture"} 
              alt={model.name} 
              className="w-full rounded-3xl shadow-2xl" 
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 px-8 py-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <p className="text-4xl font-bold text-green-600">{model.purchased}</p>
              <p className="text-sm text-gray-500">Times Purchased</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-10">
          <div>
            <h1 className="text-6xl font-bold leading-tight mb-4">{model.name}</h1>
            <div className="flex gap-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-6 py-2 rounded-2xl text-lg font-medium">
                {model.framework}
              </span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-6 py-2 rounded-2xl text-lg font-medium">
                {model.useCase}
              </span>
            </div>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            {model.description}
          </p>

          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-3xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Dataset</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{model.dataset}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Added By</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{model.createdBy}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6">
            <button
              onClick={handlePurchase}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white py-7 rounded-3xl text-2xl font-bold hover:brightness-110 transition-all shadow-xl cursor-pointer"
            >
              Purchase This Model
            </button>

            {isOwner && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => navigate(`/update-model/${id}`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-5 rounded-3xl text-lg font-semibold transition cursor-pointer"
                >
                  Edit Model
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-5 rounded-3xl text-lg font-semibold transition cursor-pointer"
                >
                  Delete Model
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
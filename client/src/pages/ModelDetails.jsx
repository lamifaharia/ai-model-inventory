import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this model?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/models/${id}`);
      toast.success('Model deleted successfully');
      navigate('/models');
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!model) return <div className="text-center py-20 text-xl">Model not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* 📸 HERE IS WHERE THE IMAGE LIVES AND DISPLAYS ON YOUR SCREEN */}
        <div className="w-full h-96 bg-gray-100 dark:bg-gray-900 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <img 
            src={model.image || 'https://via.placeholder.com/800x400?text=No+Image+Uploaded'} 
            alt={model.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Information Content Card */}
        <div className="p-12 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold mb-2">{model.name}</h1>
              <p className="text-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full inline-block font-medium">
                {model.framework}
              </p>
            </div>
            
            {/* Show update/delete controls if the user created it */}
            {user?.email === model.createdBy && (
              <div className="flex gap-4">
                <Link to={`/update-model/${id}`} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl font-medium transition">
                  Edit
                </Link>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="grid md:grid-cols-2 gap-8 text-lg">
            <div>
              <h3 className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Primary Use Case</h3>
              <p className="font-medium">{model.useCase}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Trained Dataset</h3>
              <p className="font-medium">{model.dataset}</p>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div>
            <h3 className="text-xl font-bold mb-3">Model Description</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {model.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
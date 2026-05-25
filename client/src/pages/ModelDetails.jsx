import { useEffect, useState } from 'react';
import api from '../api'; 
import { useParams, useNavigate } from 'react-router-dom';
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
    api.get(`/api/models/${id}`)
      .then(res => {
        setModel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = async () => {
    try {
      await api.post(`/api/models/${id}/purchase`, { email: user.email });
      toast.success('Purchase successful!');
    } catch (err) {
      console.error('Purchase error:', err);
      toast.error('Purchase failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this model?')) return;
    try {
      await api.delete(`/api/models/${id}`);
      toast.success('Model deleted successfully');
      navigate('/models');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!model) return <h1 className="text-center text-4xl mt-32">Model not found</h1>;

  const isOwner = user?.email === model.createdBy;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-6">{model.name}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{model.description}</p>
      
      <div className="flex gap-4">
        <button onClick={handlePurchase} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold">
          Purchase Model
        </button>
        {isOwner && (
          <button onClick={handleDelete} className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold">
            Delete Model
          </button>
        )}
      </div>
    </div>
  );
};

export default ModelDetails;
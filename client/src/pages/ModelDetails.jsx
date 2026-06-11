import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ModelCard from '../components/ModelCard';
import useTitle from '../hooks/useTitle';
import { ShoppingCart, Trash2, Edit, ArrowLeft, Star, Database, Cpu, Layers, Package } from 'lucide-react';

const ModelDetails = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  useTitle(model?.name || 'Model Details');

  useEffect(() => {
    setLoading(true);
    api.get(`/api/models/${id}`)
      .then(res => {
        setModel(res.data);
        setLoading(false);
        // Fetch related models by same useCase
        return api.get(`/api/models?useCase=${res.data.useCase}&limit=4`);
      })
      .then(res => {
        setRelated((res.data.models || []).filter(m => m._id !== id));
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePurchase = async () => {
    if (!user) return toast.error('Please login to purchase');
    setPurchasing(true);
    try {
      await api.post(`/api/models/${id}/purchase`);
      toast.success('Purchase successful!');
      setModel(prev => ({ ...prev, purchased: (prev.purchased || 0) + 1 }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally {
      setPurchasing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this model permanently?')) return;
    try {
      await api.delete(`/api/models/${id}`);
      toast.success('Model deleted');
      navigate('/models');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!model) return (
    <div className="text-center py-32">
      <h1 className="text-4xl font-bold text-gray-400">Model not found</h1>
      <Link to="/models" className="btn btn-primary mt-6 rounded-xl">Back to Models</Link>
    </div>
  );

  const isOwner = user?.email === model.createdBy;
  const alreadyPurchased = model.purchasedBy?.includes(user?.email);

  // Simulate multiple images using the same image
  const images = [model.image, model.image, model.image].filter(Boolean);

  const specs = [
    { icon: <Cpu size={16} />, label: 'Framework', value: model.framework },
    { icon: <Layers size={16} />, label: 'Use Case', value: model.useCase },
    { icon: <Database size={16} />, label: 'Dataset', value: model.dataset },
    { icon: <Package size={16} />, label: 'Category', value: model.category || model.useCase },
    { icon: <Star size={16} />, label: 'Rating', value: `${model.rating || 0} / 5` },
    { icon: <ShoppingCart size={16} />, label: 'Purchased', value: `${model.purchased || 0} times` },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm rounded-xl gap-2 text-gray-500 mb-6">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Image Gallery */}
          <div>
            <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-80 mb-4">
              <img src={images[activeImg]} alt={model.name}
                className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`rounded-xl overflow-hidden w-20 h-16 border-2 transition-all ${activeImg === i ? 'border-blue-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-bold">
                {model.framework}
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-bold">
                {model.useCase}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {model.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {model.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {model.price > 0 ? `$${model.price}` : 'Free'}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(model.rating || 0) ? 'fill-yellow-400' : 'text-gray-300'} />
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({model.rating || 0})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {!isOwner && (
                <button onClick={handlePurchase} disabled={purchasing || alreadyPurchased}
                  className={`btn flex-1 h-12 rounded-xl font-bold text-sm ${alreadyPurchased ? 'btn-disabled' : 'btn-primary'}`}>
                  {purchasing ? <span className="loading loading-spinner loading-sm" />
                    : alreadyPurchased ? '✓ Already Purchased'
                      : <><ShoppingCart size={16} /> {model.price > 0 ? `Buy for $${model.price}` : 'Get Free Model'}</>}
                </button>
              )}
              {(isOwner || isAdmin) && (
                <>
                  <Link to={`/update-model/${id}`} className="btn btn-outline h-12 rounded-xl font-bold text-sm flex-1">
                    <Edit size={16} /> Edit
                  </Link>
                  <button onClick={handleDelete} className="btn btn-error btn-outline h-12 rounded-xl font-bold text-sm">
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-3">Added by {model.createdBy}</p>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-12 border border-gray-100 dark:border-gray-800">
          <h2 className="font-extrabold text-xl text-gray-900 dark:text-white mb-5">Key Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map(({ icon, label, value }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">{icon} {label}</div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Models */}
        {related.length > 0 && (
          <div>
            <h2 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-6">Related Models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.slice(0, 4).map(m => <ModelCard key={m._id} model={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDetails;
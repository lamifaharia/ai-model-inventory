import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', framework: '', useCase: '', dataset: '', description: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/models/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/models/${id}`, formData);
      toast.success('✅ Model updated successfully!');
      navigate(`/models/${id}`);
    } catch (err) {
      console.error('Update error:', err); 
      toast.error('Update failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4">Update AI Model</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Make changes to your model information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl space-y-10">
        <div>
          <label className="block text-lg font-semibold mb-3">Model Name</label>
          <input 
            type="text" 
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full px-6 py-5 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500" 
            required 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-semibold mb-3">Framework</label>
            <input 
              type="text" 
              value={formData.framework || ''} 
              onChange={e => setFormData({...formData, framework: e.target.value})} 
              className="w-full px-6 py-5 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl" 
              required 
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-3">Use Case</label>
            <input 
              type="text" 
              value={formData.useCase || ''} 
              onChange={e => setFormData({...formData, useCase: e.target.value})} 
              className="w-full px-6 py-5 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">Dataset</label>
          <input 
            type="text" 
            value={formData.dataset || ''} 
            onChange={e => setFormData({...formData, dataset: e.target.value})} 
            className="w-full px-6 py-5 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl" 
            required 
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">Description</label>
          <textarea 
            value={formData.description || ''} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            className="w-full px-6 py-5 text-lg border border-gray-300 dark:border-gray-600 rounded-3xl h-40" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-linear-to-r from-yellow-500 to-orange-500 text-white py-7 rounded-3xl text-2xl font-bold hover:brightness-110 transition-all"
        >
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
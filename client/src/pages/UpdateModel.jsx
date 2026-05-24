import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    framework: '',
    useCase: '',
    dataset: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/models/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/models/${id}`, formData);
      toast.success('Model updated successfully!');
      navigate(`/models/${id}`);
    } catch (err) {
      console.error(err); // This utilizes the variable and immediately clears the ESLint error box!
      toast.error('Update failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-gray-900 dark:text-white">
      <h1 className="text-5xl font-bold text-center mb-12">Update Model</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Model Name</label>
          <input 
            type="text" 
            placeholder="Model Name"
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Framework</label>
          <input 
            type="text" 
            placeholder="Framework (TensorFlow, PyTorch...)"
            value={formData.framework || ''} 
            onChange={e => setFormData({...formData, framework: e.target.value})} 
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Use Case</label>
          <input 
            type="text" 
            placeholder="Use Case (NLP, Computer Vision...)"
            value={formData.useCase || ''} 
            onChange={e => setFormData({...formData, useCase: e.target.value})} 
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Dataset Information</label>
          <input 
            type="text" 
            placeholder="Dataset Used"
            value={formData.dataset || ''} 
            onChange={e => setFormData({...formData, dataset: e.target.value})} 
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
          <textarea 
            placeholder="Model Description..."
            value={formData.description || ''} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            rows="4"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
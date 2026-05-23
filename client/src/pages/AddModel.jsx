import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddModel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    framework: '',
    useCase: '',
    dataset: '',
    description: ''
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    try {
      const res = await axios.post(
        'https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY',
        form
      );
      setImage(res.data.data.url);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err); 
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Please upload an image');

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/models', {
        ...formData,
        image,
        createdBy: user?.email
      });
      toast.success('Model added successfully!');
      navigate('/models');
    } catch (err) {
      console.error(err); 
      toast.error('Failed to add model');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-center mb-12">Add New AI Model</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Model Name</label>
          <input
            type="text"
            placeholder="Model Name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Framework</label>
          <input
            type="text"
            placeholder="Framework (TensorFlow, PyTorch...)"
            required
            onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Use Case</label>
          <input
            type="text"
            placeholder="Use Case (NLP, Computer Vision...)"
            required
            onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dataset Information</label>
          <input
            type="text"
            placeholder="Dataset Used"
            required
            onChange={(e) => setFormData({ ...formData, dataset: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            placeholder="Model Description..."
            required
            rows="4"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Model Image</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageUpload}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {image && <img src={image} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg border" />}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Adding Model...' : 'Add Model'}
        </button>
      </form>
    </div>
  );
};

export default AddModel;
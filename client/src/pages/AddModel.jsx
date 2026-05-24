import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddModel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '', framework: '', useCase: '', dataset: '', description: ''
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    try {
      // Integrated your live API Key directly into the query template string
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=26cca5266a8b84c9fc6cab6cebb19603`,
        form
      );
      setImage(res.data.data.url);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err); // Keeps lint parser quiet
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Please upload a model image');

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/models', {
        ...formData,
        image,
        createdBy: user?.email || 'unknown'
      });
      toast.success('🎉 Model added successfully!');
      navigate('/models');
    } catch (err) {
      console.error(err); // Keeps lint parser quiet
      toast.error('Failed to add model');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-gray-900 dark:text-white">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4">Add New AI Model</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Share your model with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl space-y-10 border border-gray-100 dark:border-gray-700">
        <div>
          <label className="block text-lg font-semibold mb-3">Model Name</label>
          <input 
            type="text" 
            placeholder="e.g. GPT-4o, Llama 3, YOLOv9" 
            required 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full px-6 py-5 text-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-semibold mb-3">Framework</label>
            <input 
              type="text" 
              placeholder="TensorFlow, PyTorch, etc." 
              required 
              onChange={e => setFormData({...formData, framework: e.target.value})} 
              className="w-full px-6 py-5 text-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-3">Use Case</label>
            <input 
              type="text" 
              placeholder="NLP, Computer Vision, etc." 
              required 
              onChange={e => setFormData({...formData, useCase: e.target.value})} 
              className="w-full px-6 py-5 text-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">Dataset</label>
          <input 
            type="text" 
            placeholder="ImageNet, COCO, Wikipedia..." 
            required 
            onChange={e => setFormData({...formData, dataset: e.target.value})} 
            className="w-full px-6 py-5 text-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" 
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">Description</label>
          <textarea 
            placeholder="Describe the model, its capabilities, and performance..." 
            required 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            className="w-full px-6 py-5 text-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-3xl h-40 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" 
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">Upload Model Image / Diagram</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="w-full text-lg file:mr-4 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-blue-600 file:text-white cursor-pointer" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-7 rounded-3xl text-2xl font-bold hover:brightness-110 transition-all disabled:opacity-70 cursor-pointer shadow-xl"
        >
          {loading ? 'Adding Model...' : 'Publish Model'}
        </button>
      </form>
    </div>
  );
};

export default AddModel;
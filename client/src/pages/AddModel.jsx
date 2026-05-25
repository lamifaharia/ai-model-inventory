import { useState } from 'react';
import api from '../api';
import axios from 'axios'; 
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Cpu, Layers, Database, FileText, Image as ImageIcon, ArrowLeft } from 'lucide-react';

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
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=26cca5266a8b84c9fc6cab6cebb19603`,
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
    if (!image) return toast.error('Please upload a model image');

    setLoading(true);
    try {
      await api.post('/api/models', {
        ...formData,
        image,
        createdBy: user?.email || 'unknown'
      });
      toast.success('🎉 Model added successfully!');
      navigate('/models');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add model');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-900 dark:text-white transition-all duration-300">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col items-start gap-4">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm rounded-xl normal-case gap-2 text-gray-500 dark:text-gray-400 font-semibold">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Add New AI Model
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">
            Share your neural architecture with the global community.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 space-y-8">
        
        {/* Name Field */}
        <div className="form-control w-full">
          <label className="label mb-1"><span className="label-text font-bold flex items-center gap-2"><Cpu size={16} className="text-blue-500" /> Model Name</span></label>
          <input type="text" required onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. GPT-4o, Llama 3" className="input input-bordered w-full h-13 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base font-medium" />
        </div>

        {/* Framework & Use Case Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label mb-1"><span className="label-text font-bold flex items-center gap-2"><Layers size={16} className="text-purple-500" /> Framework</span></label>
            <input type="text" required onChange={e => setFormData({...formData, framework: e.target.value})} placeholder="e.g. PyTorch" className="input input-bordered w-full h-13 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base font-medium" />
          </div>
          <div className="form-control w-full">
            <label className="label mb-1"><span className="label-text font-bold flex items-center gap-2"><Cpu size={16} className="text-indigo-500" /> Use Case</span></label>
            <input type="text" required onChange={e => setFormData({...formData, useCase: e.target.value})} placeholder="e.g. NLP" className="input input-bordered w-full h-13 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base font-medium" />
          </div>
        </div>

        {/* Dataset Field */}
        <div className="form-control w-full">
          <label className="label mb-1"><span className="label-text font-bold flex items-center gap-2"><Database size={16} className="text-emerald-500" /> Dataset</span></label>
          <input type="text" required onChange={e => setFormData({...formData, dataset: e.target.value})} placeholder="e.g. ImageNet, COCO" className="input input-bordered w-full h-13 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base font-medium" />
        </div>

        {/* Description */}
        <div className="form-control w-full">
          <label className="label mb-1"><span className="label-text font-bold flex items-center gap-2"><FileText size={16} className="text-amber-500" /> Description</span></label>
          <textarea required onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe model capabilities..." className="textarea textarea-bordered w-full p-5 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus:textarea-primary text-base min-h-35 font-medium leading-relaxed" />
        </div>

        {/* Image Upload */}
        <div className="form-control w-full">
          <label className="label mb-1"><span className="label-text font-bold flex items-center gap-2"><ImageIcon size={16} className="text-pink-500" /> Model Image</span></label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus:file-input-primary" />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn w-full h-14 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 border-none text-white text-lg font-bold hover:brightness-110 shadow-lg shadow-blue-600/20 transition-all">
          {loading ? <span className="loading loading-spinner"></span> : <><Plus size={20} /> Publish Model</>}
        </button>
      </form>
    </div>
  );
};

export default AddModel;
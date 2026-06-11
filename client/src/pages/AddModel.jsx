import { useState } from 'react';
import api from '../api';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { Plus, Cpu, Layers, Database, FileText, Image as ImageIcon, ArrowLeft, DollarSign } from 'lucide-react';

const FRAMEWORKS = ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'ONNX', 'JAX', 'Other'];
const USE_CASES = ['NLP', 'Computer Vision', 'Audio', 'Multimodal', 'Reinforcement Learning', 'Other'];

const AddModel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '', framework: '', useCase: '', category: '', dataset: '', description: '', price: ''
  });
  const [errors, setErrors] = useState({});
  useTitle('Add Model');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Model name is required';
    if (!formData.framework) errs.framework = 'Framework is required';
    if (!formData.useCase) errs.useCase = 'Use case is required';
    if (!formData.dataset.trim()) errs.dataset = 'Dataset is required';
    if (formData.description.trim().length < 20) errs.description = 'Description must be at least 20 characters';
    if (!image) errs.image = 'Please upload a model image';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageLoading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=26cca5266a8b84c9fc6cab6cebb19603`, form);
      setImage(res.data.data.url);
      toast.success('Image uploaded!');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/api/models', { ...formData, image, createdBy: user?.email });
      toast.success('Model added successfully!');
      navigate('/my-models');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add model');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, value) => setFormData({ ...formData, [key]: value });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm rounded-xl gap-2 text-gray-500 mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Add New AI Model</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Share your neural architecture with the global community.</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">

          {/* Name */}
          <div className="form-control">
            <label className="label" htmlFor="name"><span className="label-text font-bold flex items-center gap-2"><Cpu size={15} className="text-blue-500" /> Model Name</span></label>
            <input id="name" type="text" placeholder="e.g. GPT-4o, Llama 3, BERT"
              value={formData.name} onChange={e => field('name', e.target.value)}
              className={`input input-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 ${errors.name ? 'input-error' : ''}`} />
            {errors.name && <span className="text-error text-xs mt-1">{errors.name}</span>}
          </div>

          {/* Framework + UseCase */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label" htmlFor="framework"><span className="label-text font-bold flex items-center gap-2"><Layers size={15} className="text-purple-500" /> Framework</span></label>
              <select id="framework" value={formData.framework} onChange={e => field('framework', e.target.value)}
                className={`select select-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 ${errors.framework ? 'select-error' : ''}`}>
                <option value="">Select framework</option>
                {FRAMEWORKS.map(f => <option key={f}>{f}</option>)}
              </select>
              {errors.framework && <span className="text-error text-xs mt-1">{errors.framework}</span>}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="useCase"><span className="label-text font-bold flex items-center gap-2"><Cpu size={15} className="text-indigo-500" /> Use Case</span></label>
              <select id="useCase" value={formData.useCase} onChange={e => field('useCase', e.target.value)}
                className={`select select-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 ${errors.useCase ? 'select-error' : ''}`}>
                <option value="">Select use case</option>
                {USE_CASES.map(u => <option key={u}>{u}</option>)}
              </select>
              {errors.useCase && <span className="text-error text-xs mt-1">{errors.useCase}</span>}
            </div>
          </div>

          {/* Dataset + Price */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label" htmlFor="dataset"><span className="label-text font-bold flex items-center gap-2"><Database size={15} className="text-emerald-500" /> Dataset</span></label>
              <input id="dataset" type="text" placeholder="e.g. ImageNet, COCO, Wikipedia"
                value={formData.dataset} onChange={e => field('dataset', e.target.value)}
                className={`input input-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 ${errors.dataset ? 'input-error' : ''}`} />
              {errors.dataset && <span className="text-error text-xs mt-1">{errors.dataset}</span>}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="price"><span className="label-text font-bold flex items-center gap-2"><DollarSign size={15} className="text-amber-500" /> Price (USD)</span></label>
              <input id="price" type="number" min="0" step="0.01" placeholder="0 for free"
                value={formData.price} onChange={e => field('price', e.target.value)}
                className="input input-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label" htmlFor="desc"><span className="label-text font-bold flex items-center gap-2"><FileText size={15} className="text-amber-500" /> Description</span></label>
            <textarea id="desc" placeholder="Describe the model's architecture, capabilities, and use cases (min 20 chars)..."
              value={formData.description} onChange={e => field('description', e.target.value)} rows={4}
              className={`textarea textarea-bordered w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-900 resize-none p-4 ${errors.description ? 'textarea-error' : ''}`} />
            {errors.description && <span className="text-error text-xs mt-1">{errors.description}</span>}
          </div>

          {/* Image */}
          <div className="form-control">
            <label className="label" htmlFor="img"><span className="label-text font-bold flex items-center gap-2"><ImageIcon size={15} className="text-pink-500" /> Model Image</span></label>
            <input id="img" type="file" accept="image/*" onChange={handleImageUpload}
              className={`file-input file-input-bordered w-full rounded-xl bg-gray-50 dark:bg-gray-900 ${errors.image ? 'file-input-error' : ''}`} />
            {imageLoading && <p className="text-xs text-blue-500 mt-1 flex items-center gap-1"><span className="loading loading-spinner loading-xs" /> Uploading...</p>}
            {image && !imageLoading && (
              <div className="mt-3 rounded-xl overflow-hidden h-32 w-32">
                <img src={image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
            {errors.image && <span className="text-error text-xs mt-1">{errors.image}</span>}
          </div>

          <button type="submit" disabled={loading || imageLoading}
            className="btn w-full h-13 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white text-base font-bold hover:brightness-110 shadow-lg shadow-blue-600/20">
            {loading ? <span className="loading loading-spinner" /> : <><Plus size={18} /> Publish Model</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
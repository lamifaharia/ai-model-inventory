import { useEffect, useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import useTitle from '../hooks/useTitle';
import { Save, ArrowLeft, Cpu, Layers, Database, FileText, DollarSign } from 'lucide-react';

const FRAMEWORKS = ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'ONNX', 'JAX', 'Other'];
const USE_CASES = ['NLP', 'Computer Vision', 'Audio', 'Multimodal', 'Reinforcement Learning', 'Other'];

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '', framework: '', useCase: '', dataset: '', description: '', price: ''
  });
  useTitle('Edit Model');

  useEffect(() => {
    api.get(`/api/models/${id}`)
      .then(res => { setFormData(res.data); setLoading(false); })
      .catch(() => { toast.error('Failed to load model'); setLoading(false); });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/api/models/${id}`, formData);
      toast.success('Model updated successfully!');
      navigate(`/models/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const field = (key, value) => setFormData({ ...formData, [key]: value });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm rounded-xl gap-2 text-gray-500 mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Edit Model</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Update your model information below.</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">

          <div className="form-control">
            <label className="label" htmlFor="name"><span className="label-text font-bold flex items-center gap-2"><Cpu size={15} className="text-blue-500" /> Model Name</span></label>
            <input id="name" type="text" value={formData.name || ''}
              onChange={e => field('name', e.target.value)}
              className="input input-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label" htmlFor="framework"><span className="label-text font-bold flex items-center gap-2"><Layers size={15} className="text-purple-500" /> Framework</span></label>
              <select id="framework" value={formData.framework || ''}
                onChange={e => field('framework', e.target.value)}
                className="select select-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900">
                <option value="">Select framework</option>
                {FRAMEWORKS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="useCase"><span className="label-text font-bold flex items-center gap-2"><Cpu size={15} className="text-indigo-500" /> Use Case</span></label>
              <select id="useCase" value={formData.useCase || ''}
                onChange={e => field('useCase', e.target.value)}
                className="select select-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900">
                <option value="">Select use case</option>
                {USE_CASES.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label" htmlFor="dataset"><span className="label-text font-bold flex items-center gap-2"><Database size={15} className="text-emerald-500" /> Dataset</span></label>
              <input id="dataset" type="text" value={formData.dataset || ''}
                onChange={e => field('dataset', e.target.value)}
                className="input input-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="price"><span className="label-text font-bold flex items-center gap-2"><DollarSign size={15} className="text-amber-500" /> Price (USD)</span></label>
              <input id="price" type="number" min="0" step="0.01" value={formData.price || 0}
                onChange={e => field('price', e.target.value)}
                className="input input-bordered w-full h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" />
            </div>
          </div>

          <div className="form-control">
            <label className="label" htmlFor="desc"><span className="label-text font-bold flex items-center gap-2"><FileText size={15} className="text-amber-500" /> Description</span></label>
            <textarea id="desc" value={formData.description || ''}
              onChange={e => field('description', e.target.value)} rows={5}
              className="textarea textarea-bordered w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-900 resize-none p-4" required />
          </div>

          <button type="submit" disabled={saving}
            className="btn w-full h-13 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 border-none text-white text-base font-bold hover:brightness-110 shadow-lg">
            {saving ? <span className="loading loading-spinner" /> : <><Save size={18} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
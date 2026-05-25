import { useEffect, useState } from 'react';
import axios from 'axios';
import ModelCard from '../components/ModelCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Box } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/models')
      .then(res => {
        setFeatured(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Abstract Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e520_0%,transparent_70%)] opacity-50"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-4 backdrop-blur-sm">
            <Box size={16} /> Version 2.0 is now live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[1.1] tracking-tighter">
            The Future of<br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">AI Architecture</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Professional inventory management for AI researchers and developers. Deploy and discover models seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/models" className="btn btn-primary h-16 px-10 rounded-2xl text-lg font-bold border-none bg-white text-black hover:bg-gray-200 transition-all">
              Explore Models <ArrowRight size={20} />
            </Link>
            <Link to="/add-model" className="btn btn-ghost h-16 px-10 rounded-2xl text-lg font-bold border border-white/20 text-white hover:bg-white/10 transition-all">
              <Plus size={20} /> Add Your Model
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Models Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-5xl font-extrabold tracking-tight">Featured Models</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Recently added premium AI architectures</p>
          </div>
          <Link to="/models" className="text-blue-600 dark:text-blue-400 font-bold text-lg flex items-center gap-2 hover:gap-3 transition-all">
            View All Collections →
          </Link>
        </div>

        {loading ? (
          <div className="py-20"><LoadingSpinner /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.length > 0 ? (
              featured.map(model => <ModelCard key={model._id} model={model} />)
            ) : (
              <div className="col-span-3 text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl">
                <p className="text-xl font-medium text-gray-500">No featured models yet. Start by adding one!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* About Section (Glassmorphism Effect) */}
      <div className="bg-gray-100 dark:bg-gray-900/50 py-24 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight">Powering the Next Generation</h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            ModelHub provides the infrastructure for researchers, developers, and organizations 
            to manage, version, and collaborate on AI model training weights with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
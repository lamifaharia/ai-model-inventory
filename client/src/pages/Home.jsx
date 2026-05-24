import { useEffect, useState } from 'react';
import axios from 'axios';
import ModelCard from '../components/ModelCard';
import LoadingSpinner from '../components/LoadingSpinner';

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
    <div>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-950 via-blue-950 to-purple-950">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)]"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
            The Future of<br />
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Models</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Professional inventory management for AI researchers and developers
          </p>
          <div className="flex justify-center gap-6">
            <a href="/models" className="bg-white text-black px-10 py-5 rounded-2xl text-xl font-semibold hover:scale-105 transition">
              Explore Models
            </a>
            <a href="/add-model" className="border border-white text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 transition">
              Add Your Model
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Featured Models */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-bold">Featured Models</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3">Recently added premium AI models</p>
          </div>
          <a href="/models" className="text-blue-600 hover:underline text-lg font-medium">View All →</a>
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.length > 0 ? (
              featured.map(model => <ModelCard key={model._id} model={model} />)
            ) : (
              <p className="col-span-3 text-center text-xl py-20">No featured models yet. Add some!</p>
            )}
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-gray-100 dark:bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">Powering the Next Generation of AI</h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            ModelHub helps researchers, developers, and organizations manage, discover, 
            and collaborate on AI models with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
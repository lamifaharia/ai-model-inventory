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
      {/* Hero Slider - Simple Auto Slider */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center text-white overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold mb-6">Discover AI Models</h1>
          <p className="text-2xl mb-8">Your centralized inventory for powerful AI solutions</p>
          <a href="/models" className="bg-white text-blue-900 px-10 py-4 rounded-full text-xl font-semibold hover:scale-105 transition">
            Explore Models
          </a>
        </div>
      </div>

      {/* Featured Models */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Featured AI Models</h2>
        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(model => <ModelCard key={model._id} model={model} />)}
          </div>
        )}
      </div>

      {/* Static About Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">What are AI Models?</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            AI Models are the backbone of modern artificial intelligence. From BERT for language understanding 
            to Stable Diffusion for image generation, these models power everything from chatbots to autonomous vehicles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
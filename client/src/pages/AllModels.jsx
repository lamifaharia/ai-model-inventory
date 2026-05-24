import { useEffect, useState } from 'react';
import axios from 'axios';
import ModelCard from '../components/ModelCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Bert from '../assets/Bert.png';
import Diffusion from '../assets/Diffusion.png';
import Llama3 from '../assets/Llama 3.png';
import YoloClean from '../assets/YOLO-clean.png';

const AllModels = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sampleModels = [
      {
        _id: "1", 
        name: "BERT", 
        framework: "TensorFlow", 
        useCase: "NLP", 
        dataset: "Wikipedia", 
        description: "Bidirectional Encoder Representations from Transformers - State of the art language understanding model.",
        image: Bert, 
        purchased: 45
      },
      {
        _id: "2", 
        name: "Stable Diffusion", 
        framework: "PyTorch", 
        useCase: "Computer Vision", 
        dataset: "LAION-5B", 
        description: "Powerful text-to-image generation model used in creative industries.",
        image: Diffusion, 
        purchased: 128
      },
      {
        _id: "3", 
        name: "Llama 3", 
        framework: "PyTorch", 
        useCase: "NLP", 
        dataset: "Custom", 
        description: "Meta's latest open-source large language model with exceptional performance.",
        image: Llama3, 
        purchased: 87
      },
      {
        _id: "4", 
        name: "YOLOv8", 
        framework: "PyTorch", 
        useCase: "Computer Vision", 
        dataset: "COCO", 
        description: "Real-time object detection model with high accuracy.",
        image: YoloClean, 
        purchased: 62
      }
    ];

    axios.get('http://localhost:5000/api/models')
      .then(res => {
        const fetchedData = Array.isArray(res.data) 
          ? res.data 
          : (res.data.models || res.data.data || []);

        if (fetchedData.length > 0) {
          const enrichedData = fetchedData.map(model => {
            if (!model.image) {
              if (model.name.toLowerCase().includes('bert')) return { ...model, image: Bert };
              if (model.name.toLowerCase().includes('diffusion')) return { ...model, image: Diffusion };
              if (model.name.toLowerCase().includes('llama')) return { ...model, image: Llama3 };
              if (model.name.toLowerCase().includes('yolo')) return { ...model, image: YoloClean };
            }
            return model;
          });
          setModels(enrichedData);
        } else {
          setModels(sampleModels);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend unreachable, keeping sample items active:", err);
        setModels(sampleModels);
        setLoading(false);
      });
  }, []);

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase());
    const matchesFramework = frameworkFilter ? model.framework === frameworkFilter : true;
    return matchesSearch && matchesFramework;
  });

  const frameworks = ["TensorFlow", "PyTorch", "Keras", "Hugging Face", "ONNX"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-gray-900 dark:text-white">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold bg-liner-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Explore AI Models
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Discover, analyze, and manage cutting-edge AI models</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg mb-12 flex flex-col md:flex-row gap-4 border border-gray-100 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search models (e.g. BERT, Llama...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
        />
        
        <select
          value={frameworkFilter}
          onChange={(e) => setFrameworkFilter(e.target.value)}
          className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none text-lg"
        >
          <option value="">All Frameworks</option>
          {frameworks.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.length > 0 ? (
            filteredModels.map(model => <ModelCard key={model._id} model={model} />)
          ) : (
            <p className="col-span-3 text-center text-2xl py-20 text-gray-500 dark:text-gray-400">
              No models found matching your criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllModels;
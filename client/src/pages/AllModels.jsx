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
    <div className="max-w-7xl mx-auto px-6 py-16 text-gray-900 dark:text-white transition-all duration-300">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Explore AI Models
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
          Discover, analyze, and manage cutting-edge AI neural architectures.
        </p>
      </div>

      {/* Interactive Search & Filter Control Station */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 md:p-6 rounded-3xl shadow-xl shadow-gray-100 dark:shadow-none mb-14 flex flex-col md:flex-row gap-4 border border-gray-100 dark:border-gray-700">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search models (e.g. BERT, Llama...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full h-14 pl-6 pr-4 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-2xl focus:input-primary text-base font-medium transition-all"
          />
        </div>
        
        <select
          value={frameworkFilter}
          onChange={(e) => setFrameworkFilter(e.target.value)}
          className="select select-bordered h-14 px-6 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-2xl focus:select-primary text-base font-semibold md:w-64 transition-all"
        >
          <option value="">All Frameworks</option>
          {frameworks.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Dynamic Render Section */}
      {loading ? (
        <div className="flex justify-center items-center min-h-75">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModels.map(model => (
                <div key={model._id} className="hover:-translate-y-2 transition-transform duration-300">
                  <ModelCard model={model} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 max-w-2xl mx-auto px-6">
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No Architectures Found
              </p>
              <p className="text-gray-400 text-base font-medium">
                We couldn't find anything matching "{search}" or your selected framework filter. Try adjusting your parameters.
              </p>
              {(search || frameworkFilter) && (
                <button 
                  onClick={() => { setSearch(''); setFrameworkFilter(''); }}
                  className="btn btn-outline btn-sm rounded-xl mt-6 font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllModels;
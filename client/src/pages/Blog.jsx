import useTitle from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Understanding Transformer Architecture in 2026',
    excerpt: 'A deep dive into how transformer models have evolved and what makes them the backbone of modern AI systems today.',
    category: 'Deep Learning',
    date: 'June 5, 2026',
    readTime: '8 min read',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Fine-tuning LLMs: Best Practices for Production',
    excerpt: 'Learn the most effective techniques for fine-tuning large language models for specific domain tasks without losing general capability.',
    category: 'NLP',
    date: 'May 28, 2026',
    readTime: '12 min read',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 3,
    title: 'YOLOv10 vs Traditional Detection Methods',
    excerpt: 'A comprehensive benchmark comparison between modern YOLO variants and classical computer vision detection pipelines.',
    category: 'Computer Vision',
    date: 'May 20, 2026',
    readTime: '10 min read',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 4,
    title: 'Model Versioning: A Practical Guide',
    excerpt: 'How to properly version your AI models, track experiments, and ensure reproducibility across your team.',
    category: 'MLOps',
    date: 'May 12, 2026',
    readTime: '6 min read',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 5,
    title: 'Deploying PyTorch Models to Production',
    excerpt: 'Step-by-step walkthrough of deploying a trained PyTorch model to a scalable REST API with Docker and cloud services.',
    category: 'Deployment',
    date: 'May 3, 2026',
    readTime: '15 min read',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    id: 6,
    title: 'Introduction to Multimodal AI Models',
    excerpt: 'Exploring the rise of models that combine vision, language, and audio understanding into unified architectures.',
    category: 'Multimodal',
    date: 'April 25, 2026',
    readTime: '9 min read',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const categories = ['All', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'Deployment', 'Multimodal'];

const Blog = () => {
  useTitle('Blog');

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">ModelHub Blog</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Insights, tutorials, and research from the AI community.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button key={cat}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <span className="text-white text-4xl font-extrabold opacity-20">{post.category[0]}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{post.category}</span>
                <h2 className="font-extrabold text-gray-900 dark:text-white mb-3 leading-snug line-clamp-2">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
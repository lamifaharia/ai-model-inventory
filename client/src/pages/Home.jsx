import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ModelCard from '../components/ModelCard';
import SkeletonCard from '../components/SkeletonCard';
import useTitle from '../hooks/useTitle';
import { ArrowRight, Plus, Zap, Shield, Globe, Users, Star, ChevronDown, Mail } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [stats, setStats] = useState({ totalModels: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [faqOpen, setFaqOpen] = useState(null);
  useTitle('Home');

  useEffect(() => {
  api.get('/api/models?limit=4&sort=purchased')
    .then(res => {
      setFeatured(res.data.models || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));

  api.get('/api/users/stats')
    .then(res => setStats({
      totalModels: res.data.totalModels || 0,
      totalUsers: res.data.totalUsers || 0
    }))
    .catch(() => {}); 
}, []);

  const features = [
    { icon: <Zap className="text-yellow-500" size={28} />, title: 'Instant Discovery', desc: 'Find the right AI model for your project in seconds with smart search and filters.' },
    { icon: <Shield className="text-blue-500" size={28} />, title: 'Secure & Verified', desc: 'Every model is reviewed and verified. Your data and transactions are fully protected.' },
    { icon: <Globe className="text-green-500" size={28} />, title: 'Global Community', desc: 'Join thousands of researchers and developers sharing models worldwide.' },
    { icon: <Users className="text-purple-500" size={28} />, title: 'Collaboration', desc: 'Work together with your team, track versions, and collaborate on AI architectures.' },
  ];

  const categories = [
    { name: 'NLP', icon: '🔤', count: '120+ models', color: 'from-blue-500 to-indigo-600' },
    { name: 'Computer Vision', icon: '👁️', count: '95+ models', color: 'from-purple-500 to-pink-600' },
    { name: 'Audio', icon: '🎵', count: '40+ models', color: 'from-green-500 to-emerald-600' },
    { name: 'Multimodal', icon: '🔀', count: '60+ models', color: 'from-amber-500 to-orange-600' },
    { name: 'Reinforcement Learning', icon: '🎮', count: '35+ models', color: 'from-red-500 to-rose-600' },
    { name: 'Other', icon: '🤖', count: '50+ models', color: 'from-cyan-500 to-blue-600' },
  ];

  const testimonials = [
    { name: 'Dr. Sarah Chen', role: 'ML Researcher, MIT', text: 'ModelHub completely transformed how our lab manages and shares model architectures. Incredible platform.', rating: 5 },
    { name: 'Marcus Williams', role: 'Senior AI Engineer, Google', text: 'The best place to discover production-ready AI models. Saves us weeks of research time.', rating: 5 },
    { name: 'Aisha Patel', role: 'Founder, AI Startup', text: 'We built our entire product on models discovered through ModelHub. The quality is outstanding.', rating: 5 },
  ];

  const faqs = [
    { q: 'What is ModelHub?', a: 'ModelHub is a professional platform for discovering, managing, and sharing AI model architectures. It connects researchers and developers worldwide.' },
    { q: 'How do I add my own model?', a: 'After creating an account, click "Add Model" in the navbar. Fill in the details about your model including name, framework, use case, dataset, and a description.' },
    { q: 'Is ModelHub free to use?', a: 'Yes! Basic features including browsing and adding models are completely free. Some premium models may have a price set by their creators.' },
    { q: 'What frameworks are supported?', a: 'ModelHub supports all major AI frameworks including PyTorch, TensorFlow, Keras, Hugging Face, ONNX, JAX, and more.' },
    { q: 'Can I collaborate with my team?', a: 'Yes. You can share models, view team member contributions, and manage your organization\'s model inventory through the dashboard.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Create Account', desc: 'Sign up for free and set up your developer profile in under 2 minutes.' },
    { step: '02', title: 'Explore or Add', desc: 'Browse thousands of AI models or upload your own architecture to share with the community.' },
    { step: '03', title: 'Collaborate', desc: 'Purchase, download, and integrate models directly into your projects.' },
  ];

  return (
    <div className="bg-white dark:bg-gray-950">

      {/* ── SECTION 1: HERO ──────────────────────────────── */}
      <div className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-6 backdrop-blur-sm">
            <Zap size={14} className="text-yellow-400" /> Platform v2.0 — Now with role-based dashboards
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-6">
            The Future of<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI Architecture
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Professional inventory management for AI researchers and developers. Discover, manage, and share cutting-edge models seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/models" className="btn h-13 px-8 rounded-2xl text-base font-bold border-none bg-white text-black hover:bg-gray-100">
              Explore Models <ArrowRight size={18} />
            </Link>
            <Link to="/add-model" className="btn btn-ghost h-13 px-8 rounded-2xl text-base font-bold border border-white/20 text-white hover:bg-white/10">
              <Plus size={18} /> Add Your Model
            </Link>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: DYNAMIC STATS ─────────────────────── */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {[
            { value: `${stats.totalModels || '500'}+`, label: 'AI Models' },
            { value: `${stats.totalUsers || '10K'}+`, label: 'Developers' },
            { value: '80+', label: 'Countries' },
            { value: '1M+', label: 'Downloads' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-extrabold">{value}</p>
              <p className="text-blue-200 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: FEATURED MODELS ───────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Top Picks</p>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Featured Models</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Most popular AI architectures this week</p>
          </div>
          <Link to="/models" className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : featured.length > 0
              ? featured.map(m => <ModelCard key={m._id} model={m} />)
              : Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          }
        </div>
      </div>

      {/* ── SECTION 4: CATEGORIES ────────────────────────── */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Browse by Type</p>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Model Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ name, icon, count, color }) => (
              <Link key={name} to={`/models?useCase=${name}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mx-auto mb-3`}>
                  {icon}
                </div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-400 mt-1">{count}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 5: FEATURES ──────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Why ModelHub</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Built for Professionals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="mb-4">{icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 6: HOW IT WORKS ──────────────────────── */}
      <div className="bg-gray-950 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-4xl font-extrabold text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-5">
                  <span className="text-white font-extrabold text-lg">{step}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 7: TESTIMONIALS ──────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Community Love</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">What Developers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, rating }) => (
            <div key={name} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array(rating).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 italic">"{text}"</p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 8: FAQ ───────────────────────────────── */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Got Questions?</p>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">FAQ</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-gray-900 dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  {q}
                  <ChevronDown size={18} className={`flex-shrink-0 text-gray-400 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER + CTA (combined) ──────────────────── */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-20 px-6 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4">Stay in the Loop</h2>
        <p className="text-blue-100 mb-8 max-w-md mx-auto">Get weekly updates on new AI models, research papers, and platform features.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input w-full h-12 pl-11 rounded-xl bg-white text-gray-900 border-none text-sm font-medium" />
          </div>
          <button onClick={() => { if (email) { setEmail(''); alert('Subscribed!'); } }}
            className="btn bg-gray-900 text-white border-none rounded-xl h-12 px-6 font-bold hover:bg-gray-800">
            Subscribe
          </button>
        </div>
        <div className="border-t border-white/20 pt-10">
          <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
          <p className="text-blue-100 mb-6">Join thousands of developers already using ModelHub.</p>
          <Link to="/register" className="btn bg-white text-blue-600 hover:bg-gray-100 border-none rounded-xl px-8 font-bold">
            Create Free Account
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
import useTitle from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { Target, Users, Zap, Globe } from 'lucide-react';

const About = () => {
  useTitle('About');
  const stats = [
    { label: 'AI Models Listed', value: '500+' },
    { label: 'Developers', value: '10K+' },
    { label: 'Countries', value: '80+' },
    { label: 'Downloads', value: '1M+' },
  ];
  const team = [
    { name: 'Dr. Sarah Chen', role: 'Founder & CEO', bg: 'from-blue-400 to-indigo-500' },
    { name: 'Marcus Lee', role: 'Head of Engineering', bg: 'from-purple-400 to-pink-500' },
    { name: 'Aisha Patel', role: 'ML Research Lead', bg: 'from-green-400 to-emerald-500' },
    { name: 'James Wilson', role: 'Product Designer', bg: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">About ModelHub</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          We're building the world's most comprehensive platform for AI model discovery, management, and collaboration.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-5 text-center">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          ModelHub was founded with a simple belief: AI development should be open, collaborative, and accessible to everyone. We provide researchers, developers, and organizations with the tools they need to manage, version, and share AI model architectures seamlessly.
        </p>
      </div>

      {/* Values */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target className="text-blue-500" size={28} />, title: 'Precision', desc: 'Every model is documented with accuracy and detail.' },
              { icon: <Users className="text-purple-500" size={28} />, title: 'Community', desc: 'Built by developers, for developers worldwide.' },
              { icon: <Zap className="text-amber-500" size={28} />, title: 'Speed', desc: 'Deploy and discover models in seconds, not days.' },
              { icon: <Globe className="text-green-500" size={28} />, title: 'Open Access', desc: 'Knowledge should be free and openly accessible.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 text-center">
                <div className="flex justify-center mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(({ name, role, bg }) => (
            <div key={name} className="text-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${bg} mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold`}>
                {name[0]}
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4">Ready to get started?</h2>
        <p className="text-blue-100 mb-8">Join thousands of developers already using ModelHub.</p>
        <Link to="/register" className="btn bg-white text-blue-600 hover:bg-gray-100 border-none rounded-xl px-8 font-bold">
          Create Free Account
        </Link>
      </div>
    </div>
  );
};

export default About;
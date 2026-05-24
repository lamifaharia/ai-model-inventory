const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-20 mt-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">AI</span>
              </div>
              <span className="text-3xl font-bold">ModelHub</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Professional platform for discovering, managing, and sharing cutting-edge AI models.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/models" className="hover:text-white transition">All Models</a></li>
              <li><a href="/add-model" className="hover:text-white transition">Add Model</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Hugging Face</a></li>
              <li><a href="#" className="hover:text-white transition">Model Zoo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Connect</h4>
            <p className="text-gray-400 mb-6">Built with ❤️ for AI enthusiasts</p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" className="hover:text-blue-400 transition">GitHub</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          © 2026 Faharia • AI Model Inventory Manager • All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
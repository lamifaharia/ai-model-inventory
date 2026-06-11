import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import ModelCard from '../components/ModelCard';
import SkeletonCard from '../components/SkeletonCard';
import useTitle from '../hooks/useTitle';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

const FRAMEWORKS = ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'ONNX', 'JAX'];
const USE_CASES = ['NLP', 'Computer Vision', 'Audio', 'Multimodal', 'Reinforcement Learning', 'Other'];
const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest First' },
  { value: 'purchased', label: 'Most Popular' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

const AllModels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [models, setModels] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [framework, setFramework] = useState(searchParams.get('framework') || '');
  const [useCase, setUseCase] = useState(searchParams.get('useCase') || '');
  const [sort, setSort] = useState('createdAt');
  const [page, setPage] = useState(1);

  useTitle('Explore Models');

  const fetchModels = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 8, sort });
    if (search) params.set('search', search);
    if (framework) params.set('framework', framework);
    if (useCase) params.set('useCase', useCase);

    api.get(`/api/models?${params.toString()}`)
      .then(res => {
        setModels(res.data.models || []);
        setTotal(res.data.total || 0);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, framework, useCase, sort, page]);

  useEffect(() => { fetchModels(); }, [fetchModels]);

  // When filters change, reset to page 1
  const handleFilter = (type, value) => {
    setPage(1);
    if (type === 'search') setSearch(value);
    if (type === 'framework') setFramework(value);
    if (type === 'useCase') setUseCase(value);
    if (type === 'sort') setSort(value);
  };

  const clearFilters = () => {
    setSearch(''); setFramework(''); setUseCase(''); setSort('createdAt'); setPage(1);
  };

  const hasFilters = search || framework || useCase;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3">
          Explore AI Models
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Discover {total > 0 ? `${total}+` : 'thousands of'} cutting-edge AI architectures
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 md:p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input type="text" placeholder="Search models (e.g. BERT, Llama...)"
                value={search} onChange={e => handleFilter('search', e.target.value)}
                className="input input-bordered w-full h-12 pl-11 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700" />
            </div>

            {/* Framework filter */}
            <select value={framework} onChange={e => handleFilter('framework', e.target.value)}
              className="select select-bordered h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 md:w-44">
              <option value="">All Frameworks</option>
              {FRAMEWORKS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            {/* Use Case filter */}
            <select value={useCase} onChange={e => handleFilter('useCase', e.target.value)}
              className="select select-bordered h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 md:w-44">
              <option value="">All Use Cases</option>
              {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            {/* Sort */}
            <select value={sort} onChange={e => handleFilter('sort', e.target.value)}
              className="select select-bordered h-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 md:w-48">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {hasFilters && (
              <button onClick={clearFilters} className="btn btn-ghost h-12 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 flex-shrink-0">
                <X size={16} /> Clear
              </button>
            )}
          </div>

          {/* Active filter tags */}
          {hasFilters && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {search && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium">Search: {search}</span>}
              {framework && <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-medium">{framework}</span>}
              {useCase && <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full font-medium">{useCase}</span>}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? 'Loading...' : `${total} model${total !== 1 ? 's' : ''} found`}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <SlidersHorizontal size={14} />
            Page {page} of {totalPages}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : models.length > 0
              ? models.map(m => <ModelCard key={m._id} model={m} />)
              : (
                <div className="col-span-4 text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No models found</p>
                  <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                  <button onClick={clearFilters} className="btn btn-outline rounded-xl text-sm">Clear Filters</button>
                </div>
              )
          }
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="btn btn-ghost btn-sm rounded-xl disabled:opacity-40">
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`btn btn-sm rounded-xl min-w-[40px] ${p === page ? 'btn-primary' : 'btn-ghost'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="btn btn-ghost btn-sm rounded-xl disabled:opacity-40">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllModels;
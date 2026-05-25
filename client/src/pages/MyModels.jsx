import { useEffect, useState } from 'react';
import api from '../api'; 
import { useAuth } from '../context/AuthContext';
import ModelCard from '../components/ModelCard';

const MyModels = () => {
  const { user } = useAuth();
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (user) {
      api.get(`/api/models/my-models?email=${user.email}`)
        .then(res => setModels(res.data))
        .catch(err => console.error("Error fetching user models:", err));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-12">My Added Models</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {models.map(m => <ModelCard key={m._id} model={m} />)}
      </div>
    </div>
  );
};

export default MyModels;
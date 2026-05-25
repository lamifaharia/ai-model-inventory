import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-model-inventory.onrender.com'
});

export default api;
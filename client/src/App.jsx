import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllModels from './pages/AllModels';
import AddModel from './pages/AddModel';
import ModelDetails from './pages/ModelDetails';
import UpdateModel from './pages/UpdateModel';
import MyModels from './pages/MyModels';
import MyPurchases from './pages/MyPurchases';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/models" element={<AllModels />} />
            <Route path="/models/:id" element={<PrivateRoute><ModelDetails /></PrivateRoute>} />
            <Route path="/add-model" element={<PrivateRoute><AddModel /></PrivateRoute>} />
            <Route path="/update-model/:id" element={<PrivateRoute><UpdateModel /></PrivateRoute>} />
            <Route path="/my-models" element={<PrivateRoute><MyModels /></PrivateRoute>} />
            <Route path="/my-purchases" element={<PrivateRoute><MyPurchases /></PrivateRoute>} />
            
            <Route path="*" element={<h1 className="text-center text-4xl mt-20">404 - Page Not Found</h1>} />
          </Routes>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
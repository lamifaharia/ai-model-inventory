import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import LoadingSpinner from './components/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AllModels = lazy(() => import('./pages/AllModels'));
const AddModel = lazy(() => import('./pages/AddModel'));
const ModelDetails = lazy(() => import('./pages/ModelDetails'));
const UpdateModel = lazy(() => import('./pages/UpdateModel'));
const MyModels = lazy(() => import('./pages/MyModels'));
const MyPurchases = lazy(() => import('./pages/MyPurchases'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/models" element={<AllModels />} />
              <Route path="/models/:id" element={<ModelDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />

              {/* Protected (logged in) */}
              <Route path="/add-model" element={<PrivateRoute><AddModel /></PrivateRoute>} />
              <Route path="/update-model/:id" element={<PrivateRoute><UpdateModel /></PrivateRoute>} />
              <Route path="/my-models" element={<PrivateRoute><MyModels /></PrivateRoute>} />
              <Route path="/my-purchases" element={<PrivateRoute><MyPurchases /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

              {/* Admin only */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

              {/* 404 */}
              <Route path="*" element={
                <div className="text-center py-32">
                  <h1 className="text-6xl font-extrabold text-gray-300 dark:text-gray-700">404</h1>
                  <p className="text-xl text-gray-500 mt-4">Page not found</p>
                </div>
              } />
            </Routes>
          </Suspense>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
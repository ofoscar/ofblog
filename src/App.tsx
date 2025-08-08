import { Toaster } from 'react-hot-toast';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import './App.css';
import AdminRoute from './components/AdminRoute';
import AppBar from './components/AppBar';
import BottomBar from './components/BottomBar';
import CookiesPopup from './components/CookiesPopup';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import './i18n/config';
import AddPostPage from './pages/AddPostPage';
import { AdminPage } from './pages/AdminPage';
import EditPostPage from './pages/EditPostPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import SignupPage from './pages/SignupPage';

const AppContent = () => {
  const location = useLocation();
  const isPostPage = location.pathname.startsWith('/post/');

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {!isPostPage && <AppBar />}
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/archive' element={<PostsPage />} />
          <Route path='/post/:slug' element={<PostPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route
            path='/admin'
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path='/admin/add-post'
            element={
              <AdminRoute>
                <AddPostPage />
              </AdminRoute>
            }
          />
          <Route
            path='/admin/edit-post/:postId'
            element={
              <AdminRoute>
                <EditPostPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <BottomBar />
      <CookiesPopup />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

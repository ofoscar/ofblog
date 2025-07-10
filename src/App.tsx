import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminRoute from './components/AdminRoute';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import './i18n/config';
import AddPostPage from './pages/AddPostPage';
import { AdminPage } from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PostsPage from './pages/PostsPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='min-h-screen bg-gray-50 flex flex-col'>
          <AppBar />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/posts' element={<PostsPage />} />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

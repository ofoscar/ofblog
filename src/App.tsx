import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import './i18n/config';
import MainPage from './pages/MainPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        <AppBar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/posts' element={<PostsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBar from './components/AppBar';
import './i18n/config';
import MainPage from './pages/MainPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <AppBar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/posts' element={<PostsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

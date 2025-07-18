import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorPostProps {
  error?: string;
}

const ErrorPost: React.FC<ErrorPostProps> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900 mb-4'>
          Post Not Found
        </h1>
        <p className='text-gray-600 mb-6'>
          {error || 'The post you are looking for does not exist.'}
        </p>
        <button
          onClick={() => navigate('/posts')}
          className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Posts
        </button>
      </div>
    </div>
  );
};

export default ErrorPost;

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAppTranslation } from '../hooks/useAppTranslation';

const SignupPage = () => {
  const { t } = useAppTranslation();
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await register(formData);

      if (result.success) {
        // On successful registration, redirect to main page
        navigate('/');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <div className='flex justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 24 24'
              style={{ color: '#BF1A2F' }}
            >
              <path
                fill='currentColor'
                d='M14.66 14.18c.03.11.04.22.04.32c.03.65-.26 1.35-.73 1.78c-.22.19-.58.39-.86.47c-.88.31-1.76-.13-2.28-.64c.94-.22 1.49-.9 1.67-1.61c.12-.61-.13-1.12-.23-1.72c-.1-.58-.08-1.07.13-1.6c.15.29.31.59.5.82c.6.78 1.55 1.12 1.76 2.18M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-4.84.56l-.1-.2c-.16-.36-.61-.98-.61-.98c-.18-.23-.4-.44-.6-.64c-.53-.47-1.12-.8-1.63-1.29c-1.17-1.14-1.43-3.01-.68-4.45c-.75.18-1.4.58-1.96 1.03c-2.03 1.62-2.83 4.47-1.87 6.92c.03.08.06.16.06.26c0 .17-.12.32-.27.39c-.19.07-.37.03-.5-.1a.3.3 0 0 1-.13-.13c-.87-1.11-1.03-2.71-.44-3.98c-1.31 1.06-2.02 2.85-1.93 4.53c.06.39.1.78.24 1.17c.11.47.32.91.56 1.35c.84 1.34 2.31 2.31 3.89 2.5c1.68.21 3.48-.09 4.77-1.24c1.44-1.3 1.94-3.37 1.2-5.14'
              />
            </svg>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {t('signup.title')}
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            {t('signup.subtitle')}
          </p>
        </div>
        <div className='bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  {t('signup.firstName')}
                </label>
                <div className='mt-1'>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    autoComplete='given-name'
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                    placeholder={t('signup.firstNamePlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700'
                >
                  {t('signup.lastName')}
                </label>
                <div className='mt-1'>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    autoComplete='family-name'
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                    placeholder={t('signup.lastNamePlaceholder')}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'
              >
                {t('signup.username')}
              </label>
              <div className='mt-1'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                  placeholder={t('signup.usernamePlaceholder')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                {t('signup.email')}
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                  placeholder={t('signup.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                {t('signup.password')}
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                  placeholder={t('signup.passwordPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='bio'
                className='block text-sm font-medium text-gray-700'
              >
                {t('signup.bio')}
              </label>
              <div className='mt-1'>
                <textarea
                  id='bio'
                  name='bio'
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm resize-none'
                  placeholder={t('signup.bioPlaceholder')}
                />
              </div>
            </div>

            {error && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>
                {error}
              </div>
            )}

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    {t('signup.signingUp')}
                  </div>
                ) : (
                  t('signup.signUp')
                )}
              </button>
            </div>

            <div className='text-center'>
              <span className='text-sm text-gray-600'>
                {t('signup.haveAccount')}{' '}
                <Link
                  to='/login'
                  className='font-medium text-blue-600 hover:text-blue-500'
                >
                  {t('signup.signIn')}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

const MainPage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Welcome to ofblog
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Your personal blog platform
        </p>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Main Dashboard
          </h2>
          <p className='text-gray-600'>
            This is the main page of your blog. Here you can manage your
            content, view analytics, and customize your blog settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

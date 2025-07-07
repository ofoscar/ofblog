import HeroSlide from '../components/HeroSlide';

const MainPage = () => {
  return (
    <div>
      <HeroSlide
        backgroundImage='https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        title={'Hola'}
        subtitle={'Saludos terrícolas'}
        primaryButtonText={'Show more'}
        onPrimaryClick={() => {}}
      />
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

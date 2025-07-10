import HeroSlide from '../components/HeroSlide';
import RecentPostsSection from '../components/RecentPostsSection';

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
      <RecentPostsSection />
    </div>
  );
};

export default MainPage;

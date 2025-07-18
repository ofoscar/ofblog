import HeroSlide from '../components/HeroSlide';
import RecentPostsSection from '../components/RecentPostsSection';

const MainPage = () => {
  return (
    <div>
      <HeroSlide
        backgroundImage='https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        title={'The World is Wired'}
        subtitle={
          "From AI breakthroughs to new mobile frameworks, innovation travels at light speed. Explore how today's tech is shaping tomorrow—one connection at a time."
        }
        primaryButtonText={'Show more'}
        onPrimaryClick={() => {}}
      />
      <RecentPostsSection />
    </div>
  );
};

export default MainPage;

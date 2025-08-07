import HeroCarousel from '../components/HeroCarousel';
import RecentPostsSection from '../components/RecentPostsSection';
import { PostsProvider } from '../contexts/PostsContext';

const MainPage = () => {
  return (
    <PostsProvider>
      <div>
        <HeroCarousel />
        <RecentPostsSection />
      </div>
    </PostsProvider>
  );
};

export default MainPage;

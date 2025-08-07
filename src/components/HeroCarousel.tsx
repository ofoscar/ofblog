import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePosts } from '../contexts/PostsContext';
import HeroSlide from './HeroSlide';

const HeroCarousel = () => {
  const { posts } = usePosts();
  const slides = posts.slice(0, 3).map((post) => ({
    backgroundImage: post.featuredImage || '',
    title: post.title,
    subtitle: post.excerpt || '',
    primaryButtonText: 'Read more',
    onPrimaryClick: () =>
      window.open(`https://blog.ofoscar.com/post/${post.slug}`, '_blank'),
  }));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 9000); // 9 seconds autoplay interval
  }, []);

  const [sliderElRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      resetAutoplay(); // Reset autoplay on user interaction
    },
  });

  // On mount: start autoplay
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  // Handler for dot click
  const goToSlide = (idx: number) => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(idx);
      setCurrentSlide(idx);
      resetAutoplay();
    }
  };

  if (slides.length === 0) {
    return <div className='h-[480px] bg-gray-300 animate-pulse' />;
  }

  return (
    <div className='relative'>
      <div ref={sliderElRef} className='keen-slider'>
        {slides.map((slide, index) => (
          <div key={index} className='keen-slider__slide w-full'>
            <HeroSlide {...slide} onPrimaryClick={slide.onPrimaryClick} />
          </div>
        ))}
      </div>

      {/* Dots navigation positioned inside slider, floating bottom with padding */}
      <div className='absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-4 pointer-events-auto'>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-4 h-4 rounded-full transition-colors ${
              currentSlide === idx
                ? 'bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

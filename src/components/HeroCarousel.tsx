import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import HeroSlide from './HeroSlide';

const slides = [
  {
    backgroundImage:
      'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?q=80&w=2072',
    title: 'The World is Wired',
    subtitle: 'From AI breakthroughs to new mobile frameworks...',
    primaryButtonText: 'Show more',
  },
  {
    backgroundImage:
      'https://images.unsplash.com/photo-1581091012184-7e0cdfbb6792?q=80&w=2072',
    title: 'Next-Gen Connectivity',
    subtitle: 'Discover the new era of mobile and edge computing.',
    primaryButtonText: 'Explore',
  },
  {
    backgroundImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2072',
    title: 'Innovate & Create',
    subtitle: 'Harness technology to push boundaries and build the future.',
    primaryButtonText: 'Join us',
  },
];

const HeroCarousel = () => {
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

  return (
    <div className='relative'>
      <div ref={sliderElRef} className='keen-slider'>
        {slides.map((slide, index) => (
          <div key={index} className='keen-slider__slide'>
            <HeroSlide {...slide} />
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

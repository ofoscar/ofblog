import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useCallback, useEffect, useRef } from 'react';
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
];

const HeroCarousel = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

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
    slideChanged() {
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

  return (
    <div ref={sliderElRef} className='keen-slider'>
      {slides.map((slide, index) => (
        <div key={index} className='keen-slider__slide'>
          <HeroSlide {...slide} />
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;

import { theme } from '../theme';
import GlassButton from './GlassButton';

interface HeroSlideProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  onPrimaryClick?: () => void;
}

function HeroSlide({
  backgroundImage,
  title,
  subtitle,
  primaryButtonText,
  onPrimaryClick,
}: HeroSlideProps) {
  return (
    <div className='w-full relative flex items-center justify-center overflow-hidden h-[480px] px-4 py-8 sm:px-8 md:px-16 lg:px-20 xl:px-[80px]'>
      {/* Blurred Background Image */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
        }}
        aria-hidden='true'
      ></div>

      {/* Overlay for better text readability */}
      <div
        className='absolute inset-0 bg-black opacity-40'
        aria-hidden='true'
      ></div>

      {/* Content */}
      <div className='relative z-10 text-left w-full max-w-[1280px]'>
        <div className='flex-col max-w-[800px]'>
          <h1
            className='text-5xl md:text-[64px] font-bold mb-6 text-white w-full leading-none'
            style={{
              fontFamily: theme.typography.fontFamily.sans.join(', '),
              textShadow: 'none',
            }}
          >
            {title}
          </h1>
          <p
            className='text-xl md:text-[32px] leading-tight text-[#EBE2D1] mb-8'
            style={{
              fontFamily: theme.typography.fontFamily.sans.join(', '),
              textShadow: 'none',
            }}
          >
            {subtitle}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center sm:justify-start'>
            <GlassButton
              className='gradient-border-wrapper text-lg md:text-2xl w-[220px]'
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;

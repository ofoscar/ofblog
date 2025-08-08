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
    <div className='w-full relative flex items-end justify-center overflow-hidden h-[480px] px-4 py-8 sm:px-8 md:px-16 lg:px-20 xl:px-[80px]'>
      {/* Blurred Background Image */}
      <div
        className='absolute inset-0 sm:bg-cover bg-center'
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', // Ensures the image covers the entire area
          filter: 'blur(4px)',
          margin: '-10px', // Extends the image slightly beyond the edges
          backgroundColor: '#000', // Adds a matching background color to blend
        }}
        aria-hidden='true'
      ></div>

      {/* Overlay for better text readability */}
      <div
        className='absolute inset-0 bg-black opacity-40'
        aria-hidden='true'
      ></div>

      {/* Content */}
      <div className='relative z-10 text-left w-full h-full max-w-[1280px] flex items-center sm:items-end sm:pb-4'>
        <div className='flex flex-col sm:flex-row items-center sm:items-end w-full sm:justify-between gap-4 '>
          <div className='flex flex-col gap-2 max-w-[700px]'>
            <h1
              className='text-3xl sm:text-5xl text-center sm:text-start font-bold text-white w-full leading-none'
              style={{
                fontFamily: theme.typography.fontFamily.sans.join(', '),
                textShadow: 'none',
              }}
            >
              {title}
            </h1>
            <p
              className='text-lg sm:text-xl md:text-3xl  text-[#EBE2D1] text-center sm:text-start'
              style={{
                lineHeight: '1.2',
                fontFamily: theme.typography.fontFamily.sans.join(', '),
                textShadow: 'none',
              }}
            >
              {subtitle}
            </p>
          </div>
          <div className='flex-shrink-0'>
            <GlassButton
              className='gradient-border-wrapper text-lg md:text-2xl sm:w-[220px]'
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

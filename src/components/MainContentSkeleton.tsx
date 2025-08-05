const MainContentSkeleton = () => {
  return (
    <div className='relative z-10 max-w-4xl mx-auto py-8'>
      <article className='bg-white rounded-lg shadow-sm overflow-hidden mt-20'>
        {/* Header skeleton */}
        <header className='p-8 border-b'>
          {/* Title skeleton */}
          <div className='h-12 bg-gray-300 rounded animate-pulse mb-6'></div>

          {/* Excerpt skeleton */}
          <div className='space-y-3 mb-6'>
            <div className='h-6 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-6 bg-gray-200 rounded animate-pulse w-4/5'></div>
          </div>
        </header>

        {/* Content skeleton */}
        <div className='p-8'>
          <div className='space-y-4'>
            <div className='h-8 bg-gray-300 rounded animate-pulse w-3/4'></div>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 bg-gray-200 rounded animate-pulse w-5/6'></div>
            </div>
            <div className='h-48 bg-gray-300 rounded animate-pulse my-6'></div>
            <div className='h-6 bg-gray-300 rounded animate-pulse w-2/3'></div>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 bg-gray-200 rounded animate-pulse w-4/5'></div>
              <div className='h-4 bg-gray-200 rounded animate-pulse w-3/4'></div>
            </div>
          </div>
        </div>

        {/* Footer skeleton */}
        <footer className='border-t'>
          {/* Tags skeleton */}
          <div className='flex items-center gap-2 p-4'>
            <div className='h-6 w-24 bg-gray-200 rounded-full animate-pulse'></div>
            <div className='h-6 w-20 bg-gray-200 rounded-full animate-pulse'></div>
            <div className='h-6 w-28 bg-gray-200 rounded-full animate-pulse'></div>
          </div>

          {/* Author and meta info skeleton */}
          <div className='flex items-center justify-between p-4 border-t'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-gray-300 rounded-full animate-pulse'></div>
              <div>
                <div className='h-4 w-32 bg-gray-300 rounded animate-pulse mb-2'></div>
                <div className='h-3 w-24 bg-gray-200 rounded animate-pulse'></div>
              </div>
            </div>
            <div className='flex items-center space-x-6'>
              <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 w-18 bg-gray-200 rounded animate-pulse'></div>
            </div>
          </div>

          {/* Engagement stats skeleton */}
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center space-x-6'>
              <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>
            </div>
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default MainContentSkeleton;

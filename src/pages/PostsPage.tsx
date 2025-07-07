const PostsPage = () => {
  const samplePosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt:
        'Learn the basics of React and how to build your first component.',
      date: '2025-01-15',
      author: 'ofoscar',
    },
    {
      id: 2,
      title: 'Understanding TypeScript',
      excerpt:
        'Discover why TypeScript is essential for modern web development.',
      date: '2025-01-10',
      author: 'ofoscar',
    },
    {
      id: 3,
      title: 'Building with Tailwind CSS',
      excerpt: 'Create beautiful UIs quickly with utility-first CSS framework.',
      date: '2025-01-05',
      author: 'ofoscar',
    },
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>Blog Posts</h1>
        <p className='text-gray-600'>
          Explore the latest articles and insights
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {samplePosts.map((post) => (
          <article
            key={post.id}
            className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
          >
            <div className='p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                {post.title}
              </h2>
              <p className='text-gray-600 mb-4'>{post.excerpt}</p>
              <div className='flex items-center justify-between text-sm text-gray-500'>
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

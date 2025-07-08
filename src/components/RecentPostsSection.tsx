import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

function RecentPostsSection() {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      key: 'webdev',
      image:
        'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'July 2, 2025',
      readTime: '5',
    },
    {
      id: 2,
      key: 'react',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'June 28, 2025',
      readTime: '8',
    },
    {
      id: 3,
      key: 'typescript',
      image:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'June 25, 2025',
      readTime: '6',
    },
    {
      id: 4,
      key: 'ui',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'June 22, 2025',
      readTime: '7',
    },
    {
      id: 5,
      key: 'devops',
      image:
        'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'June 18, 2025',
      readTime: '9',
    },
    {
      id: 6,
      key: 'performance',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'June 15, 2025',
      readTime: '10',
    },
  ];

  return (
    <div className='w-full px-4 mt-16'>
      <div className='max-w-[1280px] mx-auto'>
        <div className='text-center mb-12'>
          <h2
            className='text-3xl font-bold mb-4'
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily.sans.join(', '),
            }}
          >
            {t('blog.title')}
          </h2>
          <p
            className='text-lg'
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.sans.join(', '),
            }}
          >
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Grid with 3 columns, 2 rows, 40px gap */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentPostsSection;

interface Post {
  id: number;
  key: string;
  image: string;
  date: string;
  readTime: string;
}
interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { t } = useTranslation();
  return (
    <div key={post.id} className='cursor-pointer group flex flex-col gap-4'>
      {/* Post Image */}
      <div
        className='w-full h-[250px]  overflow-hidden relative'
        style={{ borderRadius: '12px' }}
      >
        <img
          src={post.image}
          alt={t(`blog.posts.${post.key}.title`)}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        {/* Tag overlay */}
        <div
          className='absolute bottom-3 left-3 px-3 py-1 text-sm font-medium text-white rounded-full'
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow:
              'inset 0px -1px 2px rgba(0, 0, 0, 0.1), inset 0px 1px 2px rgba(255, 255, 255, 0.8)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {
            (
              t(`blog.posts.${post.key}.tags`, {
                returnObjects: true,
              }) as string[]
            )[0]
          }
        </div>
      </div>

      {/* Post Content */}
      <div className='rounded-lg transition-all duration-300'>
        {/* Meta Information */}
        <div className='flex items-center justify-between mb-3'>
          <span
            className='text-sm'
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.sans.join(', '),
            }}
          >
            {post.date}
          </span>
          <span
            className='text-sm'
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.sans.join(', '),
            }}
          >
            {`${post.readTime} ${t('blog.readTime')}`}
          </span>
        </div>

        {/* Post Title */}
        <h3
          className='text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-200'
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.sans.join(', '),
          }}
        >
          {t(`blog.posts.${post.key}.title`)}
        </h3>

        {/* Post Excerpt */}
        <p
          className='text-base leading-relaxed mb-4'
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(', '),
          }}
        >
          {t(`blog.posts.${post.key}.excerpt`)}
        </p>
      </div>
    </div>
  );
};

import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Tag,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TipTapViewer from '../components/TipTapViewer';
import { apiService } from '../services/api';
import { theme } from '../theme';
import type { Post } from '../types/post';

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('Invalid post URL');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to fetch from API first
        try {
          const response = await apiService.getPostBySlug(slug);
          if (response.success) {
            setPost(response.data.post);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using mock data');
        }

        // Fallback to mock data for development
        const mockPost = getMockPost(slug);
        if (mockPost) {
          setPost(mockPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Error loading post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const getMockPost = (slug: string): Post | null => {
    const mockPosts: Record<string, Post> = {
      webdev: {
        _id: '1',
        title: 'Web Development Best Practices',
        slug: 'webdev',
        content: `<h1>Web Development Best Practices</h1>
        <p>In this comprehensive guide, we'll explore the essential best practices that every web developer should follow to create maintainable, scalable, and performant web applications.</p>
        
        <h2>1. Code Organization</h2>
        <p>Organizing your code properly is crucial for long-term maintainability. Here are some key principles:</p>
        <ul>
          <li>Use a consistent folder structure</li>
          <li>Separate concerns (HTML, CSS, JavaScript)</li>
          <li>Follow naming conventions</li>
          <li>Write self-documenting code</li>
        </ul>
        
        <h2>2. Performance Optimization</h2>
        <p>Performance is key to user experience. Consider these optimization techniques:</p>
        <ul>
          <li>Minimize HTTP requests</li>
          <li>Optimize images and assets</li>
          <li>Use lazy loading</li>
          <li>Implement caching strategies</li>
        </ul>
        
        <blockquote>
          <p>"The best performance optimization is to do less work." - Steve Souders</p>
        </blockquote>
        
        <h2>3. Security Considerations</h2>
        <p>Security should never be an afterthought. Always validate input, sanitize data, and follow the principle of least privilege.</p>`,
        excerpt:
          'Learn the essential best practices every web developer should follow to create maintainable and scalable applications.',
        featuredImage:
          'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Web Development', 'Best Practices', 'Performance'],
        category: 'Development',
        author: {
          _id: '1',
          username: 'ofoscar',
          firstName: 'Oscar',
          lastName: 'Developer',
          email: 'oscar@example.com',
        },
        status: 'published',
        publishedAt: '2025-07-02T00:00:00Z',
        views: 1234,
        likes: [],
        comments: [],
        readingTime: 5,
        createdAt: '2025-07-02T00:00:00Z',
        updatedAt: '2025-07-02T00:00:00Z',
        likeCount: 42,
        commentCount: 8,
      },
      react: {
        _id: '2',
        title: 'Mastering React Hooks',
        slug: 'react',
        content: `<h1>Mastering React Hooks</h1>
        <p>React Hooks revolutionized how we write React applications. Let's dive deep into the most important hooks and learn how to use them effectively.</p>
        
        <h2>useState Hook</h2>
        <p>The useState hook is the foundation of state management in functional components:</p>
        <pre><code>const [count, setCount] = useState(0);</code></pre>
        
        <h2>useEffect Hook</h2>
        <p>Use useEffect for side effects in your components:</p>
        <pre><code>useEffect(() => {
  // Side effect logic here
  return () => {
    // Cleanup function
  };
}, [dependencies]);</code></pre>
        
        <h2>Custom Hooks</h2>
        <p>Create your own hooks to encapsulate and reuse stateful logic across components.</p>
        
        <blockquote>
          <p>"Hooks let you use state and other React features without writing a class." - React Documentation</p>
        </blockquote>`,
        excerpt:
          'Learn how to effectively use React Hooks to build modern, functional React applications.',
        featuredImage:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['React', 'Hooks', 'JavaScript'],
        category: 'Frontend',
        author: {
          _id: '1',
          username: 'ofoscar',
          firstName: 'Oscar',
          lastName: 'Developer',
          email: 'oscar@example.com',
        },
        status: 'published',
        publishedAt: '2025-06-28T00:00:00Z',
        views: 856,
        likes: [],
        comments: [],
        readingTime: 8,
        createdAt: '2025-06-28T00:00:00Z',
        updatedAt: '2025-06-28T00:00:00Z',
        likeCount: 67,
        commentCount: 12,
      },
      typescript: {
        _id: '3',
        title: 'TypeScript for Modern Development',
        slug: 'typescript',
        content: `<h1>TypeScript for Modern Development</h1>
        <p>TypeScript brings static typing to JavaScript, making your code more reliable and maintainable. Let's explore its key features.</p>
        
        <h2>Why TypeScript?</h2>
        <ul>
          <li>Catch errors at compile time</li>
          <li>Better IDE support and autocompletion</li>
          <li>Improved code documentation</li>
          <li>Enhanced refactoring capabilities</li>
        </ul>
        
        <h2>Basic Types</h2>
        <pre><code>let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;</code></pre>
        
        <h2>Interfaces and Types</h2>
        <p>Define the shape of your data with interfaces:</p>
        <pre><code>interface User {
  id: number;
  name: string;
  email: string;
}</code></pre>`,
        excerpt:
          'Discover how TypeScript can improve your development workflow and code quality.',
        featuredImage:
          'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['TypeScript', 'Programming', 'Development'],
        category: 'Programming',
        author: {
          _id: '1',
          username: 'ofoscar',
          firstName: 'Oscar',
          lastName: 'Developer',
          email: 'oscar@example.com',
        },
        status: 'published',
        publishedAt: '2025-06-25T00:00:00Z',
        views: 723,
        likes: [],
        comments: [],
        readingTime: 6,
        createdAt: '2025-06-25T00:00:00Z',
        updatedAt: '2025-06-25T00:00:00Z',
        likeCount: 38,
        commentCount: 5,
      },
      ui: {
        _id: '4',
        title: 'Modern UI Design Principles',
        slug: 'ui',
        content: `<h1>Modern UI Design Principles</h1>
        <p>Creating beautiful and functional user interfaces requires understanding fundamental design principles.</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li>Clarity and simplicity</li>
          <li>Consistency across components</li>
          <li>Accessibility for all users</li>
          <li>Responsive design</li>
        </ul>
        
        <h2>Color and Typography</h2>
        <p>Choose colors and fonts that enhance readability and create visual hierarchy.</p>`,
        excerpt:
          'Learn the fundamental principles of modern UI design for better user experiences.',
        featuredImage:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['UI Design', 'UX', 'Design'],
        category: 'Design',
        author: {
          _id: '1',
          username: 'ofoscar',
          firstName: 'Oscar',
          lastName: 'Developer',
          email: 'oscar@example.com',
        },
        status: 'published',
        publishedAt: '2025-06-22T00:00:00Z',
        views: 567,
        likes: [],
        comments: [],
        readingTime: 7,
        createdAt: '2025-06-22T00:00:00Z',
        updatedAt: '2025-06-22T00:00:00Z',
        likeCount: 29,
        commentCount: 4,
      },
      devops: {
        _id: '5',
        title: 'DevOps Best Practices',
        slug: 'devops',
        content: `<h1>DevOps Best Practices</h1>
        <p>DevOps transforms how we build, deploy, and maintain software applications.</p>
        
        <h2>CI/CD Pipelines</h2>
        <p>Implement continuous integration and deployment for faster, more reliable releases.</p>
        
        <h2>Infrastructure as Code</h2>
        <p>Manage your infrastructure using code for better version control and reproducibility.</p>`,
        excerpt:
          'Explore DevOps practices that streamline development and operations workflows.',
        featuredImage:
          'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['DevOps', 'CI/CD', 'Infrastructure'],
        category: 'Operations',
        author: {
          _id: '1',
          username: 'ofoscar',
          firstName: 'Oscar',
          lastName: 'Developer',
          email: 'oscar@example.com',
        },
        status: 'published',
        publishedAt: '2025-06-18T00:00:00Z',
        views: 890,
        likes: [],
        comments: [],
        readingTime: 9,
        createdAt: '2025-06-18T00:00:00Z',
        updatedAt: '2025-06-18T00:00:00Z',
        likeCount: 52,
        commentCount: 7,
      },
      performance: {
        _id: '6',
        title: 'Web Performance Optimization',
        slug: 'performance',
        content: `<h1>Web Performance Optimization</h1>
        <p>Learn how to make your web applications lightning fast with these performance optimization techniques.</p>
        
        <h2>Core Web Vitals</h2>
        <ul>
          <li>Largest Contentful Paint (LCP)</li>
          <li>First Input Delay (FID)</li>
          <li>Cumulative Layout Shift (CLS)</li>
        </ul>
        
        <h2>Optimization Strategies</h2>
        <p>Implement code splitting, lazy loading, and efficient caching strategies.</p>`,
        excerpt:
          'Master web performance optimization to create faster, more efficient applications.',
        featuredImage:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Performance', 'Optimization', 'Web'],
        category: 'Performance',
        author: {
          _id: '1',
          username: 'ofoscar',
          firstName: 'Oscar',
          lastName: 'Developer',
          email: 'oscar@example.com',
        },
        status: 'published',
        publishedAt: '2025-06-15T00:00:00Z',
        views: 1456,
        likes: [],
        comments: [],
        readingTime: 10,
        createdAt: '2025-06-15T00:00:00Z',
        updatedAt: '2025-06-15T00:00:00Z',
        likeCount: 73,
        commentCount: 15,
      },
    };

    return mockPosts[slug] || null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }
  console.log('Post data:', post);

  if (error || !post) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Post Not Found
          </h1>
          <p className='text-gray-600 mb-6'>
            {error || 'The post you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/posts')}
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header with back button */}
      <div className='bg-white border-b'>
        <div className='max-w-4xl mx-auto px-4 py-4'>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            Back
          </button>
        </div>
      </div>

      {/* Hero section with featured image */}
      {post.featuredImage && (
        <div className='relative h-96 overflow-hidden'>
          <img
            src={post.featuredImage}
            alt={post.title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-30'></div>
        </div>
      )}

      {/* Main content */}
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <article className='bg-white rounded-lg shadow-sm overflow-hidden'>
          {/* Header */}
          <header className='p-8 border-b'>
            {/* Categories/Tags */}
            <div className='flex items-center gap-2 mb-4'>
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'
                >
                  <Tag className='w-3 h-3 mr-1' />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className='text-4xl font-bold mb-6 leading-tight'
              style={{
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.sans.join(', '),
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className='text-xl leading-relaxed mb-6'
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(', '),
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Author and meta info */}
            <div className='flex items-center justify-between pt-6 border-t'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold'>
                  {post.author.firstName[0]}
                  {post.author.lastName[0]}
                </div>
                <div>
                  <p
                    className='font-semibold'
                    style={{
                      color: theme.colors.text.primary,
                      fontFamily: theme.typography.fontFamily.sans.join(', '),
                    }}
                  >
                    {post.author.firstName} {post.author.lastName}
                  </p>
                  <p
                    className='text-sm'
                    style={{
                      color: theme.colors.text.secondary,
                      fontFamily: theme.typography.fontFamily.sans.join(', '),
                    }}
                  >
                    @{post.author.username}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-6 text-sm text-gray-500'>
                <div className='flex items-center'>
                  <Calendar className='w-4 h-4 mr-1' />
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                <div className='flex items-center'>
                  <Clock className='w-4 h-4 mr-1' />
                  {post.readingTime} min read
                </div>
                <div className='flex items-center'>
                  <Eye className='w-4 h-4 mr-1' />
                  {post.views} views
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className='p-8'>
            <TipTapViewer content={post.content} />
          </div>

          {/* Footer with engagement stats */}
          <footer className='p-8 border-t bg-gray-50'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-6'>
                <div className='flex items-center text-gray-600'>
                  <Heart className='w-5 h-5 mr-2' />
                  <span>{post.likeCount} likes</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <MessageCircle className='w-5 h-5 mr-2' />
                  <span>{post.commentCount} comments</span>
                </div>
              </div>

              {/* Category */}
              <div className='flex items-center text-gray-600'>
                <span className='text-sm'>Category: </span>
                <span className='ml-1 px-2 py-1 bg-gray-200 rounded text-sm font-medium'>
                  {post.category}
                </span>
              </div>
            </div>
          </footer>
        </article>

        {/* Related posts section could go here */}
      </div>
    </div>
  );
};

export default PostPage;

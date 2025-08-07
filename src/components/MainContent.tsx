import { Calendar, Clock, Eye, Heart, MessageCircle, Tag } from 'lucide-react';
import { theme } from '../theme';
import type { Post } from '../types/post';
import TipTapViewer from './TipTapViewer';

interface MainContentProps {
  post: Post;
  formatDate: (dateString: string) => string;
}

const MainContent = ({ post, formatDate }: MainContentProps) => {
  return (
    <div className='relative z-10 max-w-4xl mx-auto py-1'>
      <article className='bg-white rounded-lg shadow-sm overflow-hidden mt-20'>
        {/* Header */}
        <header className='p-8 border-b'>
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
        </header>

        {/* Content */}
        <div>
          <TipTapViewer content={post.content} />
        </div>

        {/* Footer with engagement stats */}
        <footer className='border-t'>
          {/* Categories/Tags */}
          <div className='flex items-center gap-2 p-4'>
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

          {/* Author and meta info */}
          <div className='flex items-center justify-between p-4 border-t'>
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

          <div className='flex items-center justify-between p-4'>
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
  );
};

export default MainContent;

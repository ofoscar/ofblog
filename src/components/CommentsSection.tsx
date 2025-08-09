import { MessageCircle, Send, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { theme } from '../theme';
import type { Comment, Post } from '../types/post';

interface CommentsSectionProps {
  post: Post;
  onCommentAdded: (comment: Comment, newCount: number) => void;
  onCommentRemoved: (commentId: string, newCount: number) => void;
}

const CommentsSection = ({
  post,
  onCommentAdded,
  onCommentRemoved,
}: CommentsSectionProps) => {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      setError('Please log in to comment');
      return;
    }

    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiService.addComment(post._id, comment.trim());

      if (response.success) {
        // Add the new comment to the UI
        onCommentAdded(response.data.comment, response.data.commentCount);
        setComment('');
        toast.success('Comment added successfully!');
      } else {
        setError(response.message || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isAuthenticated || !user) {
      setError('Please log in to delete comments');
      return;
    }

    try {
      const response = await apiService.deleteComment(post._id, commentId);

      if (response.success) {
        // Update the UI by removing the deleted comment
        const updatedComments = post.comments.filter(
          (comment) => comment._id !== commentId,
        );
        onCommentRemoved(commentId, updatedComments.length);
        toast.success('Comment deleted successfully!');
      } else {
        setError(response.message || 'Failed to delete comment');
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment. Please try again.');
    }
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };
  console.log(post.comments);
  console.log('user', user);
  return (
    <div className='relative z-10 max-w-4xl mx-auto py-1'>
      <div className='bg-white rounded-lg shadow-sm overflow-hidden mt-8'>
        {/* Header */}
        <div className='p-6 border-b'>
          <div className='flex items-center gap-3'>
            <MessageCircle
              className='w-6 h-6'
              style={{ color: theme.colors.brand.primary }}
            />
            <h2
              className='text-2xl font-bold'
              style={{
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.sans.join(', '),
              }}
            >
              Comments ({post.commentCount})
            </h2>
          </div>
        </div>

        {/* Comment Form */}
        <div className='p-6 border-b bg-gray-50'>
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className='space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-shrink-0'>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  ) : (
                    <div
                      className='w-10 h-10 rounded-full flex items-center justify-center text-white'
                      style={{ backgroundColor: theme.colors.brand.primary }}
                    >
                      <User className='w-5 h-5' />
                    </div>
                  )}
                </div>
                <div className='flex-1'>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Add a comment...'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-200 focus:border-transparent transition-colors'
                    style={{
                      fontFamily: theme.typography.fontFamily.sans.join(', '),
                    }}
                    rows={3}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className='mt-2 text-sm text-red-600'>{error}</p>
                  )}
                </div>
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={isSubmitting || !comment.trim()}
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  style={{
                    backgroundColor: theme.colors.brand.primary,
                  }}
                >
                  <Send className='w-4 h-4' />
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className='text-center py-8'>
              <p className='text-gray-600 mb-4'>
                Please log in to leave a comment
              </p>
              <button
                className='inline-flex items-center px-4 py-2 rounded-lg text-white font-medium transition-colors'
                style={{ backgroundColor: theme.colors.brand.primary }}
                onClick={() => (window.location.href = '/login')}
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Comments List */}
        <div className='p-6 sm:p-8'>
          {post.comments && post.comments.length > 0 ? (
            <div className='space-y-6'>
              {post.comments.map((comment) => (
                <div key={comment._id} className='flex gap-3'>
                  <div className='flex-shrink-0'>
                    {comment.user.avatar ? (
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.firstName}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                    ) : (
                      <div
                        className='w-10 h-10 rounded-full flex items-center justify-center text-white'
                        style={{ backgroundColor: theme.colors.brand.primary }}
                      >
                        <User className='w-5 h-5' />
                      </div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span
                        className='font-medium'
                        style={{ color: theme.colors.text.primary }}
                      >
                        {comment.user.firstName} {comment.user.lastName}
                      </span>
                      <span
                        className='text-sm'
                        style={{ color: theme.colors.text.secondary }}
                      >
                        @{comment.user.username}
                      </span>
                      <span className='text-sm text-gray-500'>
                        {formatCommentDate(comment.createdAt)}
                      </span>
                      {user?.id === comment.user._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className='ml-auto text-red-500 hover:text-red-700'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                    <p
                      className='leading-relaxed'
                      style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.sans.join(', '),
                      }}
                    >
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <MessageCircle className='w-12 h-12 mx-auto mb-4 text-gray-400' />
              <p className='text-gray-600'>
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;

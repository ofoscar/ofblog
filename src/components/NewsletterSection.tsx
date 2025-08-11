import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .send(
        'service_vk962ka',
        'template_2mnz6ec',
        { email },
        '7ZW8TSNw8GdGThTnK',
      )
      .then(() => {
        setStatus('success');
        setEmail('');
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>
        {t('footer.newsletter.title')}
      </h3>
      <p className='text-gray-300 text-sm mb-4'>
        {t('footer.newsletter.description')}
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
        <input
          type='email'
          placeholder={t('footer.newsletter.emailPlaceholder')}
          value={email}
          onChange={handleInputChange}
          className='px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        />
        <button
          type='submit'
          className='px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={status === 'sending'}
        >
          {status === 'sending'
            ? t('footer.newsletter.sending')
            : t('footer.newsletter.subscribe')}
        </button>
        {status === 'success' && (
          <p className='text-green-500 text-sm'>
            {t('footer.newsletter.success')}
          </p>
        )}
        {status === 'error' && (
          <p className='text-red-500 text-sm'>{t('footer.newsletter.error')}</p>
        )}
      </form>
    </div>
  );
}

export default NewsletterSection;

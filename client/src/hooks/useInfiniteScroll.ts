import { useEffect } from 'react';

export const useInfiniteScroll = (options: { canLoadMore: boolean; onLoadMore: () => void }) => {
  useEffect(() => {
    if (!options.canLoadMore) return;

    const handler = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;
      if (nearBottom) {
        options.onLoadMore();
      }
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [options]);
};

import { useState, useEffect } from 'react';
import { Article } from '@/types/article';

interface UseArticlesOptions {
  limit?: number;
  featured?: boolean;
}

export const useArticles = (options?: UseArticlesOptions) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        let allArticles = await response.json();

        // featured가 true이면 추천글 우선, 부족하면 최신글로 채움
        if (options?.featured) {
          const featuredArticles = allArticles.filter((article: Article) => article.featured);
          const regularArticles = allArticles.filter((article: Article) => !article.featured);

          // 추천글을 먼저 배치하고, 부족하면 일반글로 채움
          allArticles = [...featuredArticles, ...regularArticles];
        }

        // limit이 있으면 해당 개수만큼만 가져오기
        if (options?.limit) {
          allArticles = allArticles.slice(0, options.limit);
        }

        setArticles(allArticles);
        setError(null);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [options?.limit, options?.featured]);

  return { articles, loading, error };
};

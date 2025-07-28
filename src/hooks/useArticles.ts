import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import {
  getAllArticles,
  getFeaturedArticles,
  getArticleBySlug,
  getArticlesByTag,
  searchArticles,
} from '@/data/articles';

interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

interface UseArticlesOptions {
  limit?: number;
  featured?: boolean;
}

interface UseArticleReturn {
  article: Article | null;
  loading: boolean;
  error: string | null;
}

// 모든 아티클 가져오기 (limit 옵션 추가)
export const useArticles = (options: UseArticlesOptions = {}): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // 실제 환경에서는 여기서 API 호출
      let data = options.featured ? getFeaturedArticles(options.limit) : getAllArticles();

      // featured가 아닌 경우에만 limit 적용 (featured는 이미 내부에서 처리)
      if (!options.featured && options.limit && options.limit > 0) {
        data = data.slice(0, options.limit);
      }

      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load articles');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  }, [options.limit, options.featured]);

  return { articles, loading, error };
};

// 추천 아티클만 가져오기
export const useFeaturedArticles = (): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const data = getFeaturedArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load featured articles');
      console.error('Error loading featured articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { articles, loading, error };
};

// 특정 슬러그의 아티클 가져오기
export const useArticle = (slug: string): UseArticleReturn => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    try {
      setLoading(true);
      // 실제 환경에서는 여기서 API 호출
      const data = getArticleBySlug(slug);
      setArticle(data);
      setError(data ? null : 'Article not found');
    } catch (err) {
      setError('Failed to load article');
      console.error('Error loading article:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return { article, loading, error };
};

// 태그별 아티클 가져오기
export const useArticlesByTag = (tag: string): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tag) return;

    try {
      setLoading(true);
      const data = getArticlesByTag(tag);
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load articles by tag');
      console.error('Error loading articles by tag:', err);
    } finally {
      setLoading(false);
    }
  }, [tag]);

  return { articles, loading, error };
};

// 검색 기능
export const useSearchArticles = (query: string): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setArticles(getAllArticles());
      return;
    }

    try {
      setLoading(true);
      const data = searchArticles(query);
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to search articles');
      console.error('Error searching articles:', err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return { articles, loading, error };
};

// 이 파일은 더 이상 필요하지 않습니다.
// hooks/useArticles.ts가 API를 통해 데이터를 가져오므로
// 이 파일을 삭제하거나 아래와 같이 수정하세요:

// 서버 컴포넌트에서만 사용할 경우
import 'server-only';
import { getAllArticles } from '@/lib/markdown';

export const getArticles = () => {
  return getAllArticles();
};

export const getFeaturedArticles = () => {
  return getAllArticles().filter((article) => article.featured);
};

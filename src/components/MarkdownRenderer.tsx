'use client';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 간단한 마크다운 파싱 (실제로는 markdown-it, remark 등 라이브러리 사용 권장)
  const parseMarkdown = (text: string) => {
    return (
      text
        // 헤딩
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-gray-900">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-900">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-gray-900">$1</h1>')

        // 볼드
        .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>')

        // 이탤릭
        .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')

        // 코드 블록
        .replace(
          /```([\s\S]*?)```/gim,
          '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$1</code></pre>',
        )

        // 인라인 코드
        .replace(/`([^`]*)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')

        // 링크
        .replace(
          /\[([^\]]*)\]\(([^\)]*)\)/gim,
          '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>',
        )

        // 리스트
        .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
        .replace(/(<li[\s\S]*?<\/li>)/gim, '<ul class="list-disc list-inside my-4 space-y-2">$1</ul>')
        // 번호 리스트
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')

        // 단락
        .replace(/\n\n/gim, '</p><p class="mb-4 leading-relaxed text-gray-700">')
        .replace(/^(.*)$/gim, '<p class="mb-4 leading-relaxed text-gray-700">$1</p>')
    );
  };

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{
        __html: parseMarkdown(content),
      }}
    />
  );
}

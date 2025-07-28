'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div
      className="prose prose-lg max-w-none 
        prose-headings:text-gray-900 
        prose-p:text-gray-700 
        prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline 
        prose-strong:text-gray-900 
        prose-code:text-orange-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded 
        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50
        prose-ul:text-gray-700 prose-ol:text-gray-700
        prose-li:text-gray-700"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MarkdownRenderer;

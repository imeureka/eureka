import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // Next.js 15+에서는 params를 await해야 함
    const { slug } = await params;

    // URL에서 언어 파라미터 가져오기 (기본값: ko)
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ko';

    console.log('🔍 Looking for article:', slug, 'language:', lang);

    // src 폴더 구조에 맞게 파일 경로 수정
    const possiblePaths = [
      path.join(process.cwd(), 'src/data/articles', `${slug}.${lang}.md`),
      path.join(process.cwd(), 'src/data/articles', `${slug}-${lang}.md`),
      path.join(process.cwd(), 'data/articles', `${slug}.${lang}.md`), // 백업용
      path.join(process.cwd(), 'data/articles', `${slug}-${lang}.md`), // 백업용
    ];

    console.log('🔍 Trying paths:', possiblePaths);

    // 각 경로를 순서대로 시도
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        console.log('✅ Found file at:', filePath);

        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // frontmatter 파싱
        const { data: frontmatter, content } = matter(fileContent);

        console.log('📋 Frontmatter:', frontmatter);
        console.log('📄 Content preview:', content.substring(0, 100) + '...');

        // 메타데이터와 콘텐츠를 분리해서 반환
        return NextResponse.json({
          article: {
            slug,
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description || '',
            thumbnail: frontmatter.thumbnail || '',
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            tags: frontmatter.tags || [],
            readTime: frontmatter.readTime || 5,
            featured: frontmatter.featured || false,
          },
          content: content.trim(), // frontmatter가 제거된 순수 마크다운 콘텐츠
        });
      }
    }

    // 파일을 찾지 못한 경우
    console.log('❌ File not found for slug:', slug, 'language:', lang);

    // 디버깅을 위해 실제 존재하는 파일들 확인
    const articlesDir = path.join(process.cwd(), 'src/data/articles');
    let existingFiles: string[] = [];

    try {
      if (fs.existsSync(articlesDir)) {
        existingFiles = fs.readdirSync(articlesDir);
        console.log('📂 Files in src/data/articles:', existingFiles);
      }
    } catch (dirError) {
      console.error('❌ Error reading src/data/articles directory:', dirError);
    }

    return NextResponse.json(
      {
        error: 'File not found',
        slug,
        lang,
        searchedPaths: possiblePaths,
        existingFiles,
        articlesDirectory: articlesDir,
      },
      { status: 404 },
    );
  } catch (error) {
    console.error('💥 API Error:', error);
    return NextResponse.json(
      {
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

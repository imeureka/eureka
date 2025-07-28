/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화 및 외부 도메인 허용
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 외부 이미지 도메인 허용 (Next.js 13+ 권장 방식)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // 필요한 다른 이미지 도메인들 추가
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 압축 활성화
  compress: true,

  // 정적 파일 캐싱
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

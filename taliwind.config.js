/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src 폴더 사용 시
  ],
  darkMode: 'class', // 'class' 전략 사용
  theme: {
    extend: {
      // 기존 설정들...
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.7',
            h1: {
              fontSize: '2.25rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              marginTop: '2rem',
              color: '#111827',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: '1.5rem',
              color: '#111827',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '0.5rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
              marginTop: '1.25rem',
              color: '#111827',
            },
            p: {
              marginBottom: '1rem',
              color: '#4b5563',
            },
            a: {
              color: '#f97316',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#ea580c',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#111827',
              color: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              code: {
                color: '#f9fafb',
                backgroundColor: 'transparent',
                padding: '0',
              },
            },
            blockquote: {
              borderLeftColor: '#f97316',
              backgroundColor: '#fff7ed',
              borderLeftWidth: '4px',
              padding: '0.5rem 1rem',
              color: '#9a3412',
              fontStyle: 'normal',
            },
            ul: {
              color: '#4b5563',
            },
            ol: {
              color: '#4b5563',
            },
            li: {
              color: '#4b5563',
              marginBottom: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

// 필요한 ESLint 플러그인 임포트
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

// Prettier 설정 (가장 마지막에 와야 함)
import prettierConfig from 'eslint-config-prettier';

// Next.js 기본 ESLint 설정 (create-next-app에서 제공)
import nextJs from './next.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname, // 레거시 설정에서 사용되는 플러그인 해결을 위해 중요
});

export default [
  // 전역 무시 패턴
  {
    ignores: ['node_modules/', '*.config.*'],
  },

  // 기본 ESLint 권장 규칙
  pluginJs.configs.recommended,

  // TypeScript ESLint 권장 규칙
  ...tseslint.configs.recommended,

  // TypeScript 파일에 대한 설정 (파서 옵션 및 전역 변수 포함)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser, // TypeScript 파일에 TypeScript 파서 사용
      parserOptions: {
        project: './tsconfig.json', // 타입 인식 린팅을 위한 tsconfig.json 경로
        createDefaultProgram: true, // 원본 설정에 따라 유지 (성능 영향 고려)
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest', // 프로젝트에 맞는 ECMAScript 버전
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript 특정 커스텀 규칙
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // 환경 전역 변수 (브라우저, Node.js, ES6) - 모든 파일에 적용
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        es6: true,
      },
    },
  },

  // React 특정 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': fixupConfigAsPlugin(pluginReactHooks), // react-hooks 플러그인 호환성 설정
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    rules: {
      // 커스텀 React 규칙
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unused-prop-types': 'off',
      'react/jsx-no-useless-fragment': 'off',
    },
  },

  // AirBnB 설정 (FlatCompat 사용)
  ...compat.extends('airbnb', 'airbnb/hooks'),
  ...compat.extends('airbnb-typescript'), // airbnb-typescript는 tsconfig.json 프로젝트 설정을 필요로 함

  // Next.js 특정 설정 (create-next-app에서 제공하는 next.js 플랫 설정)
  nextJs,

  // Import 플러그인 설정
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        },
        typescript: {
          project: './tsconfig.json', // tsconfig.json에서 임포트 별칭 해결
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      // 커스텀 임포트 규칙
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: 'next',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/**', // Next.js 기본 별칭에 맞춰 `@/**`로 변경
              group: 'external',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },

  // JSX A11y 플러그인 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      // 커스텀 jsx-a11y 규칙
      'jsx-a11y/aria-role': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },

  // Prettier 설정 (모든 서식 규칙을 비활성화하기 위해 가장 마지막에 위치해야 함)
  prettierConfig,
];

/**
 * react.ts - React 관련 유틸리티 타입들
 * As: 다형성 컴포넌트에서 사용할 엘리먼트 타입
 * ReactRef: React의 다양한 ref 타입들을 통합
 * StrictPropsWithChildren: children이 필수인 props 타입
 */
import { ElementType, RefObject, MutableRefObject, Ref, ReactNode } from 'react';

export type As<Props = any> = ElementType<Props>;

export type ReactRef<T> = RefObject<T> | MutableRefObject<T> | Ref<T>;

export type StrictPropsWithChildren<P = unknown> = P & { children: ReactNode };

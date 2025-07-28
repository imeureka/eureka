---
title: 'TypeScript 고급 활용법'
description: 'TypeScript의 고급 기능들을 실무에 적용하는 방법을 알아보세요.'
thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop'
date: '2024-01-20'
tags: ['TypeScript', 'JavaScript', 'Development']
readTime: 12
featured: true
---

# TypeScript 고급 활용법

TypeScript는 단순히 타입을 추가하는 것 이상의 강력한 기능들을 제공합니다. 실무에서 활용할 수 있는 고급 패턴들을 알아보겠습니다.

## 유틸리티 타입 활용

TypeScript는 다양한 내장 유틸리티 타입을 제공합니다.

### Partial과 Required

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 모든 필드가 선택적
type PartialUser = Partial<User>;

// 모든 필드가 필수
type RequiredUser = Required<PartialUser>;

// 특정 필드만 선택적으로 만들기
type UserUpdate = Partial<Pick<User, 'name' | 'email' | 'age'>> & {
  id: number; // id는 항상 필수
};
```

### Pick과 Omit

```typescript
// 특정 필드만 선택
type UserSummary = Pick<User, 'id' | 'name'>;

// 특정 필드 제외
type UserWithoutId = Omit<User, 'id'>;

// 조합 활용
type CreateUserRequest = Omit<User, 'id'> & {
  password: string;
};
```

## 조건부 타입 (Conditional Types)

조건부 타입을 사용하면 더 유연한 타입 시스템을 구축할 수 있습니다.

```typescript
// 기본 조건부 타입
type ApiResponse<T> = T extends string ? { message: T } : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { data: number }

// 더 복잡한 예제
type NonNullable<T> = T extends null | undefined ? never : T;

type SafeUser = NonNullable<User | null>; // User
```

## 템플릿 리터럴 타입

문자열 리터럴을 조합하여 타입을 생성할 수 있습니다.

```typescript
type EventName = 'click' | 'focus' | 'blur';
type ElementType = 'button' | 'input' | 'div';

// 템플릿 리터럴로 조합
type EventHandler = `on${Capitalize<EventName>}`;
// 'onClick' | 'onFocus' | 'onBlur'

type ElementEvent = `${ElementType}:${EventName}`;
// 'button:click' | 'button:focus' | ... 등 모든 조합

// 실용적인 예제: CSS 속성
type CSSProperties = 'margin' | 'padding';
type CSSDirections = 'top' | 'right' | 'bottom' | 'left';

type CSSProperty = CSSProperties | `${CSSProperties}-${CSSDirections}`;
// 'margin' | 'padding' | 'margin-top' | 'margin-right' | ...
```

## 고급 매핑 타입

매핑 타입을 사용하여 기존 타입을 변형할 수 있습니다.

```typescript
// 모든 속성을 readonly로 만들기
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// 모든 속성에 접두사 추가
type PrefixedUser = {
  [K in keyof User as `user_${string & K}`]: User[K];
};
// { user_id: number; user_name: string; ... }

// 조건부 매핑
type StringProperties<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
};

type UserStrings = StringProperties<User>;
// { name: string; email: string; }
```

## 타입 가드와 타입 추론

런타임에서 타입을 안전하게 확인하는 방법들입니다.

```typescript
// 사용자 정의 타입 가드
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as any).id === 'number' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).email === 'string'
  );
}

// 사용 예제
function processUserData(data: unknown) {
  if (isUser(data)) {
    // 이제 data는 User 타입으로 추론됨
    console.log(data.name); // 타입 안전
  }
}
```

## 고급 제네릭 패턴

```typescript
// 제네릭 제약 조건
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// keyof 연산자 활용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
const userName = getProperty(user, 'name'); // string 타입으로 추론
```

## 실무 활용 예제: API 응답 타입

```typescript
// 기본 API 응답 구조
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// API 엔드포인트별 응답 타입
type GetUsersResponse = ApiResponse<User[]>;
type GetUserResponse = ApiResponse<User>;
type CreateUserResponse = ApiResponse<{ id: number }>;

// API 클라이언트 타입
interface ApiClient {
  get<T>(url: string): Promise<ApiResponse<T>>;
  post<T, U>(url: string, data: T): Promise<ApiResponse<U>>;
  put<T, U>(url: string, data: T): Promise<ApiResponse<U>>;
  delete(url: string): Promise<ApiResponse<void>>;
}

// 사용 예제
async function fetchUser(id: number): Promise<User | null> {
  const response = await apiClient.get<User>(`/users/${id}`);

  if (response.success && response.data) {
    return response.data;
  }

  return null;
}
```

## 마무리

TypeScript의 고급 기능들을 활용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다. 단계적으로 적용해보면서 팀의 개발 생산성을 높여보세요!

> **팁**: 복잡한 타입보다는 읽기 쉽고 이해하기 쉬운 타입을 우선으로 하세요. 타입의 복잡성이 코드의 가독성을 해치지 않도록 주의하는 것이 중요합니다.

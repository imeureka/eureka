---
title: 'React Hooks 시작하기'
description: 'React Hooks의 기본 개념과 useState 사용법을 알아보세요.'
thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
date: '2024-01-15'
tags: ['React', 'JavaScript', 'Frontend']
readTime: 3
featured: true
---

# React Hooks 시작하기

React Hooks는 함수형 컴포넌트에서 상태와 생명주기를 관리할 수 있게 해주는 기능입니다.

## useState 기본 사용법

가장 많이 사용되는 `useState` 훅을 살펴보겠습니다.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

## 핵심 포인트

- `useState`는 현재 상태 값과 상태를 업데이트하는 함수를 반환합니다
- 초기값을 파라미터로 전달할 수 있습니다
- 상태가 변경되면 컴포넌트가 다시 렌더링됩니다

## 마무리

React Hooks를 사용하면 클래스 컴포넌트 없이도 상태 관리가 가능합니다. 간단하고 직관적인 API로 React 개발이 더욱 즐거워집니다!

> **팁**: useState를 여러 번 사용해서 각각의 상태를 독립적으로 관리할 수 있습니다.

---
title: 'Getting Started with React Hooks'
description: 'Learn the basic concepts of React Hooks and how to use useState.'
thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
date: '2024-01-15'
tags: ['React', 'JavaScript', 'Frontend']
readTime: 3
featured: true
---

# Getting Started with React Hooks

React Hooks allow you to manage state and lifecycle in functional components.

## Basic useState Usage

Let's look at the most commonly used `useState` hook.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Key Points

- `useState` returns the current state value and a function to update the state
- You can pass an initial value as a parameter
- When state changes, the component re-renders

## Conclusion

With React Hooks, you can manage state without class components. The simple and intuitive API makes React development more enjoyable!

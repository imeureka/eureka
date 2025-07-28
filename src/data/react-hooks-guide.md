# Complete Guide to React Hooks

React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore everything from basic hooks to creating your own custom hooks.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have become the preferred way to write React components.

### useState Hook

The **useState** hook is the most commonly used hook. It allows you to add state to functional components.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### useEffect Hook

The **useEffect** hook lets you perform side effects in function components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## Custom Hooks

One of the most powerful features of hooks is the ability to create your own custom hooks. Custom hooks are JavaScript functions whose names start with "use" and that may call other hooks.

### Creating a Custom Hook

```javascript
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

### Using the Custom Hook

```javascript
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Best Practices

- Only call hooks at the top level of your React function
- Only call hooks from React functions
- Use the ESLint plugin for hooks to enforce these rules
- Extract stateful logic into custom hooks when it becomes complex

## Conclusion

React Hooks provide a more direct API to the React concepts you already know. They offer a powerful way to reuse stateful logic between components and make your code more readable and maintainable.

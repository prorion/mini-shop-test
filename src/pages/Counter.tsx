import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span data-testid="count">
        {count}
      </span>
      <button onClick={() =>
        setCount(c => c + 1)}>+</button>
      <button onClick={() =>
        setCount(c => c - 1)}>-</button>
      <button onClick={() =>
        setCount(0)}>리셋</button>
    </div>
  );
}
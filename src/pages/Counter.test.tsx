import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  test('처음엔 0', () => {
    render(<Counter />);
    expect(
      screen.getByTestId('count')
    ).toHaveTextContent('0');
  });

  test('+ 클릭하면 1 증가', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(
      screen.getByRole('button', { name: '+' })
    );

    expect(
      screen.getByTestId('count')
    ).toHaveTextContent('1');
  });
});

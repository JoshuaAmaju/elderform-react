import { fireEvent, render, waitFor } from '@testing-library/react';
import { create } from 'elderform';
import * as React from 'react';
import { useForm } from '../src';

(global as any).__DEV__ = false;

const form = create({
  onSubmit: () => '123',
  initialValues: { name: 'Joe' },
});

const Component = () => {
  const state = useForm(form);

  return (
    <div>
      <p>{state.state}</p>

      <code data-testid="output">{state.data}</code>

      <input
        readOnly
        type="text"
        data-testid="input"
        value={state.values.name}
      />

      <button onClick={() => state.submit()}>submit</button>
    </div>
  );
};

describe('useForm', () => {
  it('should create form from service', async () => {
    const { getByRole, getByText, getByTestId } = render(<Component />);

    const input = getByTestId('input');
    const button = getByRole('button');

    expect((input as any).value).toBe('Joe');

    fireEvent.click(button);

    await waitFor(() => getByText('submitted'));

    expect(getByTestId('output').textContent).toBe('123');
  });
});

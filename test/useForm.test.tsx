import { fireEvent, render, waitFor } from '@testing-library/react';
import { object, createForm } from 'elderform';
import * as React from 'react';
import * as z from 'zod';
import { useForm } from '../src';

(global as any).__DEV__ = false;

const schema = object({
  name: (v: string) => z.string().parse(v),
});

const form = createForm({
  schema,
  onSubmit: () => '123',
  initialValues: { name: 'Joe' },
});

const Component = () => {
  const [ctx, { name }] = useForm(form);

  return (
    <div>
      <p>{ctx.state}</p>

      <code data-testid="output">{ctx.data}</code>

      <input
        readOnly
        type="text"
        data-testid="input"
        value={name.value as any}
      />

      <button onClick={() => ctx.submit()}>submit</button>
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

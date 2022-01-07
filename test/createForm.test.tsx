import { fireEvent, render, waitFor } from '@testing-library/react';
import { object } from 'elderform';
import * as React from 'react';
import * as z from 'zod';
import { createForm } from '../src';

const schema = object({
  name: (v: string) => z.string().parse(v),
});

const Component = () => {
  const [ctx, { name }] = createForm({
    schema,
    onSubmit: () => '123',
    initialValues: { name: 'Joe' },
  });

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

describe('createForm', () => {
  it('should create form', async () => {
    const { getByRole, getByText, getByTestId } = render(<Component />);

    const input = getByTestId('input');
    const button = getByRole('button');

    expect((input as any).value).toBe('Joe');

    fireEvent.click(button);

    await waitFor(() => getByText('submitted'));

    expect(getByTestId('output').textContent).toBe('123');
  });
});

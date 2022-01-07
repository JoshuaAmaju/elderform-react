import { Elder, useElder } from '../src';
import { object } from 'elderform';
import * as z from 'zod';
import { render, waitFor, fireEvent } from '@testing-library/react';

(global as any).__DEV__ = false;

const schema = object({
  name: (v: string) => z.string().parse(v),
});

const Component = () => {
  const [ctx, { name }] = useElder();

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

describe('<Elder>', () => {
  it('should create form and pass down props', async () => {
    const { getByRole, getByText, getByTestId } = render(
      <Elder
        {...{
          schema,
          onSubmit: async () => '123',
          initialValues: { name: 'Joe' },
        }}
      >
        <Component />
      </Elder>
    );

    const input = getByTestId('input');
    const button = getByRole('button');

    expect((input as any).value).toBe('Joe');

    fireEvent.click(button);

    await waitFor(() => getByText('submitted'));

    expect(getByTestId('output').textContent).toBe('123');
  });
});

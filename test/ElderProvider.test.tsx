import { ElderProvider, useElder } from '../src';
import { object, createForm } from 'elderform';
import * as z from 'zod';
import { render, waitFor, fireEvent } from '@testing-library/react';

(global as any).__DEV__ = false;

const schema = object({
  name: (v: string) => z.string().parse(v),
});

const form = createForm({
  schema,
  onSubmit: async () => '123',
  initialValues: { name: 'Joe' },
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

describe('<ElderProvider>', () => {
  it('re-use exiting form and pass down props', async () => {
    const { getByRole, getByText, getByTestId } = render(
      <ElderProvider {...form}>
        <Component />
      </ElderProvider>
    );

    const input = getByTestId('input');
    const button = getByRole('button');

    expect((input as any).value).toBe('Joe');

    fireEvent.click(button);

    await waitFor(() => getByText('submitted'));

    expect(getByTestId('output').textContent).toBe('123');
  });
});

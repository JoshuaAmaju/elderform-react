import { render, waitFor } from '@testing-library/react';
import { object } from 'elderform';
import * as z from 'zod';
import { Elder, Field } from '../src';

(global as any).__DEV__ = false;

const schema = object({
  name: (v: string) => z.string().parse(v),
});

const Component = () => {
  return (
    <Field name="name">
      {({ value }) => (
        <input readOnly type="text" data-testid="input" value={value as any} />
      )}
    </Field>
  );
};

describe('<Field>', () => {
  it('should render <input />', async () => {
    const { getByTestId } = render(
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

    await waitFor(() => getByTestId('input'));

    const input = getByTestId('input');

    expect((input as any).value).toBe('Joe');
  });
});

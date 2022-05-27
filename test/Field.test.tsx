import { render, waitFor } from '@testing-library/react';
import * as z from 'zod';
import { Field, useForm, Form } from '../src';
import { create } from 'elderform';

(global as any).__DEV__ = false;

const string = (v: string) => z.string().parse(v);

const form = create<{ name: string }>({
  onSubmit: () => {},
  initialValues: { name: 'Joe' },
});

const Component = () => {
  return (
    <Field name="name" validate={string}>
      {({ value }) => (
        <input readOnly type="text" data-testid="input" value={value as any} />
      )}
    </Field>
  );
};

describe('<Field>', () => {
  it('should render <input />', async () => {
    const App = () => {
      const state = useForm(form);

      return (
        <Form state={state}>
          <Component />
        </Form>
      );
    };

    const { getByTestId } = render(<App />);

    await waitFor(() => getByTestId('input'));

    const input = getByTestId('input');

    expect((input as any).value).toBe('Joe');
  });
});

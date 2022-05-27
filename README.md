# @elderform/react

> Elderform tools for react

[![NPM](https://img.shields.io/npm/v/@elderform/react.svg)](https://www.npmjs.com/package/@elderform/react)

## Install

```bash
pnpm add xstate @xstate/react elderform @elderform/react
```

- [API](#api)
- [Examples](#examples)

```tsx
import { create } from 'elderform';
import { Form, Field } from '@elderform/react';

const form = create({
  onSubmit: () => {},
});

const App = () => {
  const state = useForm(form);

  return (
    <Form state={state}>
      <Field name="name" initialValue="" validate={(v) => {}}>
        {(name) => {
          return (
            <div>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name.value} />
              </div>

              {name.error && <p>{name.error}</p>}
            </div>
          );
        }}
      </Field>
    </Form>
  );
};
```

## API

`useForm(form)`

A React Hook to re-use an existing form

> good for sharing a single form across components

### Returns

- `state` - A combined object that contains the current overall [state](<(https://github.com/JoshuaAmaju/elderform#currentstate)>) of the form.

---

`<Form>`

A component that consumes and provides the current form state.

```tsx
import { Form } from '@elderform/react';

const App = () => {
  return <Form state={{}}>{(state) => <></>}</Form>;
};
```

### Props

- `state` - The state returned from creating the form.

`<Field>`

A component for spawning and accessing the state of a field.

### Props

- `name` (string) - Name of the field.
- `initialValue` (any) - The initial value of the field.
- `onValidate` ((value, values) => any) - A function that performs validation on the field.

```tsx
import { Field } from '@elderform/react';

const App = () => {
  return (
    <Form state={{}}>
      <Field name="name" initialValue="" validate={() => {}}>
        {(state) => <></>}
      </Field>

      <Field name="email" initialValue="" validate={() => {}}>
        {(state) => <></>}
      </Field>
    </Form>
  );
};
```

`useElder()`

A hook for consuming the context for any form using `<Form>`

```tsx
import { useElder } from '@elderform/react';

const Home = () => {
  const state = useElder();
  return <></>;
};

const App = () => {
  return (
    <Form>
      <Component>
        <Home />
      </Component>
    </Form>
  );
};
```

`useField(name)`

A hook for getting the current state of a given field.

- `name` (string) - Name of the field as specified in the schema

### Returns

[state](https://github.com/JoshuaAmaju/elderform#field-state) for the given field

```tsx
import { useField } from '@elderform/react';

const TextField = ({ name }: { name: string }) => {
  const { state, value } = useField(name);
  return <></>;
};

const Home = () => {
  return (
    <>
      <TextField name="name" />
      <TextField name="email" />
    </>
  );
};

const App = () => {
  return (
    <Form>
      <Component>
        <Home />
      </Component>
    </Form>
  );
};
```

## Examples

- [Dynamic form](https://codesandbox.io/s/elderform-react-dynamic-form-2bmmo?file=/src/App.tsx)
<!-- - [Dynamic form with validation]() (coming soon) -->

## License

MIT © [JoshuaAmaju](https://github.com/JoshuaAmaju)

# @elderform/react

> Elderform tools for react

[![NPM](https://img.shields.io/npm/v/@elderform/react.svg)](https://www.npmjs.com/package/@elderform/react)

## Install

```bash
pnpm add xstate @xstate/react elderform @elderform/react
```

- [API](#api)
- [Examples](#examples)

## API

---

`createForm(`[config](https://github.com/JoshuaAmaju/elderform#config)`)`

A React Hook to create a form that lasts for the lifetime of the component

```tsx
import { createForm } from '@elderform/react';

const App = () => {
  const [state, handlers] = createForm({
    schema,
    onSubmit: () => {},
  });

  return <></>;
};
```

`useForm(form)`

A React Hook to re-use an existing form

> good for sharing a single form across components

```tsx
import { createForm } from 'elderform';
import { useForm } from '@elderform/react';

const form = createForm({
  schema,
  onSubmit: () => {},
});

const App = () => {
  const [state, handlers] = useForm(form);
  return <></>;
};
```

### Returns

Both hooks return a tuple of `[state, handlers]`

- `state` - A combined object that contains the current overall [state](<(https://github.com/JoshuaAmaju/elderform#currentstate)>) of the form and the [form handlers](https://github.com/JoshuaAmaju/elderform#returns)

- `handlers` - An object containing handlers for each field present in the schema ([here](https://github.com/JoshuaAmaju/elderform#handlers))

---

`<Elder>`

A Context provider that creates a new form and propagates the form down the component tree

```tsx
import { Elder } from '@elderform/react';

const App = () => {
  return (
    <Elder schema={schema} initialValues={{ name: 'Ade' }} onSubmit={() => {}}>
      <Component />
    </Elder>
  );
};
```

`<ElderProvider>`

A Context provider that subscribes to the state of an existing form and propagates the form down the component tree

```tsx
import { createForm } from 'elderform';
import { ElderProvider } from '@elderform/react';

const form = createForm({
  schema,
  onSubmit: () => {},
});

const App = () => {
  return (
    <ElderProvider {...form}>
      <Component />
    </ElderProvider>
  );
};
```

`<Form>`

A component that uses a render props pattern for accessing and rendering form state.

```tsx
import { Form } from '@elderform/react';

const Home = () => {
  return (
    <>
      <Form>{(state, handlers) => <></>}</Form>
    </>
  );
};

const App = () => {
  return (
    <ElderProvider {...form}>
      <Component>
        <Home />
      </Component>
    </ElderProvider>
  );
};
```

`<Field>`

A component that uses a render props pattern for accessing the state of a single field as specified in schema.

- `name` (string) - Name of the field as specified in the schema

```tsx
import { Field } from '@elderform/react';

const Home = () => {
  return (
    <>
      <Field name="name">{({ state, value }) => <></>}</Field>
      <Field name="email">{({ state, value }) => <></>}</Field>
    </>
  );
};

const App = () => {
  return (
    <ElderProvider {...form}>
      <Component>
        <Home />
      </Component>
    </ElderProvider>
  );
};
```

`useElder()`

A hook for consuming the context for any form using `<Elder>` or `<ElderProvider>`

```tsx
import { useElder } from '@elderform/react';

const Home = () => {
  const [state, handlers] = useElder();
  return <></>;
};

const App = () => {
  return (
    <ElderProvider {...form}>
      <Component>
        <Home />
      </Component>
    </ElderProvider>
  );
};
```

`useField(name)`

- `name` (string) - Name of the field as specified in the schema

### Returns

[Handlers](https://github.com/JoshuaAmaju/elderform#handlers) for the given field

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
    <ElderProvider {...form}>
      <Component>
        <Home />
      </Component>
    </ElderProvider>
  );
};
```

## Examples

- [Dynamic form]()

## License

MIT © [JoshuaAmaju](https://github.com/JoshuaAmaju)

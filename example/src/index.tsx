import React, { useEffect } from 'react';
import { create } from 'elderform';
import * as z from 'zod';
import { Field, Form, useForm } from '../../src';

const string = (v: string) => z.string().parseAsync(v);

const email = (v: string) => z.string().email().parseAsync(v);

const form = create({
  onSubmit() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
  },
});

const App = () => {
  const state = useForm(form);

  console.log(state.values);

  useEffect(() => {
    if (state.submitted) {
      alert(JSON.stringify(state.values));
    }
  }, [state.values, state.submitted]);

  return (
    <Form state={state}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          state.submit();
        }}
      >
        <Field name="name" initialValue="" validate={string}>
          {(name) => (
            <div>
              <div>
                <label htmlFor="name">Name</label>

                <input
                  required
                  type="text"
                  name="name"
                  value={name.value}
                  onBlur={() => name.validate()}
                  onChange={(e) => name.set(e.target.value)}
                />

                <p>{name.state}</p>
              </div>

              {name.error && <p>{JSON.stringify(name.error)}</p>}
            </div>
          )}
        </Field>

        <Field name="email" initialValue="" validate={email}>
          {(email) => (
            console.log('re-rendered', email.value),
            (
              <div>
                <div>
                  <label htmlFor="email">Email</label>

                  <input
                    required
                    type="email"
                    name="email"
                    value={email.value}
                    onBlur={() => email.validate()}
                    onChange={(e) => email.set(e.target.value)}
                  />

                  <p>{email.state}</p>
                </div>

                {email.error && <p>{JSON.stringify(email.error)}</p>}
              </div>
            )
          )}
        </Field>

        <button disabled={state.submitted}>
          {state.isSubmitting ? 'submitting' : 'submit'}
        </button>
      </form>
    </Form>
  );
};

export default App;

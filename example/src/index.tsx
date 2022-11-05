import { create } from '../../../core/src';
import { nanoid } from 'nanoid';
import React from 'react';
import * as z from 'zod';
import * as y from 'yup';
import { get } from 'object-path';
import { Field, Form, useForm } from '../../src';

const string = (v: string) => z.string().parseAsync(v);

const email = (v: string) => y.string().email().required().validate(v);

const form = create({
  initialValues: {
    friends: [],
    // friends: {
    //   // [nanoid()]: {
    //   //   name: '',
    //   // },
    // },
  },
  // initialErrors: {
  //   friends: {}
  // },
  onSubmit() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
  },
});

const _App = () => {
  const state = useForm(form);

  const { friends } = state.values;

  // console.log(state.actors, state.values, state.errors);

  return (
    <Form state={state}>
      <div>
        {friends.map((id, i) => {
          // const value = friends[id];
          const name = `friends.${i}.name`;
          // const error = state.errors.friends?.[id];

          console.log(state.errors.friends?.[i]);

          return (
            <div key={i}>
              <label htmlFor={name}>Name</label>

              <Field name={name} onValidate={email}>
                {(f) => {
                  return (
                    <>
                      <input
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                      />

                      <button
                        onClick={() => {
                          // state.kill(name);
                          // delete friends[id];
                          // console.log(i, friends.splice(i, 1));
                          // friends.splice(i, 1);

                          friends.splice(i, 1);
                          state.set('friends', friends);
                        }}
                      >
                        remove
                      </button>

                      <button onClick={() => f.validate()}>validate</button>

                      {f.error && <p>{JSON.stringify(f.error)}</p>}
                    </>
                  );
                }}
              </Field>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => {
            // state.spawn(`friends.${nanoid()}.name`, '', email);

            state.set('friends', [...friends, { name: '' }] as any);
          }}
        >
          Add
        </button>
      </div>
    </Form>
  );

  // return (
  //   <div>
  //     {Object.keys(friends).map((id) => {
  //       const value = friends[id];
  //       const name = `friends.${id}.name`;
  //       const error = state.errors.friends?.[id];

  //       return (
  //         <div key={id}>
  //           <label htmlFor={name}>Name</label>

  //           <input
  //             onChange={(e) => {
  //               state.set('friends', {
  //                 ...friends,
  //                 [id]: { name: e.target.value },
  //               });
  //             }}
  //           />

  //           <button
  //             onClick={() => {
  //               // state.kill(name);
  //               delete friends[id];
  //               state.set('friends', { ...friends });
  //             }}
  //           >
  //             remove
  //           </button>

  //           <button onClick={() => state.validate(name)}>validate</button>

  //           {error?.name && <p>{JSON.stringify(error.name)}</p>}
  //         </div>
  //       );
  //     })}

  //     <button
  //       type="button"
  //       onClick={() => {
  //         // state.spawn(`friends.${nanoid()}.name`, '', email);

  //         state.set('friends', { ...friends, [nanoid()]: '' });
  //       }}
  //     >
  //       Add
  //     </button>
  //   </div>
  // );
};

const App = () => {
  const state = useForm(form);

  const { friends } = state.values;

  // console.log(friends);

  console.log(state.values, state.errors);

  // console.log(state.values);

  // useEffect(() => {
  //   if (state.submitted) {
  //     alert(JSON.stringify(state.values));
  //   }
  // }, [state.values, state.submitted]);

  // console.log(get(state.actors, 'friends.0.name'));

  return (
    <Form state={state}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          state.submit();
        }}
      >
        {/* <Field name="name" initialValue="" onValidate={string}>
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

        <Field name="email" initialValue="" onValidate={email}>
          {(email) => (
            // console.log('re-rendered', email.value),
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
          )}
        </Field> */}

        <div>
          <ul>
            {Object.keys(friends).map((id, i) => {
              const value = friends[id];
              let name = `friends.${id}.name`;

              // console.log(get(state.errors, name), { ...state.errors }, name);

              return (
                <li key={id}>
                  <label htmlFor={name}>Friend name</label>

                  <Field name={name} onValidate={email}>
                    {(f) => {
                      console.log(f.state, name, f.error);

                      return (
                        <div>
                          <input
                            type="text"
                            name={name}
                            value={value.name}
                            onChange={(e) => {
                              // state.set('friends', {
                              //   ...friends,
                              //   [id]: e.target.value,
                              // });

                              f.set(e.target.value);
                            }}
                          />

                          <button type="button" onClick={() => f.validate()}>
                            validate
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              // friends.splice(i, 1);

                              delete friends[id];

                              state.kill(name);

                              state.set('friends', friends);

                              // const newFriends = friends.filter((f) => f.id !== fr.id);

                              // console.log('newFriends', newFriends);

                              // console.log(`friends.${i}`);

                              // state.kill(`friends.${i}`);
                            }}
                          >
                            remove
                          </button>

                          {!!f.error && <p>{JSON.stringify(f.error)}</p>}
                        </div>
                      );
                    }}
                  </Field>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => {
              state.set('friends', { ...friends, [nanoid()]: { name: '' } });

              // state.spawn(`friends.${friends.length}`, { name: '' }, email);
            }}
          >
            Add
          </button>
        </div>

        <button disabled={state.submitted}>
          {state.isSubmitting ? 'submitting' : 'submit'}
        </button>
      </form>
    </Form>
  );
};

export default _App;

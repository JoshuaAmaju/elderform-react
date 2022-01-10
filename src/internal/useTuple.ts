import type {
  Context,
  Events,
  FormState,
  Handler,
  Handlers,
  States,
} from 'elderform';
import { EventTypes } from 'elderform';
import { useMemo } from 'react';
import { Sender, State } from 'xstate';
import { TupleReturn } from '../types';

declare var __DEV__: boolean;

export type Tuple<T, D, E, Es> = [
  State<Context<T, D, E, Es>, Events<T, D, E, Es>, any, States<T, D, E>>,
  Sender<Events<T, D, E, Es>>
];

export const useTuple = <T = any, D = any, E = any, Es = any>([
  current,
  send,
]: Tuple<T, D, E, Es>): TupleReturn<T, D, E, Es> => {
  const { context } = current;

  const {
    data,
    error,
    actors,
    schema,
    errors,
    states,
    values,
    failureCount,
    dataUpdatedAt,
    errorUpdatedAt,
  } = context;

  const isError = current.matches('error');
  const submitted = current.matches('submitted');
  const isSubmitting = current.matches('submitting');
  const isValidating = current.matches('validating');
  const isIdle = current.matches('idle') || current.matches('waitingInit');

  const submittedWithoutError = submitted && !error;
  const submittedWithError = isError && !!error;
  const validatedWithErrors =
    isIdle && current.history?.matches('validating') && errors.size > 0;

  const state: FormState = current.matches('waitingInit')
    ? 'idle'
    : (current.value as any);

  const handlers = useMemo<Handlers<T, Es>>(() => {
    if (__DEV__) {
      if (!schema || typeof schema === 'boolean') {
        console.warn('Cannot generate handlers without schema defined');
      }
    }

    const entries = Object.keys(actors).map((k) => {
      const id = k as keyof T;
      const value = values[id];
      const state = states[id] as any;
      const error = errors.get(id) as any;

      const handler: Handler<T[typeof id], Es> = {
        state,
        value,
        error,
        validate: () => {
          send({ id, type: EventTypes.Validate });
        },
        set: (value) => {
          send({ id, value, type: EventTypes.Change });
        },
        setWithValidate: (value) => {
          send({
            id,
            value,
            type: EventTypes.ChangeWithValidate,
          });
        },
      };

      return [k, handler];
    });

    return Object.fromEntries(entries);

    // using size given react is unable to diff Map
  }, [actors, states, errors.size, values, send]);

  return [
    {
      data,
      error,
      errors,
      states,
      values,
      failureCount,
      dataUpdatedAt,
      errorUpdatedAt,

      // form states
      state,
      isIdle,
      isError,
      submitted,
      isValidating,
      isSubmitting,
      submittedWithError,
      validatedWithErrors,
      isSuccess: submitted,
      submittedWithoutError,

      kill: (id) => {
        send({ id, type: EventTypes.Kill });
      },

      spawn: (id, value) => {
        send({ id, value, type: EventTypes.Spawn });
      },

      cancel: () => {
        send(EventTypes.Cancel);
      },
      validate: (id) => {
        send({ id, type: EventTypes.Validate });
      },
      set: (name, value) => {
        send({ type: EventTypes.Set, name, value: value as any });
      },
      setField: (id, value) => {
        send({ type: EventTypes.Change, id, value });
      },
      setFieldWithValidate: (id, value) => {
        send({
          id,
          value,
          type: EventTypes.ChangeWithValidate,
        });
      },
      submit: (...ignore) => {
        send({ ignore, type: EventTypes.Submit });
      },
    },
    handlers,
  ];
};

import { useActor } from '@xstate/react';
import { useCallback } from 'react';
import { FieldActions, FieldState } from './types';
import { useElder } from './useElder';

export function useField<T, E = any>(name: string): FieldState<T, E> | null {
  const { set, actors, validate } = useElder();

  const actor = actors[name];

  const [current] = useActor(actor);

  const state = current.value;

  const { value, error } = current.context;

  const isIdle = current.value === 'idle';
  const isError = current.value === 'error';
  const isSuccess = current.value === 'success';
  const isValidating = current.value === 'validating';

  const nSet = useCallback<FieldActions<T>['set']>(
    (value) => set(name, value),
    [set, name]
  );

  const nValidate = useCallback<FieldActions<T>['validate']>(
    (value) => validate(name, value),
    [name, validate]
  );

  return {
    state,
    isIdle,
    isError,
    isSuccess,
    isValidating,

    error,
    value,
    set: nSet,
    validate: nValidate,
  };
}

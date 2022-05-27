import { useActor } from '@xstate/react';
import { get } from 'object-path';
import { useCallback, useMemo } from 'react';
import { ActorRef } from 'xstate';
import { useElder } from './useElder';
import { FieldState, FieldActions } from './types';
import { actor as elderActor } from 'elderform';

export function useField<T extends object, E = any>(
  name: keyof T
): FieldState<T[keyof T], E> | null {
  const { set, actors, validate } = useElder<T, any, any, E>();

  const actor = useMemo<ActorRef<elderActor.Events, elderActor.States>>(
    () => get(actors, name as string),
    [name, actors]
  );

  const [current] = useActor(actor);

  const state = current.value;

  const { value, error } = current.context;

  // const state = get(states, name as string);

  // const value = get(values, name as string);

  // const error = get(errors, name as string);

  const nSet = useCallback<FieldActions<T[keyof T]>['set']>(
    (value) => set(name, value),
    [set, name]
  );

  const nValidate = useCallback<FieldActions<T[keyof T]>['validate']>(
    (value) => validate(name, value),
    [name, validate]
  );

  return { state, error, value, set: nSet, validate: nValidate };
}

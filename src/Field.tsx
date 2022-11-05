import { useActor } from '@xstate/react';
import type { Validator } from 'elderform';
import { actor as elderActor } from 'elderform';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActorRef } from 'xstate';
import type { FieldActions, FieldState } from './types';
import { useElder } from './useElder';
import { get } from 'object-path';

function Actor<T, E>({
  name,
  actor,
  children,
}: {
  name: string;
  children: (state: FieldState<T, E>) => JSX.Element;
  actor: ActorRef<elderActor.Events, elderActor.States>;
}) {
  const { set, validate } = useElder();

  const [current] = useActor(actor);

  const state = current.value;

  // console.log(current?.event, name);

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

  // const nSet = useCallback<FieldActions<T[keyof T]>['set']>(
  //   (value) => send({ type: 'change', value }),
  //   [name, send]
  // );

  // const nValidate = useCallback<FieldActions<T[keyof T]>['validate']>(
  //   (value) => send({ type: 'validate', values: null, value }),
  //   [name, send]
  // );

  return children({
    state,
    isIdle,
    isError,
    isSuccess,
    isValidating,

    error,
    value,
    set: nSet,
    validate: nValidate,
  });
}

export function Field<TValue = any, E = any, TValues extends object = any>({
  name,
  children,
  onValidate,
  initialValue,
}: {
  name: string;
  initialValue?: TValue;
  onValidate: Validator<TValue, TValues>;
  children: (state: FieldState<TValue, E>) => JSX.Element;
}) {
  const { actors, spawn, kill, values, errors, states, set, validate } =
    useElder();

  let nName = useRef(name);

  const validateFn = useRef(onValidate);

  // const actor = useMemo(() => get(actors, name), [actors, name]);

  const value = get(values, name);
  const state = get(states, name);
  const error = get(errors, name);

  // console.log('error', error, name, errors);

  const isIdle = state === 'idle';
  const isError = state === 'error';
  const isSuccess = state === 'success';
  const isValidating = state === 'validating';

  const nSet = useCallback<FieldActions<TValue>['set']>(
    (value) => set(name, value),
    [set, name]
  );

  const nValidate = useCallback<FieldActions<TValue>['validate']>(
    (value) => validate(name, value),
    [name, validate]
  );

  useEffect(() => {
    validateFn.current = onValidate;
  }, [onValidate]);

  useEffect(() => {
    const name = nName.current;

    return () => {
      console.log('killing...', name);
      kill(name);
    };
  }, [kill, nName]);

  // console.log(actors, name, get(actors, name));

  useEffect(() => {
    if (!actors[nName.current]) {
      console.log('spawning...', nName.current);
      spawn(nName.current, initialValue, validateFn.current);
    }
  }, [actors, nName, spawn, onValidate, initialValue]);

  return children({
    state,
    isIdle,
    isError,
    isSuccess,
    isValidating,

    error,
    value,
    set: nSet,
    validate: nValidate,
  });

  // if (!actor) return null;

  // console.log('here...');

  // return <Actor {...{ name, actor }}>{children}</Actor>;
}

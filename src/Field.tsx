import { useActor } from '@xstate/react';
import type { Validator } from 'elderform';
import { actor as elderActor } from 'elderform';
import { get } from 'object-path';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActorRef } from 'xstate';
import type { FieldActions, FieldState } from './types';
import { useElder } from './useElder';

function Actor<T extends object, E>({
  name,
  actor,
  children,
}: {
  name: keyof T;
  actor: ActorRef<elderActor.Events, elderActor.States>;
  children: (state: FieldState<T[keyof T], E>) => JSX.Element;
}) {
  const { set, validate } = useElder<T, any, any, E>();

  const [current] = useActor(actor);

  const state = current.value;

  const { value, error } = current.context;

  const nSet = useCallback<FieldActions<T[keyof T]>['set']>(
    (value) => set(name, value),
    [set, name]
  );

  const nValidate = useCallback<FieldActions<T[keyof T]>['validate']>(
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

  return children({ state, error, value, set: nSet, validate: nValidate });
}

export function Field<T extends object = any, E = any>({
  name,
  children,
  onValidate,
  initialValue,
}: {
  name: keyof T;
  initialValue?: T[keyof T];
  onValidate: Validator<T[keyof T], T>;
  children: (state: FieldState<T[keyof T], E>) => JSX.Element;
}) {
  const { actors, spawn, kill } = useElder<T, any, any, E>();

  const actor = useMemo(() => get(actors, name as string), [name, actors]);

  useEffect(() => {
    return () => kill(name as string);
  }, [kill, name]);

  useEffect(() => {
    if (!actor) spawn(name as string, initialValue, onValidate);
  }, [actor, name, spawn, onValidate, initialValue]);

  if (!actor) return null;

  return <Actor {...{ name, actor }}>{children}</Actor>;
}

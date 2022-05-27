import React from 'react';
import { ReactNode } from 'react';
import { Context } from './Context';
import { State } from './types';

export function Form<T extends object = any, D = any, E = any, Es = any>({
  state,
  children,
}: {
  state: State<T, D, E, Es>;
  children: ReactNode | ((state: State<T, D, E, Es>) => ReactNode);
}) {
  return (
    <Context.Provider value={state}>
      {typeof children === 'function' ? children(state) : children}
    </Context.Provider>
  );
}

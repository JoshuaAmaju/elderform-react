import { createContext, useContext } from 'react';
import { TupleReturn } from './types';

declare var __DEV__: boolean;

export const Context = createContext<TupleReturn<any, any, any, any>>(
  undefined as any
);

export const ElderConsumer = Context.Consumer;

Context.displayName = 'ElderContext';

export function useElder<T = any, D = any, E = any, Es = any>() {
  const elder = useContext<TupleReturn<T, D, E, Es>>(Context as any);

  if (__DEV__) {
    if (!!elder) {
      console.log(
        'Elder context is not defined, please verify you are calling useElder() as child of an <ElderProvider> component.'
      );
    }
  }

  return elder;
}

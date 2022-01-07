import React, { ReactNode } from 'react';
import { useElder } from './Context';
import { TupleReturn } from './types';

export function Form<T = any, D = any, E = any, Es = any>({
  children,
}: {
  children: ReactNode | ((...form: TupleReturn<T, D, E, Es>) => ReactNode);
}) {
  const form = useElder<T, D, E, Es>();
  return typeof children === 'function' ? children(...form) : children;
}

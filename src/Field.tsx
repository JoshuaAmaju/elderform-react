import React from 'react';
import { Handler } from 'elderform';
import { useField } from './useField';

export function Field<T = any, E = any>({
  name,
  children,
}: {
  name: keyof T;
  children: (field: Handler<T[keyof T], E>) => JSX.Element;
}) {
  return children(useField<T, E>(name));
}

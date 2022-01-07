import { Service } from 'elderform';
import React, { ReactNode } from 'react';
import { Context } from './Context';
import { useForm } from './useForm';

export function ElderProvider<T = any, D = any, E = any, Es = any>({
  children,
  ...config
}: Service<T, D, E, Es> & { children: ReactNode }) {
  return (
    <Context.Provider value={useForm(config) as any}>
      {children}
    </Context.Provider>
  );
}

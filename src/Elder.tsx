import { Config } from 'elderform';
import React, { ReactNode } from 'react';
import { Context } from './Context';
import { createForm } from './createForm';

export function Elder<T = any, D = any, E = any, Es = any>({
  children,
  ...config
}: Config<T, D, E, Es> & { children: ReactNode }) {
  return (
    <Context.Provider value={createForm(config) as any}>
      {children}
    </Context.Provider>
  );
}

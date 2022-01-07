import { useActor } from '@xstate/react';
import type { Config, Service } from 'elderform';
import { createForm as create } from 'elderform';
import { useRef } from 'react';
import type { TupleReturn } from './types';
import { useTuple } from './internal/useTuple';

export const createForm = <T = any, D = any, E = any, Es = any>(
  config: Config<T, D, E, Es>
): TupleReturn<T, D, E, Es> => {
  const ref = useRef<Service<T, D, E, Es>>();

  if (!ref.current) {
    ref.current = create(config);
  }

  const { __service } = ref.current;

  const service = useActor(__service);

  return useTuple(service);
};

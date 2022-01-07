import { useActor } from '@xstate/react';
import type { Service } from 'elderform';
import type { TupleReturn } from './types';
import { useTuple } from './internal/useTuple';

export const useForm = <T = any, D = any, E = any, Es = any>({
  __service,
}: Service<T, D, E, Es>): TupleReturn<T, D, E, Es> =>
  useTuple(useActor(__service));

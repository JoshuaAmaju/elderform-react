import { useActor } from '@xstate/react';
import type { Actions, Extra, FormState } from 'elderform';
import type { State } from './types';

export function useForm<
  T extends object = any,
  D = any,
  E = any,
  FE = any,
  TData = D
>({
  __service,
  ...actions
}: Actions<T, TData> & Extra<T, TData, E, FE>): State<T, TData, E, FE> {
  const [current] = useActor(__service.start());

  const {
    data,
    error,
    states,
    errors,
    values,
    actors,
    failureCount,
    dataUpdatedAt,
    errorUpdatedAt,
  } = current.context;

  const state = current.value as FormState;

  const isIdle = current.matches('idle');
  const isError = current.matches('error');
  const submitted = current.matches('submitted');
  const isValidating = current.matches('validating');
  const isSubmitting = current.matches('submitting');

  return {
    ...actions,

    state,
    actors,

    data,
    error,

    values,
    states,
    errors,

    failureCount,
    dataUpdatedAt,
    errorUpdatedAt,

    isIdle,
    isError,
    submitted,
    isValidating,
    isSubmitting,
  };
}

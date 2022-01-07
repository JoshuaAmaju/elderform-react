import { Handler } from 'elderform';
import { useElder } from './Context';

export function useField<T, E = any>(name: keyof T): Handler<T[keyof T], E> {
  const [_, handlers] = useElder<T, any, any, E>();
  return handlers[name];
}

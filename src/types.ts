import { Handlers, SubscriptionValue, Service as _Service } from 'elderform';

export type Service<T, D, E, Es> = Omit<
  _Service<T, D, E, Es>,
  '__service' | '__generate' | 'subscribe'
>;

type T = _Service<any, any, any, any>[];

export type TupleReturn<T, D, E, Es> = [
  Service<T, D, E, Es> & SubscriptionValue<T, D, E, Es>,
  Handlers<T, Es>
];

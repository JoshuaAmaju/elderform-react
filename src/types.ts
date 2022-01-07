import type {
  Handlers,
  Service as _Service,
  SubscriptionValue,
} from 'elderform';

export type Service<T, D, E, Es> = Omit<
  _Service<T, D, E, Es>,
  '__service' | '__generate' | 'subscribe'
>;

export type TupleReturn<T, D, E, Es> = [
  SubscriptionValue<T, D, E, Es> & Service<T, D, E, Es>,
  Handlers<T, Es>
];

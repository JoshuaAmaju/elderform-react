import { actor } from 'elderform';
import type { Actions, Ctx, Values, ActorState } from 'elderform';

export type State<T extends object, D, E, FE> = Actions<T, D> &
  Values<T, D, E, FE> &
  Pick<Ctx<T, D, E, FE>, 'actors'>;

export type FieldActions<T> = {
  set: (value: T) => void;
  validate: (value?: T) => void;
};

export type FieldState<T, E> = FieldActions<T> &
  actor.Ctx<T, E> & { state: ActorState };

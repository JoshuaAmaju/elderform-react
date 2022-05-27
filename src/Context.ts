import type { Actions, Values, Ctx } from 'elderform';
import { createContext } from 'react';

export const Context = createContext<
  Actions & Values<any, any, any, any> & Pick<Ctx, 'actors'>
>(null as any);

export const ElderConsumer = Context.Consumer;

Context.displayName = 'ElderContext';

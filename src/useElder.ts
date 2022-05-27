import { Actions, Values, Ctx } from 'elderform';
import { useContext } from 'react';
import { Context } from './Context';

export declare var __DEV__: boolean;

export function useElder<T extends object = any, D = any, E = any, Es = any>() {
  const elder = useContext<
    Actions<T, D> & Values<T, D, E, Es> & Pick<Ctx<T, D, E, Es>, 'actors'>
  >(Context as any);

  // if (__DEV__) {
  //   if (!!elder) {
  //     console.log(
  //       'Elder context is not defined, please verify you are calling useElder() as child of an <ElderProvider> component.'
  //     );
  //   }
  // }

  return elder;
}

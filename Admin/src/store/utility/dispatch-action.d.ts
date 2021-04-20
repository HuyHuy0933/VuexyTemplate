import { DispatchReturnType } from './dispatch-return-type';

export type DispatchAction<TActions> = UnionToIntersection<
  {
    [P in keyof TActions]: TActions[P] extends AnyFunction
      ? (
          action: P,
          ...args: Parameters<TActions[P]>
        ) => DispatchReturnType<TActions[P]>
      : never;
  }[keyof TActions]
>;

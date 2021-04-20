import { ActionContext } from 'vuex';
import { DispatchReturnType } from './dispatch-return-type';
import { DispatchAction } from './dispatch-action';
import { UnionToIntersection } from 'vue-class-component/lib/util';

export type CommitMutation<TMutationPayloadTypes> = UnionToIntersection<
  {
    [P in keyof TMutationPayloadTypes]: TMutationPayloadTypes[P] extends never
      ? (mutation: P) => void
      : (mutation: P, payload: TMutationPayloadTypes[P]) => void;
  }[keyof TMutationPayloadTypes]
>;

type ModuleMutations<TStateTypes, TMutationPayloadTypes> = {
  [P in keyof TMutationPayloadTypes]: TMutationPayloadTypes[P] extends never
    ? (state: TStateTypes) => void
    : (state: TStateTypes, payload: TMutationPayloadTypes[P]) => void;
};

export type ActionTypes<TActions> = {
  [P in keyof TActions]: TActions[P] extends AnyFunction
    ? (...args: Parameters<TActions[P]>) => Promise<ReturnType<TActions[P]>>
    : never;
};

export interface TypedModule<
  TStateTypes,
  TMutationPayloadTypes,
  TActions,
  TGetterTypes,
  TRootState
> {
  namespaced: true;
  mutations: ModuleMutations<TStateTypes, TMutationPayloadTypes>;
  actions: {
    [P in keyof TActions]: TActions[P] extends AnyFunction
      ? (
          context: Override<
            ActionContext<TStateTypes, TRootState>,
            {
              commit: CommitMutation<TMutationPayloadTypes>;
              dispatch: DispatchAction<TActions>;
              getters: TGetterTypes;
            }
          >,
          ...args: Parameters<TActions[P]>
        ) => DispatchReturnType<TActions[P]>
      : never;
  };
  getters: {
    [P in keyof TGetterTypes]: (
      state: TStateTypes,
      getters: TGetterTypes,
      rootState: TRootState,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rootGetters: any
    ) => TGetterTypes[P];
  };
}

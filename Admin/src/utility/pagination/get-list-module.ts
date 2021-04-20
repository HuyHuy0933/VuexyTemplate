import {
  ListAction,
  ListGetter,
  ListMutation,
  ListStateModule,
  PagedResults
} from './get-list.module-type';

interface CanHasPageNumber {
  page?: number;
}

export function getListModule<
  TModel,
  TGetInput extends CanHasPageNumber & { initialized?: boolean }
>(
  get: (input: TGetInput) => Promise<PagedResults<TModel> | null>,
  isInitialized?: (input: Partial<TGetInput>) => boolean
): ListStateModule<TModel, TGetInput> {
  return {
    namespaced: true,
    state: {
      items: [],
      itemCount: 0,
      isLoading: true,
      input: {}
    },
    mutations: {
      [ListMutation.updateInput](state, payload) {
        state.input = {
          ...state.input,
          ...payload.inputUpdates
        };
      },
      [ListMutation.setIsLoading](state, isLoading) {
        state.isLoading = isLoading;
      },
      [ListMutation.setItems](state, page) {
        state.items = page.results!;
        state.itemCount = page.resultCount;
      }
    },
    actions: {
      [ListAction.updateInput]({ commit }, updates) {
        commit(ListMutation.updateInput, { inputUpdates: updates });
      },
      async [ListAction.load]({ commit, dispatch, state }, gotoFirstPage) {
        if (isInitialized && !isInitialized(state.input!)) {
          return;
        }
        commit(ListMutation.setIsLoading, true);
        if (gotoFirstPage && state.input.page !== 1) {
          await dispatch(ListAction.updateInput, {
            page: 1
          } as Partial<TGetInput>);
        }
        const pageOfResults = (await get(state.input as TGetInput))!;
        commit(ListMutation.setItems, pageOfResults);
        commit(ListMutation.setIsLoading, false);
      },
      [ListAction.unload]({ commit }) {
        commit(ListMutation.setItems, {
          results: [],
          resultCount: 0
        });
      }
    },
    getters: {
      [ListGetter.state]: (state) => state
    }
  };
}

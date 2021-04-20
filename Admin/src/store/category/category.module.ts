import ApiClientFactory from '@/api/apiClientFactory';
import {
  CategoryAction,
  CategoryGetter,
  CategoryModule,
  CategoryMutation,
  CategoryState
} from './category.module-types';

export const categoryModule: CategoryModule = {
  namespaced: true,
  state: {
    [CategoryState.category]: null
  },
  mutations: {
    [CategoryMutation.setCategory]: (state, payload) => {
      state[CategoryState.category] = payload;
    }
  },
  actions: {
    [CategoryAction.loadCategory]: async ({ commit }, id: number) => {
      commit(
        CategoryMutation.setCategory,
        await new ApiClientFactory().categoryClient().get(id)
      );
    },
    [CategoryAction.clearCategory]: ({ commit }) => {
      commit(CategoryMutation.setCategory, null);
    }
  },
  getters: {
    [CategoryGetter.category]: (state) => state[CategoryState.category]
  }
};

import ApiClientFactory from '@/api/apiClientFactory';

import {
  ProductAction,
  ProductGetter,
  ProductModule,
  ProductMutation,
  ProductState
} from './product.module-types';

export const productModule: ProductModule = {
  namespaced: true,
  state: {
    [ProductState.product]: null
  },
  mutations: {
    [ProductMutation.setProduct]: (state, payload) => {
      state[ProductState.product] = payload;
    }
  },
  actions: {
    [ProductAction.loadProduct]: async ({ commit }, id: number) => {
      commit(
        ProductMutation.setProduct,
        await new ApiClientFactory().productClient().get(id)
      );
    },
    [ProductAction.clearProduct]: ({ commit }) => {
      commit(ProductMutation.setProduct, null);
    }
  },
  getters: {
    [ProductGetter.product]: (state) => state[ProductState.product]
  }
};

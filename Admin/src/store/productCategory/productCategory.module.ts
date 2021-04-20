import ApiClientFactory from '@/api/apiClientFactory';
import {
  ProductCategoryAction,
  ProductCategoryGetter,
  ProductCategoryModule,
  ProductCategoryMutation,
  ProductCategoryState
} from './productCategory.module-types';

export const productCategoryModule: ProductCategoryModule = {
  namespaced: true,
  state: {
    [ProductCategoryState.productCategory]: null
  },
  mutations: {
    [ProductCategoryMutation.setProductCategory]: (state, payload) => {
      state[ProductCategoryState.productCategory] = payload;
    }
  },
  actions: {
    [ProductCategoryAction.loadProductCategory]: async (
      { commit },
      id: number
    ) => {
      commit(
        ProductCategoryMutation.setProductCategory,
        await new ApiClientFactory().productCategoryClient().get(id)
      );
    },
    [ProductCategoryAction.clearProductCategory]: ({ commit }) => {
      commit(ProductCategoryMutation.setProductCategory, null);
    }
  },
  getters: {
    [ProductCategoryGetter.productCategory]: (state) =>
      state[ProductCategoryState.productCategory]
  }
};

import ApiClientFactory from '@/api/apiClientFactory';
import {
  DecalPriceAction,
  DecalPriceGetter,
  DecalPriceModule,
  DecalPriceMutation,
  DecalPriceState
} from './decal-price.module-types';

export const decalPriceModule: DecalPriceModule = {
  namespaced: true,
  state: {
    [DecalPriceState.decalPrice]: null
  },
  mutations: {
    [DecalPriceMutation.setDecalPrice]: (state, payload) => {
      state[DecalPriceState.decalPrice] = payload;
    }
  },
  actions: {
    [DecalPriceAction.loadDecalPrice]: async ({ commit }, id: number) => {
      commit(
        DecalPriceMutation.setDecalPrice,
        await new ApiClientFactory().decalPriceClient().get(id)
      );
    },
    [DecalPriceAction.clearDecalPrice]: ({ commit }) => {
      commit(DecalPriceMutation.setDecalPrice, null);
    }
  },
  getters: {
    [DecalPriceGetter.decalPrice]: (state) => state[DecalPriceState.decalPrice]
  }
};

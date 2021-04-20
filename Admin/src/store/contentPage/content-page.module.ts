import ApiClientFactory from '@/api/apiClientFactory';
import {
  ContentPageAction,
  ContentPageGetter,
  ContentPageModule,
  ContentPageMutation,
  ContentPageState
} from './content-page.module-types';

export const contentPageModule: ContentPageModule = {
  namespaced: true,
  state: {
    [ContentPageState.contentPage]: null
  },
  mutations: {
    [ContentPageMutation.setContentPage]: (state, payload) => {
      state[ContentPageState.contentPage] = payload;
    }
  },
  actions: {
    [ContentPageAction.loadContentPage]: async ({ commit }, id: number) => {
      commit(
        ContentPageMutation.setContentPage,
        await new ApiClientFactory().contentPageClient().get(id)
      );
    },
    [ContentPageAction.clearContentPage]: ({ commit }) => {
      commit(ContentPageMutation.setContentPage, null);
    }
  },
  getters: {
    [ContentPageGetter.contentPage]: (state) =>
      state[ContentPageState.contentPage]
  }
};

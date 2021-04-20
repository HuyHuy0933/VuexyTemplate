import ApiClientFactory from '@/api/apiClientFactory';
import {
  BlogAction,
  BlogGetter,
  BlogModule,
  BlogMutation,
  BlogState
} from './blog.module-types';

export const blogModule: BlogModule = {
  namespaced: true,
  state: {
    [BlogState.blog]: null
  },
  mutations: {
    [BlogMutation.setBlog]: (state, payload) => {
      state[BlogState.blog] = payload;
    }
  },
  actions: {
    [BlogAction.loadBlog]: async ({ commit }, id: number) => {
      commit(
        BlogMutation.setBlog,
        await new ApiClientFactory().blogClient().get(id)
      );
    },
    [BlogAction.clearBlog]: ({ commit }) => {
      commit(BlogMutation.setBlog, null);
    }
  },
  getters: {
    [BlogGetter.blog]: (state) => state[BlogState.blog]
  }
};

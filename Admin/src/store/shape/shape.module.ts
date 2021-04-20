import ApiClientFactory from '@/api/apiClientFactory';
import {
  ShapeAction,
  ShapeGetter,
  ShapeModule,
  ShapeMutation,
  ShapeState
} from './shape.module-types';

export const shapeModule: ShapeModule = {
  namespaced: true,
  state: {
    [ShapeState.shape]: null
  },
  mutations: {
    [ShapeMutation.setShape]: (state, payload) => {
      state[ShapeState.shape] = payload;
    }
  },
  actions: {
    [ShapeAction.loadShape]: async ({ commit }, id: number) => {
      commit(
        ShapeMutation.setShape,
        await new ApiClientFactory().shapeClient().get(id)
      );
    },
    [ShapeAction.clearShape]: ({ commit }) => {
      commit(ShapeMutation.setShape, null);
    }
  },
  getters: {
    [ShapeGetter.shape]: (state) => state[ShapeState.shape]
  }
};

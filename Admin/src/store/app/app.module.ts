import {
  AppState,
  AppModule,
  AppGetter,
  AppMutation
} from './app.module-types';
import { $themeBreakpoints } from '../../../themeConfig';

export const appModule: AppModule = {
  namespaced: true,
  state: {
    [AppState.windowWidth]: 0,
    [AppState.shallShowOverlay]: false
  },
  mutations: {
    [AppMutation.setWindowWidth]: (state, payload) => {
      state[AppState.windowWidth] = payload;
    },
    [AppMutation.toggleOverlay]: (state, payload) => {
      state[AppState.shallShowOverlay] =
        payload !== undefined ? payload : !state[AppState.shallShowOverlay];
    }
  },
  actions: {},
  getters: {
    [AppGetter.currentBreakPoint]: (state) => {
      const windowWidth = state[AppState.windowWidth];
      if (windowWidth >= $themeBreakpoints.xl) return 'xl';
      if (windowWidth >= $themeBreakpoints.lg) return 'lg';
      if (windowWidth >= $themeBreakpoints.md) return 'md';
      if (windowWidth >= $themeBreakpoints.sm) return 'sm';
      return 'xs';
    },
    [AppGetter.windowWidth]: (state) => {
      return state[AppState.windowWidth];
    }
  }
};

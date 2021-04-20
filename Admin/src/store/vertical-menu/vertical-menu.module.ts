import {
  VerticalMenuState,
  VerticalMenuModule,
  VerticalMenuGetter,
  VerticalMenuMutation
} from './vertical-menu.module-types';
import { $themeConfig } from '../../../themeConfig';

export const verticalMenuModule: VerticalMenuModule = {
  namespaced: true,
  state: {
    [VerticalMenuState.isVerticalMenuCollapsed]:
      $themeConfig.layout.menu.isCollapsed
  },
  mutations: {
    [VerticalMenuMutation.updateVerticalMenuCollapse]: (state, payload) => {
      state[VerticalMenuState.isVerticalMenuCollapsed] = payload;
    }
  },
  actions: {},
  getters: {}
};

import {
  AppConfigState,
  AppConfigModule,
  AppConfigGetter,
  AppConfigMutation
} from './app-config.module-types';
import { $themeConfig } from '../../../themeConfig';

export const appConfigModule: AppConfigModule = {
  namespaced: true,
  state: {
    [AppConfigState.layout]: {
      isRTL: $themeConfig.layout.isRTL,
      skin: localStorage.getItem('vuexy-skin') || $themeConfig.layout.skin,
      routerTransition: $themeConfig.layout.routerTransition,
      type: $themeConfig.layout.type,
      contentWidth: $themeConfig.layout.contentWidth,
      menu: {
        hidden: $themeConfig.layout.menu.hidden
      },
      navbar: {
        type: $themeConfig.layout.navbar.type,
        backgroundColor: $themeConfig.layout.navbar.backgroundColor
      },
      footer: {
        type: $themeConfig.layout.footer.type
      }
    }
  },
  mutations: {
    [AppConfigMutation.toggleRTL]: (state, payload) => {
      state[AppConfigState.layout].isRTL = !state[AppConfigState.layout].isRTL;
      document.documentElement.setAttribute(
        'dir',
        state[AppConfigState.layout].isRTL ? 'rtl' : 'ltr'
      );
    },
    [AppConfigMutation.updateSkin]: (state, skin: string | undefined) => {
      state[AppConfigState.layout].skin = skin;

      // Update value in localStorage
      localStorage.setItem('vuexy-skin', skin!);

      // Update DOM for dark-layout
      if (skin === 'dark') document.body.classList.add('dark-layout');
      else if (document.body.className.match('dark-layout'))
        document.body.classList.remove('dark-layout');
    },
    [AppConfigMutation.updateRouteTransition]: (state, payload) => {
      state[AppConfigState.layout].routerTransition = payload;
    },
    [AppConfigMutation.updateLayoutType]: (state, payload) => {
      state[AppConfigState.layout].type = payload;
    },
    [AppConfigMutation.updateContentWidth]: (state, payload) => {
      state[AppConfigState.layout].contentWidth = payload;
    },
    [AppConfigMutation.updateNavMenuHidden]: (state, payload) => {
      state[AppConfigState.layout].menu.hidden = payload;
    },
    [AppConfigMutation.updateNavBarConfig]: (state, payload) => {
      Object.assign(state[AppConfigState.layout].navbar, payload);
    },
    [AppConfigMutation.updateFooterConfig]: (state, payload) => {
      Object.assign(state[AppConfigState.layout].footer, payload);
    }
  },
  actions: {},
  getters: {}
};

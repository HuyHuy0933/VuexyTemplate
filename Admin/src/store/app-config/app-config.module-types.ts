import { Module } from 'vuex';
import { namespace } from 'vuex-class';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';

export const enum AppConfigState {
  layout = 'layout'
}

export interface AppConfigStateTypes {
  [AppConfigState.layout]: ILayoutConfig;
}

export const enum AppConfigMutation {
  toggleRTL = 'toggleRTL',
  updateSkin = 'updateSkin',
  updateRouteTransition = 'updateRouteTransition',
  updateLayoutType = 'updateLayoutType',
  updateContentWidth = 'updateContentWidth',
  updateNavMenuHidden = 'updateNavMenuHidden',
  updateNavBarConfig = 'updateNavBarConfig',
  updateFooterConfig = 'updateFooterConfig'
}

export interface AppConfigMutationPayloadTypes {
  [AppConfigMutation.toggleRTL]: boolean | undefined;
  [AppConfigMutation.updateSkin]: string | undefined;
  [AppConfigMutation.updateRouteTransition]: string | undefined;
  [AppConfigMutation.updateLayoutType]: string | undefined;
  [AppConfigMutation.updateContentWidth]: string | undefined;
  [AppConfigMutation.updateNavMenuHidden]: any | undefined;
  [AppConfigMutation.updateNavBarConfig]: any | undefined;
  [AppConfigMutation.updateFooterConfig]: any | undefined;
}

export interface AppConfigActions {}

export const enum AppConfigGetter {}

export interface AppConfigGetterTypes {}

export const APP_CONFIG_STATE_NAMESPACE = 'AppConfigState';
export const appNamespace = namespace(APP_CONFIG_STATE_NAMESPACE);

export type AppConfigModule = Override<
  Module<AppConfigStateTypes, WebRootState>,
  TypedModule<
    AppConfigStateTypes,
    AppConfigMutationPayloadTypes,
    AppConfigActions,
    AppConfigGetterTypes,
    WebRootState
  >
>;

interface ILayoutConfig {
  isRTL?: boolean | undefined;
  skin?: string | undefined;
  routerTransition?: string | undefined;
  type?: string | undefined;
  contentWidth?: string | undefined;
  menu: {
    hidden?: boolean | undefined;
    isCollapsed?: boolean | undefined;
  };
  navbar?: {
    type?: string | undefined;
    backgroundColor?: string | undefined;
  };
  footer?: {
    type?: string | undefined;
  };
  customizer?: boolean | undefined;
  enableScrollToTop?: boolean | undefined;
}

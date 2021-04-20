import { Module } from 'vuex';
import { namespace } from 'vuex-class';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';

export const enum AppState {
  windowWidth = 'windowWidth',
  shallShowOverlay = 'shallShowOverlay'
}

export interface AppStateTypes {}

export const enum AppMutation {
  setWindowWidth = 'setWindowWidth',
  toggleOverlay = 'toggleOverlay'
}

export interface AppMutationPayloadTypes {
  [AppMutation.setWindowWidth]: number | null;
  [AppMutation.toggleOverlay]: boolean | null;
}

export interface AppActions {}

export const enum AppGetter {
  currentBreakPoint = 'currentBreakPoint',
  windowWidth = 'windowWidth'
}

export interface AppGetterTypes {
  [AppGetter.currentBreakPoint]: string | null;
  [AppGetter.windowWidth]: number | null;
}

export const APP_STATE_NAMESPACE = 'AppState';
export const appNamespace = namespace(APP_STATE_NAMESPACE);

export type AppModule = Override<
  Module<AppStateTypes, WebRootState>,
  TypedModule<
    AppStateTypes,
    AppMutationPayloadTypes,
    AppActions,
    AppGetterTypes,
    WebRootState
  >
>;

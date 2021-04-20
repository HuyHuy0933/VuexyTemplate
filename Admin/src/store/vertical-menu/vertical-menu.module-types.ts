import { Module } from 'vuex';
import { namespace } from 'vuex-class';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';

export const enum VerticalMenuState {
  isVerticalMenuCollapsed = 'isVerticalMenuCollapsed'
}

export interface VerticalMenuStateTypes {
  [VerticalMenuState.isVerticalMenuCollapsed]: boolean | undefined;
}

export const enum VerticalMenuMutation {
  updateVerticalMenuCollapse = 'updateVerticalMenuCollapse'
}

export interface VerticalMenuMutationPayloadTypes {
  [VerticalMenuMutation.updateVerticalMenuCollapse]: any | undefined;
}

export interface VerticalMenuActions {}

export const enum VerticalMenuGetter {}

export interface VerticalMenuGetterTypes {}

export const VERTICAL_MENU_STATE_NAMESPACE = 'VerticalMenuState';
export const verticalMenuNamespace = namespace(VERTICAL_MENU_STATE_NAMESPACE);

export type VerticalMenuModule = Override<
  Module<VerticalMenuStateTypes, WebRootState>,
  TypedModule<
    VerticalMenuStateTypes,
    VerticalMenuMutationPayloadTypes,
    VerticalMenuActions,
    VerticalMenuGetterTypes,
    WebRootState
  >
>;

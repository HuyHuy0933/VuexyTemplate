import { SettingViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum SettingState {
  setting = 'setting'
}

export interface SettingStateTypes {
  [SettingState.setting]: SettingViewModel | null;
}

export const enum SettingMutation {
  setSetting = 'setSetting'
}

export interface SettingMutationPayloadTypes {
  [SettingMutation.setSetting]: SettingViewModel | null;
}

export const enum SettingAction {
  loadSetting = 'loadSetting',
  clearSetting = 'clearSetting'
}

export interface SettingActions {
  [SettingAction.loadSetting]: (id: number) => void;
  [SettingAction.clearSetting]: () => void;
}

export const enum SettingGetter {
  setting = 'setting'
}

export interface SettingGetterTypes {
  [SettingGetter.setting]: SettingViewModel | null;
}

export const SETTING_STATE_NAMESPACE = 'SettingState';
export const settingNamespace = namespace(SETTING_STATE_NAMESPACE);

export type SettingModule = Override<
  Module<SettingStateTypes, WebRootState>,
  TypedModule<
    SettingStateTypes,
    SettingMutationPayloadTypes,
    SettingActions,
    SettingGetterTypes,
    WebRootState
  >
>;

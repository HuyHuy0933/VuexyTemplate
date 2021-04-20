import ApiClientFactory from '@/api/apiClientFactory';
import {
  SettingAction,
  SettingGetter,
  SettingModule,
  SettingMutation,
  SettingState
} from './setting.module-types';

export const settingModule: SettingModule = {
  namespaced: true,
  state: {
    [SettingState.setting]: null
  },
  mutations: {
    [SettingMutation.setSetting]: (state, payload) => {
      state[SettingState.setting] = payload;
    }
  },
  actions: {
    [SettingAction.loadSetting]: async ({ commit }, id: number) => {
      commit(
        SettingMutation.setSetting,
        await new ApiClientFactory().settingClient().get(id)
      );
    },
    [SettingAction.clearSetting]: ({ commit }) => {
      commit(SettingMutation.setSetting, null);
    }
  },
  getters: {
    [SettingGetter.setting]: (state) => state[SettingState.setting]
  }
};

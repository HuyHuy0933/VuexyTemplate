import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import {
  SettingActions,
  SETTING_STATE_NAMESPACE
} from './setting.module-types';

export const dispatchSettingAction: DispatchAction<SettingActions> = getDispatch(
  SETTING_STATE_NAMESPACE
);

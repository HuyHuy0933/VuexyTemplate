import ApiClientFactory from '@/api/apiClientFactory';
import { getListModule } from '@/utility/pagination/get-list-module';
import { getListDispatcher } from '@/utility/pagination/get-list.dispatcher';
import {
  getItemsPerPage,
  getSortCriteria,
  getValueOrUndefined,
  getZeroBasedPageNumber,
  Pagination
} from '@/utility/pagination/pagination';
import { namespace } from 'vuex-class';

export const SETTING_LIST_STATE_NAMESPACE = 'settingListState';

export const settingListNamespace = namespace(SETTING_LIST_STATE_NAMESPACE);

export type SettingListInput = Pagination;

const getSettingList = (input: SettingListInput) =>
  new ApiClientFactory()
    .settingClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const settingListDispatcher = getListDispatcher<SettingListInput>(
  SETTING_LIST_STATE_NAMESPACE
);
export const settingListModule = getListModule(getSettingList);

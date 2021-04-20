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

export const CATEGORY_LIST_STATE_NAMESPACE = 'categoryListState';

export const categoryListNamespace = namespace(CATEGORY_LIST_STATE_NAMESPACE);

export type CategoryListInput = Pagination;

const getCategoryList = (input: CategoryListInput) =>
  new ApiClientFactory()
    .categoryClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const categoryListDispatcher = getListDispatcher<CategoryListInput>(
  CATEGORY_LIST_STATE_NAMESPACE
);
export const categoryListModule = getListModule(getCategoryList);

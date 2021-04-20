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

export const CONTENT_PAGE_LIST_STATE_NAMESPACE = 'contentPageListState';

export const contentPageListNamespace = namespace(
  CONTENT_PAGE_LIST_STATE_NAMESPACE
);

export type ContentPageListInput = Pagination;

const getContentPageList = (input: ContentPageListInput) =>
  new ApiClientFactory()
    .contentPageClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const contentPageListDispatcher = getListDispatcher<ContentPageListInput>(
  CONTENT_PAGE_LIST_STATE_NAMESPACE
);
export const contentPageListModule = getListModule(getContentPageList);

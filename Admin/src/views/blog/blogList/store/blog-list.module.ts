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

export const BLOG_LIST_STATE_NAMESPACE = 'blogListState';

export const blogListNamespace = namespace(BLOG_LIST_STATE_NAMESPACE);

export type BlogListInput = Pagination;

const getBlogList = (input: BlogListInput) =>
  new ApiClientFactory()
    .blogClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const blogListDispatcher = getListDispatcher<BlogListInput>(
  BLOG_LIST_STATE_NAMESPACE
);
export const blogListModule = getListModule(getBlogList);

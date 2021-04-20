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

export const PRODUCT_CATEGORY_LIST_STATE_NAMESPACE = 'productCategoryListState';

export const productCategoryListNamespace = namespace(
  PRODUCT_CATEGORY_LIST_STATE_NAMESPACE
);

export type ProductCategoryListInput = Pagination;

const getProductCategoryList = (input: ProductCategoryListInput) =>
  new ApiClientFactory()
    .productCategoryClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const productCategoryListDispatcher = getListDispatcher<ProductCategoryListInput>(
  PRODUCT_CATEGORY_LIST_STATE_NAMESPACE
);
export const productCategoryListModule = getListModule(getProductCategoryList);

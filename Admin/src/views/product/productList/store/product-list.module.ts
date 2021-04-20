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

export const PRODUCT_LIST_STATE_NAMESPACE = 'productListState';

export const productListNamespace = namespace(PRODUCT_LIST_STATE_NAMESPACE);

export type ProductListInput = Pagination;

const getProductList = (input: ProductListInput) =>
  new ApiClientFactory()
    .productClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const productListDispatcher = getListDispatcher<ProductListInput>(
  PRODUCT_LIST_STATE_NAMESPACE
);
export const productListModule = getListModule(getProductList);

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

export const DECAL_PRICE_LIST_STATE_NAMESPACE = 'decalPriceListState';

export const decalPriceListNamespace = namespace(
  DECAL_PRICE_LIST_STATE_NAMESPACE
);

export type DecalPriceListInput = Pagination;

const getDecalPriceList = (input: DecalPriceListInput) =>
  new ApiClientFactory()
    .decalPriceClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const decalPriceListDispatcher = getListDispatcher<DecalPriceListInput>(
  DECAL_PRICE_LIST_STATE_NAMESPACE
);
export const decalPriceListModule = getListModule(getDecalPriceList);

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

export const SHAPE_LIST_STATE_NAMESPACE = 'shapeListState';

export const shapeListNamespace = namespace(SHAPE_LIST_STATE_NAMESPACE);

export type ShapeListInput = Pagination;

const getShapeList = (input: ShapeListInput) =>
  new ApiClientFactory()
    .shapeClient()
    .getList(
      getZeroBasedPageNumber(input),
      getItemsPerPage(input),
      getValueOrUndefined(input.searchText),
      getSortCriteria(input)
    );

export const shapeListDispatcher = getListDispatcher<ShapeListInput>(
  SHAPE_LIST_STATE_NAMESPACE
);
export const shapeListModule = getListModule(getShapeList);

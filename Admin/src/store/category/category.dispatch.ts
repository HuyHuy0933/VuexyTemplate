import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import {
  CategoryActions,
  CATEGORY_STATE_NAMESPACE
} from './category.module-types';

export const dispatchCategoryAction: DispatchAction<CategoryActions> = getDispatch(
  CATEGORY_STATE_NAMESPACE
);

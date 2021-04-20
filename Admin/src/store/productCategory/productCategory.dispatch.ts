import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import {
  ProductCategoryActions,
  PRODUCT_CATEGORY_STATE_NAMESPACE
} from './productCategory.module-types';

export const dispatchProductCategoryAction: DispatchAction<ProductCategoryActions> = getDispatch(
  PRODUCT_CATEGORY_STATE_NAMESPACE
);

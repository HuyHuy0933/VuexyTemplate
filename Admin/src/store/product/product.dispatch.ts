import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import {
  ProductActions,
  PRODUCT_STATE_NAMESPACE
} from './product.module-types';

export const dispatchProductAction: DispatchAction<ProductActions> = getDispatch(
  PRODUCT_STATE_NAMESPACE
);

import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import {
  DecalPriceActions,
  DECAL_PRICE_STATE_NAMESPACE
} from './decal-price.module-types';

export const dispatchDecalPriceAction: DispatchAction<DecalPriceActions> = getDispatch(
  DECAL_PRICE_STATE_NAMESPACE
);

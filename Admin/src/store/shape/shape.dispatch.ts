import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import { ShapeActions, SHAPE_STATE_NAMESPACE } from './shape.module-types';

export const dispatchShapeAction: DispatchAction<ShapeActions> = getDispatch(
  SHAPE_STATE_NAMESPACE
);

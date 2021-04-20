import { ShapeViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum ShapeState {
  shape = 'shape'
}

export interface ShapeStateTypes {
  [ShapeState.shape]: ShapeViewModel | null;
}

export const enum ShapeMutation {
  setShape = 'setShape'
}

export interface ShapeMutationPayloadTypes {
  [ShapeMutation.setShape]: ShapeViewModel | null;
}

export const enum ShapeAction {
  loadShape = 'loadShape',
  clearShape = 'clearShape'
}

export interface ShapeActions {
  [ShapeAction.loadShape]: (id: number) => void;
  [ShapeAction.clearShape]: () => void;
}

export const enum ShapeGetter {
  shape = 'shape'
}

export interface ShapeGetterTypes {
  [ShapeGetter.shape]: ShapeViewModel | null;
}

export const SHAPE_STATE_NAMESPACE = 'ShapeState';
export const shapeNamespace = namespace(SHAPE_STATE_NAMESPACE);

export type ShapeModule = Override<
  Module<ShapeStateTypes, WebRootState>,
  TypedModule<
    ShapeStateTypes,
    ShapeMutationPayloadTypes,
    ShapeActions,
    ShapeGetterTypes,
    WebRootState
  >
>;

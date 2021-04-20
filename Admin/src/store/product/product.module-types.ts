import { ProductViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum ProductState {
  product = 'product'
}

export interface ProductStateTypes {
  [ProductState.product]: ProductViewModel | null;
}

export const enum ProductMutation {
  setProduct = 'setProduct'
}

export interface ProductMutationPayloadTypes {
  [ProductMutation.setProduct]: ProductViewModel | null;
}

export const enum ProductAction {
  loadProduct = 'loadProduct',
  clearProduct = 'clearProduct'
}

export interface ProductActions {
  [ProductAction.loadProduct]: (id: number) => void;
  [ProductAction.clearProduct]: () => void;
}

export const enum ProductGetter {
  product = 'product'
}

export interface ProductGetterTypes {
  [ProductGetter.product]: ProductViewModel | null;
}

export const PRODUCT_STATE_NAMESPACE = 'ProductState';
export const ProductNamespace = namespace(PRODUCT_STATE_NAMESPACE);

export type ProductModule = Override<
  Module<ProductStateTypes, WebRootState>,
  TypedModule<
    ProductStateTypes,
    ProductMutationPayloadTypes,
    ProductActions,
    ProductGetterTypes,
    WebRootState
  >
>;

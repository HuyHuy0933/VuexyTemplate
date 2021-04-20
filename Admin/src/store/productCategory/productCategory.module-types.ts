import { ProductCategoryViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum ProductCategoryState {
  productCategory = 'productCategory'
}

export interface ProductCategoryStateTypes {
  [ProductCategoryState.productCategory]: ProductCategoryViewModel | null;
}

export const enum ProductCategoryMutation {
  setProductCategory = 'setProductCategory'
}

export interface ProductCategoryMutationPayloadTypes {
  [ProductCategoryMutation.setProductCategory]: ProductCategoryViewModel | null;
}

export const enum ProductCategoryAction {
  loadProductCategory = 'loadProductCategory',
  clearProductCategory = 'clearProductCategory'
}

export interface ProductCategoryActions {
  [ProductCategoryAction.loadProductCategory]: (id: number) => void;
  [ProductCategoryAction.clearProductCategory]: () => void;
}

export const enum ProductCategoryGetter {
  productCategory = 'productCategory'
}

export interface ProductCategoryGetterTypes {
  [ProductCategoryGetter.productCategory]: ProductCategoryViewModel | null;
}

export const PRODUCT_CATEGORY_STATE_NAMESPACE = 'ProductCategoryState';
export const productCategoryNamespace = namespace(
  PRODUCT_CATEGORY_STATE_NAMESPACE
);

export type ProductCategoryModule = Override<
  Module<ProductCategoryStateTypes, WebRootState>,
  TypedModule<
    ProductCategoryStateTypes,
    ProductCategoryMutationPayloadTypes,
    ProductCategoryActions,
    ProductCategoryGetterTypes,
    WebRootState
  >
>;

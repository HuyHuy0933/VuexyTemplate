import { CategoryViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum CategoryState {
  category = 'category'
}

export interface CategoryStateTypes {
  [CategoryState.category]: CategoryViewModel | null;
}

export const enum CategoryMutation {
  setCategory = 'setCategory'
}

export interface CategoryMutationPayloadTypes {
  [CategoryMutation.setCategory]: CategoryViewModel | null;
}

export const enum CategoryAction {
  loadCategory = 'loadCategory',
  clearCategory = 'clearCategory'
}

export interface CategoryActions {
  [CategoryAction.loadCategory]: (id: number) => void;
  [CategoryAction.clearCategory]: () => void;
}

export const enum CategoryGetter {
  category = 'category'
}

export interface CategoryGetterTypes {
  [CategoryGetter.category]: CategoryViewModel | null;
}

export const CATEGORY_STATE_NAMESPACE = 'CategoryState';
export const categoryNamespace = namespace(CATEGORY_STATE_NAMESPACE);

export type CategoryModule = Override<
  Module<CategoryStateTypes, WebRootState>,
  TypedModule<
    CategoryStateTypes,
    CategoryMutationPayloadTypes,
    CategoryActions,
    CategoryGetterTypes,
    WebRootState
  >
>;

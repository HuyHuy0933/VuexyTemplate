import { TypedModule } from '@/store/utility/module-utility-types';
import { WebRootState } from '@/store/web-root-state';

import { Module } from 'vuex';

export const enum ListState {
  items = 'items',
  itemCount = 'itemCount',
  isLoading = 'isLoading',
  input = 'input'
}

export interface ListStateTypes<TModel, TGetInput> {
  [ListState.items]: TModel[];
  [ListState.itemCount]: number;
  [ListState.isLoading]: boolean;
  [ListState.input]: Partial<TGetInput>;
}

export const enum ListMutation {
  updateInput = 'updateInput',
  setIsLoading = 'setIsLoading',
  setItems = 'setItems'
}

export interface PagedResults<TModel> {
  results?: TModel[];
  resultCount: number;
}

interface GetInputUpdatesWrapper<TGetInput> {
  inputUpdates: Partial<TGetInput>;
}

interface ListMutationPayloadTypes<TModel, TGetInput> {
  [ListMutation.updateInput]: GetInputUpdatesWrapper<TGetInput>;
  [ListMutation.setIsLoading]: boolean;
  [ListMutation.setItems]: PagedResults<TModel>;
}

export const enum ListAction {
  updateInput = 'updateInput',
  load = 'load',
  unload = 'unload'
}

export interface ListActions<TGetInput> {
  [ListAction.updateInput]: (payload: Partial<TGetInput>) => void;
  [ListAction.load]: (gotoFirstPage?: boolean) => void;
  [ListAction.unload]: () => void;
}

export const enum ListGetter {
  state = 'state'
}

export interface ListGetterTypes<TModel, TGetInput> {
  [ListGetter.state]: ListStateTypes<TModel, TGetInput>;
}

export type ListStateModule<TModel, TGetInput> = Override<
  Module<ListStateTypes<TModel, TGetInput>, WebRootState>,
  TypedModule<
    ListStateTypes<TModel, TGetInput>,
    ListMutationPayloadTypes<TModel, TGetInput>,
    ListActions<TGetInput>,
    ListGetterTypes<TModel, TGetInput>,
    WebRootState
  >
>;

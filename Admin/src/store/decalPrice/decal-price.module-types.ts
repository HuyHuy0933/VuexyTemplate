import { DecalPriceViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum DecalPriceState {
  decalPrice = 'decalPrice'
}

export interface DecalPriceStateTypes {
  [DecalPriceState.decalPrice]: DecalPriceViewModel | null;
}

export const enum DecalPriceMutation {
  setDecalPrice = 'setDecalPrice'
}

export interface DecalPriceMutationPayloadTypes {
  [DecalPriceMutation.setDecalPrice]: DecalPriceViewModel | null;
}

export const enum DecalPriceAction {
  loadDecalPrice = 'loadDecalPrice',
  clearDecalPrice = 'clearDecalPrice'
}

export interface DecalPriceActions {
  [DecalPriceAction.loadDecalPrice]: (id: number) => void;
  [DecalPriceAction.clearDecalPrice]: () => void;
}

export const enum DecalPriceGetter {
  decalPrice = 'decalPrice'
}

export interface DecalPriceGetterTypes {
  [DecalPriceGetter.decalPrice]: DecalPriceViewModel | null;
}

export const DECAL_PRICE_STATE_NAMESPACE = 'DecalPriceState';
export const decalPriceNamespace = namespace(DECAL_PRICE_STATE_NAMESPACE);

export type DecalPriceModule = Override<
  Module<DecalPriceStateTypes, WebRootState>,
  TypedModule<
    DecalPriceStateTypes,
    DecalPriceMutationPayloadTypes,
    DecalPriceActions,
    DecalPriceGetterTypes,
    WebRootState
  >
>;

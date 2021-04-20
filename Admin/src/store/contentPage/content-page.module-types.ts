import { ContentPageViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum ContentPageState {
  contentPage = 'contentPage'
}

export interface ContentPageStateTypes {
  [ContentPageState.contentPage]: ContentPageViewModel | null;
}

export const enum ContentPageMutation {
  setContentPage = 'setContentPage'
}

export interface ContentPageMutationPayloadTypes {
  [ContentPageMutation.setContentPage]: ContentPageViewModel | null;
}

export const enum ContentPageAction {
  loadContentPage = 'loadContentPage',
  clearContentPage = 'clearContentPage'
}

export interface ContentPageActions {
  [ContentPageAction.loadContentPage]: (id: number) => void;
  [ContentPageAction.clearContentPage]: () => void;
}

export const enum ContentPageGetter {
  contentPage = 'contentPage'
}

export interface ContentPageGetterTypes {
  [ContentPageGetter.contentPage]: ContentPageViewModel | null;
}

export const CONTENT_PAGE_STATE_NAMESPACE = 'ContentPageState';
export const ContentPageNamespace = namespace(CONTENT_PAGE_STATE_NAMESPACE);

export type ContentPageModule = Override<
  Module<ContentPageStateTypes, WebRootState>,
  TypedModule<
    ContentPageStateTypes,
    ContentPageMutationPayloadTypes,
    ContentPageActions,
    ContentPageGetterTypes,
    WebRootState
  >
>;

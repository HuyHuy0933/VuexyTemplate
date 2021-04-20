import { BlogViewModel } from '@/api/api';
import { Module } from 'vuex';
import { TypedModule } from '../utility/module-utility-types';
import { WebRootState } from '../web-root-state';
import { namespace } from 'vuex-class';

export const enum BlogState {
  blog = 'blog'
}

export interface BlogStateTypes {
  [BlogState.blog]: BlogViewModel | null;
}

export const enum BlogMutation {
  setBlog = 'setBlog'
}

export interface BlogMutationPayloadTypes {
  [BlogMutation.setBlog]: BlogViewModel | null;
}

export const enum BlogAction {
  loadBlog = 'loadBlog',
  clearBlog = 'clearBlog'
}

export interface BlogActions {
  [BlogAction.loadBlog]: (id: number) => void;
  [BlogAction.clearBlog]: () => void;
}

export const enum BlogGetter {
  blog = 'blog'
}

export interface BlogGetterTypes {
  [BlogGetter.blog]: BlogViewModel | null;
}

export const BLOG_STATE_NAMESPACE = 'BlogState';
export const BlogNamespace = namespace(BLOG_STATE_NAMESPACE);

export type BlogModule = Override<
  Module<BlogStateTypes, WebRootState>,
  TypedModule<
    BlogStateTypes,
    BlogMutationPayloadTypes,
    BlogActions,
    BlogGetterTypes,
    WebRootState
  >
>;

import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import { BlogActions, BLOG_STATE_NAMESPACE } from './blog.module-types';

export const dispatchBlogAction: DispatchAction<BlogActions> = getDispatch(
  BLOG_STATE_NAMESPACE
);

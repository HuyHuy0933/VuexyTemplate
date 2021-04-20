import { getDispatch } from '../get-dispatch';
import { DispatchAction } from '../utility/dispatch-action';
import {
  ContentPageActions,
  CONTENT_PAGE_STATE_NAMESPACE
} from './content-page.module-types';

export const dispatchContentPageAction: DispatchAction<ContentPageActions> = getDispatch(
  CONTENT_PAGE_STATE_NAMESPACE
);

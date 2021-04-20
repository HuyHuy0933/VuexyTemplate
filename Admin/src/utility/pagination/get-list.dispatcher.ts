import store from '@/store';
import { ListAction } from './get-list.module-type';
import { ListDispatcher } from './list-vue.mixin';

export function getListDispatcher<TGetInput>(
  namespace: string
): ListDispatcher<TGetInput> {
  return {
    updateInput(updates: TGetInput) {
      return store.dispatch(`${namespace}/${ListAction.updateInput}`, updates);
    },
    load(gotoFirstPage = false) {
      return store.dispatch(`${namespace}/${ListAction.load}`, gotoFirstPage);
    },
    unload() {
      return store.dispatch(`${namespace}/${ListAction.unload}`);
    }
  };
}

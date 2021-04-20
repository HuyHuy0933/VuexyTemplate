import { DispatchOptions } from 'vuex';
import store from '.';

export function getDispatch(namespace: string) {
  return async (
    action: string,
    payload?: any,
    options?: DispatchOptions | undefined
  ): Promise<any> => {
    return await store.dispatch(`${namespace}/${action}`, payload, options);
  };
}

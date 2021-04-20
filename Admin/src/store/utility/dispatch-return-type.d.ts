export type DispatchReturnType<T extends AnyFunction> =
  | Promise<ReturnType<T>>
  | ReturnType<T>;

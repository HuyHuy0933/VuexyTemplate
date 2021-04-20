declare type Override<TOriginal, TOverrides> = Omit<
  TOriginal,
  keyof TOverrides
> &
  TOverrides;

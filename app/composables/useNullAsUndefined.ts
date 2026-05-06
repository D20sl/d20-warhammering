export default function useNullAsUndefined<
  TState extends Record<string, unknown>,
  TKey extends keyof TState,
>(state: Ref<TState>, prop: TKey) {
  type Value = Exclude<TState[TKey], null>;
  return computed<Value>({
    get: () => (state.value[prop] ?? undefined) as Value,
    set: (val) => {
      state.value[prop] = val as TState[TKey];
    },
  });
}

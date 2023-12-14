"use client";

export function StateDebugger({
  useHook,
}: {
  useHook: (fn: (store: any) => any) => any;
}) {
  const state = useHook(state => state);

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}

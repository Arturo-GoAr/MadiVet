"use client";

import { useCallback, useEffect, useState } from "react";
import { api, REFRESH_EVENT } from "./client";

// `path` null = no pedir (p. ej. mientras falta un id). Se recarga solo tras cualquier mutación.
export function useApi<T>(path: string | null) {
  const [state, setState] = useState<{ path: string | null; data?: T; error?: Error }>({ path: null });
  const [rev, setRev] = useState(0);
  const reload = useCallback(() => setRev((n) => n + 1), []);

  useEffect(() => {
    window.addEventListener(REFRESH_EVENT, reload);
    return () => window.removeEventListener(REFRESH_EVENT, reload);
  }, [reload]);

  useEffect(() => {
    if (!path) return;
    let stale = false;
    api<T>(path)
      .then((data) => !stale && setState({ path, data }))
      .catch((error: Error) => !stale && setState({ path, error }));
    return () => {
      stale = true;
    };
  }, [path, rev]);

  const current = state.path === path ? state : undefined;
  return { data: current?.data, error: current?.error, loading: !!path && !current, reload };
}

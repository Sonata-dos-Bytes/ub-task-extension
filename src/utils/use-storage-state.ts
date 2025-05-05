import { useEffect, useCallback, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (_state: [boolean, T | null], action: T | null = null): [boolean, T | null] =>
      [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== state[1]) {
        setState(storedValue);
      }
    } catch (e) {
      console.error("Erro ao acessar o localStorage:", e);
    }
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
        if (value !== state[1]) {
          setState(value);
        }
      } catch (e) {
        console.error("Erro ao salvar no localStorage:", e);
      }
    },
    [key, state]
  );

  return [state, setValue];
}
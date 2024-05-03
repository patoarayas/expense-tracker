import { createContext, useReducer, type ReactNode } from "react";
import type { DefaultCategorization } from "../types/DefaultCategorization";
import { getLocalStorage, setLocalStorage } from "../helpers";

export interface DefaultCategorizationStoreAction {
  type: "ADD" | "UPDATE";
  payload: DefaultCategorization;
}

interface DefaultCategorizationProvider {
  children: ReactNode;
}

const localStorageKey = "defaultCategorization";

export const DefaultCategorizationContext = createContext(
  [] as DefaultCategorization[]
);
export const DefaultCategorizationDispatchContext = createContext(null as any);

export function DefaultCategorizationProvider({
  children,
}: DefaultCategorizationProvider) {
  const [defaultCategorization, dispatch] = useReducer(
    reducer,
    null,
    setInitialState
  );

  return (
    <DefaultCategorizationContext.Provider value={defaultCategorization}>
      <DefaultCategorizationDispatchContext.Provider value={dispatch}>
        {children}
      </DefaultCategorizationDispatchContext.Provider>
    </DefaultCategorizationContext.Provider>
  );
}

function setInitialState(): DefaultCategorization[] {
  return getLocalStorage(localStorageKey, []);
}

function reducer(
  state: DefaultCategorization[],
  action: DefaultCategorizationStoreAction
) {
  switch (action.type) {
    case "ADD":
      return add(state, action.payload);
    case "UPDATE":
      return update(state, action.payload);
    default:
      throw Error("Unknow action");
      break;
  }
}

function add(state: DefaultCategorization[], payload: DefaultCategorization) {
  if (!state.some((x) => x.key === payload.key)) {
    const newState: DefaultCategorization[] = [...state, payload];
    setLocalStorage(localStorageKey, newState);
    return newState;
  }
  const result = [...state];

  setLocalStorage(localStorageKey, result);

  return [...state];
}

function update(
  state: DefaultCategorization[],
  payload: DefaultCategorization
) {
  const filtered = [...state].filter((x) => x.key === payload.key);
  const result = [...filtered, payload];
  setLocalStorage(localStorageKey, result);

  return result;
}

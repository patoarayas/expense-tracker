import react, { useReducer, createContext, type ReactNode } from "react";
import type { Movement } from "../types/Movement";
import { dateStringToDate, getLocalStorage, setLocalStorage } from "../helpers";
export interface Action {
  type: "ADD" | "UPDATE" | "DELETE";
  payload: Movement[];
}

interface MovementsProvider {
  children: ReactNode;
}

const localStorageKey = "movements";
export const MovementsContext = createContext([] as Movement[]);
export const MovementsDispatchContext = createContext(null as any);

export function MovementsProvider({ children }: MovementsProvider) {
  const [movements, dispatch] = useReducer(reducer, null, setInitialState);

  return (
    <MovementsContext.Provider value={movements}>
      <MovementsDispatchContext.Provider value={dispatch}>
        {children}
      </MovementsDispatchContext.Provider>
    </MovementsContext.Provider>
  );
}

// Reducer

function setInitialState() {
  return getLocalStorage(localStorageKey, []);
}

function reducer(state: Movement[], action: Action): Movement[] {
  switch (action.type) {
    case "ADD":
      return add(state, action.payload);
    case "UPDATE":
      return update(state, action.payload);
    case "DELETE":
      return dlt(state, action.payload);
    default:
      throw Error("Unknow action");
      break;
  }
}

function add(state: Movement[], payload: Movement[]): Movement[] {
  const update: Movement[] = payload
    .map((movement) => {
      if (movement) {
        const exist = state.some((x) => {
          return (
            x.amount === movement.amount &&
            x.currency === movement.currency &&
            x.description === movement.description &&
            x.date === movement.date &&
            x.origin === movement.origin && // TODO: FIX comparison
            x.type === movement.type &&
            x.source === movement.source &&
            x.installments?.current === movement.installments?.current &&
            x.installments?.total === movement.installments?.total
          );
        });
        if (!exist) {
          return movement;
        }
      }
    })
    .filter((movement): movement is Movement => movement !== undefined);

  const result = [...state, ...update].sort((a, b) => {
    return (
      dateStringToDate(b.date).getTime() - dateStringToDate(a.date).getTime()
    );
  });

  setLocalStorage(localStorageKey, result);

  return result;
}

function update(state: Movement[], payload: Movement[]): Movement[] {
  // del estado eliminar los que vinene en payload
  // retornar estado + payload
  const update: Movement[] = [...state].filter((movement) => {
    const exist = payload.some((x) => {
      return (
        x.amount === movement.amount &&
        x.currency === movement.currency &&
        x.description === movement.description &&
        x.date === movement.date &&
        x.origin === movement.origin && // TODO: FIX comparison
        x.type === movement.type &&
        x.source === movement.source &&
        x.installments?.current === movement.installments?.current &&
        x.installments?.total === movement.installments?.total
      );
    });
    if (!exist) {
      return movement;
    }
  });
  const result = [...update, ...payload];
  const sorted = result.toSorted((a, b) => {
    return (
      dateStringToDate(b.date).getTime() - dateStringToDate(a.date).getTime()
    );
  });

  setLocalStorage(localStorageKey, sorted);
  return sorted;
}

function dlt(state: Movement[], payload: Movement[]): Movement[] {
  const update: Movement[] = [...state].filter((movement) => {
    const exist = payload.some((x) => {
      return (
        x.amount === movement.amount &&
        x.currency === movement.currency &&
        x.description === movement.description &&
        x.date === movement.date &&
        x.origin === movement.origin && // TODO: FIX comparison
        x.type === movement.type &&
        x.source === movement.source &&
        x.installments?.current === movement.installments?.current &&
        x.installments?.total === movement.installments?.total
      );
    });
    if (!exist) {
      return movement;
    }
  });

  const result = [...update];
  const sorted = result.toSorted((a, b) => {
    return (
      dateStringToDate(b.date).getTime() - dateStringToDate(a.date).getTime()
    );
  });

  setLocalStorage(localStorageKey, sorted);
  return sorted;
}

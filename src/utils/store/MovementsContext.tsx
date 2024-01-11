import react, { useReducer, createContext, type ReactNode } from "react";
import type { Movement } from "../types/SaldAndMovements";

export interface Action {
  type: "ADD";
  payload: Movement[];
}

interface MovementsProvider {
  children: ReactNode;
}

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
  return [];
}

function reducer(state: Movement[], action: Action) {
  switch (action.type) {
    case "ADD":
      return add(state, action.payload);
      break;
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
            x.origin === movement.origin &&
            x.type === movement.type &&
            x.city === movement.city &&
            x.installments.current === movement.installments.current &&
            x.installments.total === movement.installments.total
          );
        });
        if (!exist) {
          return movement;
        }
      }
    })
    .filter((movement): movement is Movement => movement !== undefined);

  return [...state, ...update];
}

import { createContext, useReducer, type ReactNode } from "react";
import { DefaultCategories, type Category } from "../types/Categories";

export interface CategoriesStoreAction {
  type: "ADD" | "DELETE";
  payload: Category;
}

interface CategoriesProvider {
  children: ReactNode;
}

export const CategoriesContext = createContext([] as Category[]);
export const CategoriesDispatchContext = createContext(null as any);

export function CategoriesProvider({ children }: CategoriesProvider) {
    const [categories, dispatch] = useReducer(reducer, null, setInitialState);
  
    return (
      <CategoriesContext.Provider value={categories}>
        <CategoriesDispatchContext.Provider value={dispatch}>
          {children}
        </CategoriesDispatchContext.Provider>
      </CategoriesContext.Provider>
    );
  }

// Reducer

function setInitialState() : Category[] {
    const defaultCategories = Object.values(DefaultCategories);
    return defaultCategories.map(x => {return {name:x}})
  }
  
  function reducer(state: Category[], action: CategoriesStoreAction) {
    switch (action.type) {
      case "ADD":
        return add(state, action.payload);
    case "DELETE":
        return del(state,action.payload)
      default:
        throw Error("Unknow action");
        break;
    }
  }

  function add(state: Category[], payload: Category): Category[] {
    const exist: boolean = state.find(x => x.name === payload.name) !== undefined 

    if(exist){
        return [...state]
    }else{
        return [...state, payload];
    }
    
  }

  function del(state: Category[], payload: Category): Category[]{

    const update = [...state].filter(x => x.name !== payload.name)

    return [...update]
  }
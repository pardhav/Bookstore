import React, { useContext } from "react";


export interface IGlobalState {
    state: {
        showHeader?: boolean;
        toggleHeader?: () => void;
    };
  showHeader?: boolean;
}

export const defaultState: IGlobalState ={
    state: { showHeader: false, }
};

const GlobalContext = React.createContext<IGlobalState>(defaultState);

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;

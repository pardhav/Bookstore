import { UserCredential } from "firebase/auth";
import React, { useContext } from "react";

export interface IGlobalState {
  state: {
    showHeader: boolean;
    toggleHeader: () => void;
    userData?: UserCredential;
    spinnerStatus: boolean;
    showSpinner: () => void;
    hideSpinner: () => void;
  };
}
export const defaultState: IGlobalState = {
  state: {
    showHeader: false,
    toggleHeader: () => {},
    spinnerStatus: false,
    showSpinner: () => {},
    hideSpinner: () => {},
  },
};

export const GlobalContext = React.createContext<IGlobalState>(defaultState);

export const useGlobalContext = () => useContext(GlobalContext);


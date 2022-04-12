import { UserCredential } from 'firebase/auth';
import React, { useContext } from "react";


export interface IGlobalState {
    state: {
        showHeader: boolean;
        toggleHeader: () => void;
        userData?: UserCredential;
    };
}

export const defaultState: IGlobalState ={
    state: { showHeader: false,toggleHeader:()=>{} }
};

const GlobalContext = React.createContext<IGlobalState>(defaultState);

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;

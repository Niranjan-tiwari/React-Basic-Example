import React, { useReducer, createContext } from 'react';

const initialState = {
    username: "useruser",
    password: localStorage.getItem('newPass') ? localStorage.getItem('newPass') : "12345678",
    isLoggedIn: localStorage.getItem('user') ? true : false
}

function reducer(state, action) {     
    switch(action.type) {
        case 'UPDATE_PASS':
            return{
                ...state,    
                password: action.password,                            
            };
        case 'LOGIN':            
            return{
                ...state,
                isLoggedIn: true,                
            };
        case 'LOGOUT':
            return{
                ...state,
                isLoggedIn: false,                
            }
        default: return state;
    }
}

export const  Context = createContext();

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);        
    return(
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Store;
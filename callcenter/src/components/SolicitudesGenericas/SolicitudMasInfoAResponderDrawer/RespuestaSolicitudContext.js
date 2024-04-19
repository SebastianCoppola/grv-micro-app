import { createContext, useContext, useReducer } from "react";

const initialValue = {
    respuesta: null
};

const updateRespuesta = 'updateRespuesta';
const reset = 'reset';

const respuestaReducer = (state, action) => {
    switch (action.type) {
        case updateRespuesta: {
            return { ...state, respuesta: action.payload };
        }
        case reset: {
            return initialValue;
        }
        default: return state;
    }
};

export const respuestaSolicitudActionCreator = {
    updateRespuesta: (payload) => ({ type: updateRespuesta, payload }),
    reset: () => ({ type: reset })
};

const Context = createContext([{}, () => { }]);

export const useRespuestaSolicitudContext = () => useContext(Context) //HOOK

export const RespuestaSolicitudProvider = ({ children }) => { //PROVIDER
    const [respuesta, dispatch] = useReducer(respuestaReducer, initialValue);

    return (
        <Context.Provider value={[respuesta, dispatch]}>
            {children}
        </Context.Provider>
    );
};

import {
    SET_CONTACTOS,
    SET_LOADING_CONTACTOS,
    CAMPANA_NOTIFICACIONES
  } from '../actionTypes'
  
  const initialState = {
    agendaContactos: [],
    loadingContactos : false,
    campanaNotificaciones:null
  }
  
  const contactos = (state = initialState, action) => {
      switch (action.type) {
        case SET_CONTACTOS:
            return {
                ...state,
                agendaContactos: action.payload
            }
            break;
        case SET_LOADING_CONTACTOS:
            return {
                ...state,
                loadingContactos: action.payload
            }
            break;
        case CAMPANA_NOTIFICACIONES:
            return {
                ...state,
                campanaNotificaciones: action.payload
            }
            break;
        default:
            return state;
      }
  }
  export default contactos
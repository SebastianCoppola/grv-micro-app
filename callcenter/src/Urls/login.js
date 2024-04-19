import { CONTEXT_LOGIN, PORT_ESTADO_CIVIL, URL_API } from "./baseContextURL"

export const URL_LOGIN = process.env.REACT_APP_URL_LOGIN
export const PORT_LOGIN = process.env.REACT_APP_PORT_LOGIN

//WS LOGIN
export const FECTH_URL_LOGIN = `${URL_API}${PORT_ESTADO_CIVIL}${CONTEXT_LOGIN}/login/token`

//URI PATH LOGIN FACE RECOGNITION
export const URL_PATH_LOGIN = `${URL_LOGIN}${PORT_LOGIN}/login`
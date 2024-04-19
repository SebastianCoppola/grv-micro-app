//BASE
export const PORT_LOGIN = process.env.REACT_APP_PORT_LOGIN
export const URL_UI = process.env.REACT_APP_URL_UI
export const URL_PORT_HOME = process.env.REACT_APP_PORT_HOME
export const URL_HOME = process.env.REACT_APP_URL_HOME
export const URL_PORT_PORTAL_CLIENTES = process.env.REACT_APP_PORT_PORTAL_CLIENTES
export const CONTEXT_LOGIN = '/grv/login'
export const CONTEXT_NOTIFICACIONES = '/grv/notificaciones'

//LOGIN LOCAL
// export const FECTH_URL_LOGIN = `http://localhost:8080/wslogin/login/token` -> Local
// export const FETCH_URL_FACE_RECOGNITION_VALIDATE = "http://localhost:8080/wslogin/login/verify-face-recognition-required"

//LOGIN
export const FECTH_URL_LOGIN = `/api${PORT_LOGIN}${CONTEXT_LOGIN}/login/token`
export const FETCH_URL_FACE_RECOGNITION_VALIDATE = `/api${PORT_LOGIN}${CONTEXT_LOGIN}/login/verify-face-recognition-required`

//REDIRECCIONES
export const URL_FRONT_UI = `${URL_HOME}${URL_PORT_HOME}`;
export const URL_FRONT_PORTAL_CLIENTE = `${URL_HOME}${URL_PORT_PORTAL_CLIENTES}/portal/home`

//Notificaciones
export const URL_FETCH_MAIL_SOPORTE = `/api${PORT_LOGIN}${CONTEXT_NOTIFICACIONES}/email/face-recognition-soporte`
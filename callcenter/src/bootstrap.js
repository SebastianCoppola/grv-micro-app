import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux' 

//Mount function to start up the App:
const mount = (rootElement, { onNavigate, defaultHistory, initialPath, usuarioActivo, rutas }) => {
    
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    
    if(onNavigate){ 
        history.listen(onNavigate) 
    }
        
    ReactDOM.render(
        <Provider store={store}>
            <App usuarioActivo={usuarioActivo} history={history} rutas={rutas}/>
        </Provider>,
        rootElement
    )
    
    return {
        onParentNavigate({pathname: nextPathname}) {
            if(history.location.pathname !== nextPathname){
                history.push(nextPathname)
            }
        }
    }
}

//If we are in dev and isolation, call mount immediately:
if(process.env.NODE_ENV === 'development'){
    let devRoot = document.getElementById('_callcenter-dev-root')
    if (devRoot) { 
        let usuarioActivo = { id: null, nombre: '', apellido: '', roles: null, isOperador: true, apps: [], area: [] }
        mount(devRoot, { defaultHistory: createBrowserHistory(), usuarioActivo }) 
    }
}

//If we are running through Container, we should export mount function: 
export { mount }
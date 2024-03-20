import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

//Mount function to start up the App:
const mount = (rootElement, { onNavigate, defaultHistory, initialPath }) => {
    
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })

    if(onNavigate){ 
        history.listen(onNavigate) 
    }
    
    ReactDOM.render(
        <App initialPath={initialPath} history={history}/>,
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
    let devRoot = document.getElementById('_login-dev-root')
    if (devRoot) { 
        mount(devRoot, { defaultHistory: createBrowserHistory() }) 
    }
}

//If we are running through Container, we should export mount function: 
export { mount }
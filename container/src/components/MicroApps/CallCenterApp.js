import React, {useRef, useEffect} from 'react'
import { mount } from 'callcenter/CallCenterApp'
import { useHistory } from 'react-router-dom' 

const CallCenterApp = ({usuarioActivo, rutas}) => {
    
    const ref = useRef(null)
    const history = useHistory()

    useEffect(()=>{
        const { onParentNavigate, denuncia } = mount( ref.current, { 
            onNavigate: ({ pathname: nextPathname }) => { 
                if(history.location.pathname !== nextPathname){
                    history.push(nextPathname)
                }
            },
            initialPath: history.location.pathname,
            usuarioActivo,
            rutas
        })
        history.listen(onParentNavigate) 
    },[history])

    return <div ref={ref} />   
}

export default CallCenterApp
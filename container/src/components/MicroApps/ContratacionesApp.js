import React, {useRef, useEffect} from 'react'
import { mount } from 'contrataciones/ContratacionesApp'
import { useHistory } from 'react-router-dom' 

const ContratacionesApp = ({usuarioActivo, rutas}) => {
    
    const ref = useRef(null)
    const history = useHistory()

    useEffect(()=>{
        const { onParentNavigate } = mount( ref.current, { 
            onNavigate: ({ pathname: nextPathname }) => { 
                if(history.location.pathname !== nextPathname){
                    history.push(nextPathname)
                }
            },
            initialPath: history.location.pathname,
            usuarioActivo,
            rutas,
        })
        history.listen(onParentNavigate) 
    },[history])

    return <div ref={ref} />   
}

export default ContratacionesApp
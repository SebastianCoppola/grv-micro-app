import React, {useRef, useEffect} from 'react'
import { mount } from 'login/LoginApp'
import { useHistory } from 'react-router-dom' 

const LoginApp = () => {
   
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
        })
        history.listen(onParentNavigate) 
    },[])

    return <div ref={ref} />   
}

export default LoginApp
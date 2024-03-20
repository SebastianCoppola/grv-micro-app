import React from "react"
import { useLocation } from "react-router-dom"

export function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
}

export function useMountedRef() {
    const mountedRef = React.useRef(false)
  
    React.useEffect(() => {
        setTimeout(() => {
            mountedRef.current = true
        })
    }, [])
  
    return mountedRef
}
import React from 'react'
//ESTILOS
import { makeStyles } from '@material-ui/core/styles'
//COMPONENTES
import MenuProveedor from './MenuProveedor'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '85vh'
    },
    content: {
        flexGrow: 1,
        paddingLeft:'15px',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
        // padding: theme.spacing(3),
    },
}))

const ContenedorMenuProveedores = props => {
    const classes = useStyles(props)
    const {children} = props
    
    return (
        <div className={classes.root} >
            <MenuProveedor/>
            <main className={classes.content} >
                {children}
            </main>
        </div>
    )
}

export default ContenedorMenuProveedores

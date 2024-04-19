import React from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions/index'
//Utils:
import { estadosCEM, MENSAJE_REINGRESO, MENSAJE_REINGRESO2 } from '../../../../../Utils/const'
//Mui:
import { Grid, makeStyles } from '@material-ui/core'
//Components:
import Buscador from '../../../../commons/Buscador/buscador'
import CustomTypography from '../../../../commons/Typography/CustomTypography'
import CustomAlert from '../../../../commons/CustomAlert/customAlert'
import Loader from '../../../../commons/Loading/Loader'

const useStyles = makeStyles({
    texto2: {
        paddingLeft: '5px'
    }
})

const BuscadorReingreso = (props) => {
    
    const { dataBuscadorReingreso, setDataBuscadorReingreso,
        errorReingreso, setErrorReingreso, listaReingreso, setListaReingreso,
        valueForm, setValueForm, open, setOpen, denuncia } = props
       
    const classes = useStyles(props)
    const dispatch = useDispatch()
    
    const loadingDenunciasAnterioresReingreso = useSelector(state => state.documentos.loadingDenunciasAnterioresReingreso)


    // buscadorReingreso
    const handleBuscadorReingreso = (tipoDoc, nroDoc) => {
        setDataBuscadorReingreso(dataBuscador => ({ ...dataBuscador, tipoDoc: tipoDoc, nroDoc: nroDoc }))
        let callBack = (data) => {
            if (data) {
                setOpen(true)
                setListaReingreso(data)
                setErrorReingreso(false)
                setValueForm(null)
            } else {
                setOpen(false)
                setErrorReingreso(true)
                setValueForm(null)
            }
        }
        let req = {                            
            nroDoc: nroDoc,
            tipoDoc: tipoDoc,
            estadoCem: estadosCEM.NO_BORRADOR,
            idEmpleador: denuncia?.empleadorIdEmpleador ? [denuncia?.empleadorIdEmpleador] : null
        }
        if (nroDoc) {
            dispatch(actions.searchDenunciasAnteriores(req, callBack))
        }
    }

    //buscador reingreso
    const handleCloseReingreso = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorReingreso(false)
    };

    return (
        <Grid container spacing={2}>

            <Buscador
                onClik={handleBuscadorReingreso}
                data={dataBuscadorReingreso}
                setDataBuscador={setDataBuscadorReingreso} 
            />

            {loadingDenunciasAnterioresReingreso ?
                <Grid item xs={12}>
                    <Loader loading={loadingDenunciasAnterioresReingreso} />
                </Grid>
            : null}

            <Grid item xs={12}>
                {open && listaReingreso ?
                    <>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        {MENSAJE_REINGRESO}
                                    </div>
                                    <div className={classes.texto2}>{dataBuscadorReingreso && dataBuscadorReingreso.tipoDoc ? dataTipoDoc[dataBuscadorReingreso && dataBuscadorReingreso.tipoDoc - 1] && dataTipoDoc[dataBuscadorReingreso && dataBuscadorReingreso.tipoDoc - 1].descripcion : ''}</div>
                                    <div className={classes.texto2}>{dataBuscadorReingreso && dataBuscadorReingreso.nroDoc ? dataBuscadorReingreso.nroDoc : ''}</div>
                                </div>
                            } 
                            variant={'subtitle2'} 
                            fontweight={'600'} 
                        />
                        <CustomTypography 
                            text={MENSAJE_REINGRESO2} 
                            variant={'subtitle2'} 
                            fontweight={'600'} 
                        />
                    </>
                : null}
            </Grid>

            <Grid item container xs={12} justify='center' alignItems='center'>
                {errorReingreso ?
                    <Grid item xs={12}>
                        <CustomAlert
                            recordatorioAlert={false}
                            message={'No se encontro ninguna denuncia anterior'}
                            onClose={handleCloseReingreso}
                            variant={'outlined'}
                            severity='error'
                            open={errorReingreso}
                        />
                    </Grid>
                : null}
            </Grid>

        </Grid>
    )
}
export default BuscadorReingreso

const dataTipoDoc = [
    { codigo: 1, descripcion: 'DNI' },
    { codigo: 2, descripcion: 'CI' },
    { codigo: 3, descripcion: 'LE' },
    { codigo: 4, descripcion: 'LC' },
]
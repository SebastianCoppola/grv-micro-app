import React, { Fragment } from 'react'
import ModalPage from '../../../../commons/Modal/ModalPage'
import CustomButton from '../../../../commons/Button/CustomButton'
//material-ui
import Grid from '@material-ui/core/Grid';
import CustomTypography from '../../../../commons/Typography/CustomTypography'
import * as actions from '../../../../../redux/actions/index'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Confirmacion = (props) => {
    const { data, snackBar, clikCompletarEdicion, setProveedor } = props
    const { openConfirmacion, setOpenConfirmacion } = props
    const [grabar, setGrabar] = React.useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    const aceptarGrabar = () => {
        dispatch(actions.saveProveedor(data, callbackGuardar))
    }
    
    const callbackGuardar = (succes) => {
        if (succes) {
            setGrabar(true)
        } else {
            setOpenConfirmacion(false)
            snackBar(
                true,
                'error',
                <div>
                    Ocurrio un error al guardar el proveedor, vuelva a intentarlo
                </div>
            )
        }
    }

    const Cancelar = () => {
        setGrabar(false)
        setOpenConfirmacion(false)
        history.push({
            pathname: '/home/proveedores',
        })
    }
    return (
        <>
            {setOpenConfirmacion ?
                <ModalPage open={openConfirmacion}
                    fullWidth={true}
                    maxWidth={'xs'}
                    divisor={true}

                    title={<CustomTypography variant={'body1'}
                    text={<strong>Confirmar nuevo proveedor</strong>} />}
                    subtitle={<CustomTypography variant={'body2'}
                        text={<>
                            <div>{`Darás de alta a ${data ? data.razonSocial : null}.`}</div>
                            <div>
                                ¿Desea confirmar la creación del nuevo proveedor?
                            </div>
                        </>}
                    />}
                    actions={[<CustomButton
                        variant={'outlined'}
                        isAction={true}
                        label='Volver'
                        onClik={() => setOpenConfirmacion(false)}
                    />,
                    <CustomButton
                        label={'Confirmar'}
                        variant={'contained'}
                        color={'primary'}
                        onClik={aceptarGrabar}
                        size={'large'}
                        isAction={true}
                    />
                    ]}
                />
                : null}
            {grabar ?
                <ModalPage open={grabar}
                    fullWidth={true}
                    maxWidth={'xs'}
                    divisor={true}
                    title={<CustomTypography variant={'body1'}
                    text={<strong>{`Proveedor ${data ? data.razonSocial : null}`}</strong>} />}
                    subtitle={<CustomTypography variant={'body2'}
                        text={<>
                            <div> Se ha generado exitosamente el alta del proveedor.</div>
                            <div>
                                Luego podrás completar los datos faltantes desde la
                                tabla de proveedores o podrás continuar la edición ahora.
                            </div>
                        </>}
                    />}
                    actions={[<CustomButton
                        variant={'outlined'}
                        isAction={true}
                        label='Ir al inicio'
                        onClik={Cancelar}
                    />,
                    <CustomButton
                        label={'Completar edición'}
                        variant={'contained'}
                        color={'primary'}
                        onClik={clikCompletarEdicion}
                        disabled={false}
                        size={'large'}
                        isAction={true}
                        
                    />
                    ]}
                /> : null}
        </>
    )
}
export default Confirmacion
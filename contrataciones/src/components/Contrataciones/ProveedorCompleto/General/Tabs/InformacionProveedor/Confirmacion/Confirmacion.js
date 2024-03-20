import React, {useState} from 'react'
//Components:
import ModalPage from '../../../../../../commons/Modal/ModalPage';
import CustomButton from '../../../../../../commons/Button/CustomButton';
import CustomTypography from '../../../../../../commons/Typography/CustomTypography'

const Confirmacion = (props) => {
    const { texts, openConfirmacion, setOpenConfirmacion,aceptarGrabar, openGuardardo, setOpenGuardado} = props

    const aceptar = () => {
        setOpenConfirmacion(false);
        setOpenGuardado(false);
    }

    return (
        <>
            {setOpenConfirmacion ?
                <ModalPage open={openConfirmacion}
                    fullWidth={true}
                    maxWidth={'xs'}
                    minHeight={'lg'}
                    divisor={true}
                    title={
                        <CustomTypography 
                            variant={'body1'} 
                            text={ <strong>{texts.title}</strong> }
                        />
                    }
                    subtitle={
                        <CustomTypography 
                            variant={'body2'}
                            text={ <div>{texts.description} ¿Desea confirmar esta acción?</div> }
                        />
                    }
                    actions={[
                        <CustomButton
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
            {openGuardardo ?
                <ModalPage open={openGuardardo}
                    fullWidth={true}
                    maxWidth={'xs'}
                    minHeight='1000'
                    divisor={true}
                    title={
                        <CustomTypography 
                            variant={'body1'} 
                            text={<strong>Edición exitosa</strong>}
                        />
                    }
                    subtitle={
                        <CustomTypography 
                            variant={'body2'}
                            text={ <div>Los cambios en el proveedor han sido guardados correctamente.</div> }
                        />
                    }
                    actions={[
                        <CustomButton
                            variant={'contained'}
                            color={'primary'}
                            isAction={true}
                            label='Aceptar'
                            onClik={aceptar}
                        />
                    ]}
                /> : null}
        </>
    )
}

export default Confirmacion;
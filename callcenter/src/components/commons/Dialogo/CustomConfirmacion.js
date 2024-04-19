import React from 'react'
//Components: 
import ModalPage from '../Modal/ModalPage'
import CustomTypography from '../Typography/CustomTypography'
import CustomButton from '../Button/CustomButton'

const CustomConfirmacion = props => {

    const { openConfirmacion, title, text, handleConfirmar, handleCancelar} = props

    return (
        <ModalPage 
            open={openConfirmacion}
            fullWidth={true}
            maxWidth={'xs'}
            divisor={true}
            title={ <CustomTypography variant={'body1'}  text={<strong>{title}</strong>}/> }
            subtitle={ <CustomTypography variant={'body2'} text={<>{text}</>}/> }
            actions={[  
                <CustomButton
                    onClik={handleCancelar}
                    label='Volver'
                    variant={"contained"}
                    width={'90px'}
                    height={'40px'}
                    isAction={true}
                    styleLabel={{ fontSize: '14px', fontWeight: 'bold', color: '#747474' }}
                    styleButton={{ border: 'solid 2px #747474', backgroundColor: '#ffffff', }}
                />,
                <CustomButton
                    label={'Confirmar'}
                    onClik={handleConfirmar}
                    color={'primary'}
                    startIcon={false}
                    width={'105px'}
                    height={'40px'}
                    variant={"contained"}
                    isAction={true}
                />
            ]}
        />            
    )
}

export default CustomConfirmacion

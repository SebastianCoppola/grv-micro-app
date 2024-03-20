import React from 'react'
import PropTypes from 'prop-types';
//material-ui
import MobileStepper from '@material-ui/core/MobileStepper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
//estilo
import { makeStyles, useTheme } from '@material-ui/core/styles';
//componentes
import CustomButton from '../Button/CustomButton';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& .MuiMobileStepper-root': {
            backgroundColor: 'transparent',
            padding: '10px 0px'
        }
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
    },
    img: {
        minHeight: '100%',
        minWidth: 400,
        width: '100%',
        flexGrow: 1,
    },
}));

const AdminSlide = (props) => {
    const { contenido, backBoton, buttonCancelar, labelBackBoton, labelButtonCancelar,
        labelButtonSiguiente,labelButtonDescargarPDF,variantButtonDescargar, variantBackBoton, variantButtonCancelar, variantButtonSiguiente,
        onClickCancelar, valueHabilitadoSiguiente, handleBack, colorCancelar,
        handleNext, activeStep, setActiveStep, alineacionTexto, disabled, isAction,
        maxSteps, stepper, paso1, paso2, paso3, prueba,
        cuartoBoton, labelCuartoBoton, variantCuartoBoton, handleCuarto, getStep,
        buttons, confirmacionTraslado, handleDescargarPDF } = props
    const classes = useStyles(props);
    const theme = useTheme();

    function getSteps() {
        return getStep ? ['Validación Denuncia', 'Información traslado', 'Recorrido', 'Reserva mail', 'Confirmación']
            : ['Información traslado', 'Recorrido', 'Reserva mail', 'Confirmación'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Información traslado';
            case 1:
                return 'Recorrido';
            case 2:
                return 'Reserva mail';
            case 3:
                return 'Confirmación'
            default:
                return '';
        }
    }

    const steps = getSteps();

    return (
        <div className={classes.root}>
            {stepper ?
                <Grid item xs={12}>
                    <Stepper activeStep={activeStep} alternativeLabel style={{ padding: '24px 0px' }}>
                        {steps.map((label) => (
                            <Step >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>
                : null}
            <Grid container
                alignItems={(activeStep === (maxSteps - 2) && confirmacionTraslado) || activeStep === (maxSteps - 1) && (maxSteps > 1) ? 'center' : 'flex-start'}
                justify={(activeStep === (maxSteps - 2) && confirmacionTraslado) || (activeStep === (maxSteps - 1) && prueba === undefined) ? 'center' : 'flex-start'} className={classes.img}>
                <Grid item xs={12}>
                    {contenido[activeStep].texto}
                </Grid>
            </Grid>
            <MobileStepper
                //steps={maxSteps}
                position="static"
                variant={<div></div>}
                activeStep={activeStep}
                nextButton={
                    <div >
                        <Grid container spacing={2} style={{ marginTop: "20px" }}>
                            {buttonCancelar && (activeStep !== maxSteps - 1 || maxSteps === 1) ?
                                <Grid item >
                                    <CustomButton
                                        size="medium"
                                        variant={variantButtonCancelar}
                                        color={colorCancelar}
                                        isAction={true}
                                        label={labelButtonCancelar}
                                        disabled={disabled}
                                        onClik={onClickCancelar} />
                                </Grid>
                                : null}
                            {labelButtonDescargarPDF ? <Grid item>
                                <CustomButton
                                    size="medium"
                                    variant={variantButtonDescargar}
                                    color='primary'
                                    label={labelButtonDescargarPDF}
                                    isAction={true}
                                    onClik={handleDescargarPDF}
                                />
                            </Grid> : null}
                            {labelButtonSiguiente ? <Grid item>
                                <CustomButton
                                    size="medium"
                                    variant={variantButtonSiguiente}
                                    color='primary'
                                    label={labelButtonSiguiente}
                                    isAction={true}
                                    onClik={handleNext}
                                    disabled={valueHabilitadoSiguiente}
                                />
                            </Grid> : null}
                            {buttons ? buttons : null}
                        </Grid>
                    </div>
                }
                backButton={backBoton && (activeStep !== maxSteps - 1 || maxSteps === 1) ?
                    <div >
                        <Grid container spacing={2}>

                            <Grid item>
                                <CustomButton
                                    isAction={isAction}
                                    size="small"
                                    label={labelBackBoton}
                                    onClik={handleBack}
                                    variant={variantBackBoton ? variantBackBoton : null}
                                    disabled={activeStep === 0 && !isAction}
                                    startIcon={!isAction ? theme.direction === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon /> : null} />
                            </Grid>

                            {cuartoBoton ?
                                <Grid item>
                                    <CustomButton
                                        isAction={isAction}
                                        size="small"
                                        label={labelCuartoBoton}
                                        onClik={handleCuarto}
                                        variant={variantCuartoBoton}
                                    />
                                </Grid>
                                : null}
                        </Grid>
                    </div>
                    : <div></div>
                }
            />
        </div>
    )
}
AdminSlide.propTypes = {
    contenido: PropTypes.any,
    buttonCancelar: PropTypes.any,
    backBoton: PropTypes.any,
    labelBackBoton: PropTypes.string,
    labelButtonCancelar: PropTypes.string,
    labelButtonSiguiente: PropTypes.string,
    variantBackBoton: PropTypes.string,
    variantButtonCancelar: PropTypes.string,
    variantButtonSiguiente: PropTypes.string,
    onClickCancelar: PropTypes.any,
    valueHabilitadoSiguiente: PropTypes.any,
    handleNext: PropTypes.any,
    activeStep: PropTypes.any,
    setActiveStep: PropTypes.any,
    maxSteps: PropTypes.any,
    alineacionTexto: PropTypes.any,
    disabled: PropTypes.any,
    stepper: PropTypes.any,
    paso1: PropTypes.string,
    paso2: PropTypes.string,
    paso3: PropTypes.string,
    isAction: PropTypes.any,
    handleBack: PropTypes.any,
    cuartoBoton: PropTypes.any,
    labelCuartoBoton: PropTypes.any,
    handleCuarto: PropTypes.any,
    variantCuartoBoton: PropTypes.any,
    getStep: PropTypes.any,
    confirmacionTraslado: PropTypes.any
};
export default AdminSlide
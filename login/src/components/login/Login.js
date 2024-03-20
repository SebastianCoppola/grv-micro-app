import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";
import { Alert, Container, Grid, Snackbar } from '@mui/material';
import PNGLogin from '../../commons/assets/login.png'
import Utils from '../utils/utils';
import { ERROR_ENVIAR_MAIL, ERROR_SERVICIO_LOGIN, EXITO_ENVIAR_MAIL, MENSAJE_INGRESO_EXITOSO, SNACK_ERROR, SNACK_SUCCESS, USUARIO_SIN_PERMISOS } from '../utils/const';
import isoLogo from '../../commons/assets/isologoColoniaSuiza.svg'
import CustomLoading from '../commons/Loading/CustomLoading';
import CustomText from '../commons/TextField/CustomText';
import CustomButton from '../commons/Button/CustomButton';
import { FECTH_URL_LOGIN, FETCH_URL_FACE_RECOGNITION_VALIDATE, URL_FETCH_MAIL_SOPORTE, URL_FRONT_UI } from '../utils/url';
import CustomTypography from '../commons/Typography/CustomTypography';
import { Box } from '@mui/system';
import Lampara from "../login/lampara.svg"

const classes = {
    root: {
        paddingRight: '0px',
        '@media (min-width: 600px)': {
            '.css-1cqj68g-MuiContainer-root': {
                paddingLeft: "0px",
                paddingRight: "0px"
            },
            ".css-s0th6m": {
                paddingLeft: "0px",
                paddingRight: "0px"
            }
        }

    },
    contenedor: {
        paddingLeft: '0px',
        // paddingRight: '1px'

    },
    contenedorImagen: {
        display: 'flex',
        contentVisibility: 'visible',
        width: '54em',
        height: '39em',
        '& h4': {
            fontWeight: 600
        },
        '& h4, & h6': {
            color: 'fff'
        }

    },
    imagen: {
        backgroundImage: `linear-gradient(
             rgb(-25%,30%,104%, 0.5),
             rgba(-25, 30, 104, 0.5)
           ),url(${PNGLogin})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        height: '100vh',

    },
    colorImagen: {
        width: '66%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '+1',
        position: 'absolute',
        backgroundColor: '#124680',
        opacity: '0.75',
        margin: '0px',
        padding: '0px'
    },
    fondo: {
        display: 'flex',
        alignItems: 'center',

    },
    tituloImagen: {
        width: '50%',
        height: '-webkit-fill-available',
        margin: '2px 0 0',
        zIndex: '+2',
        position: 'absolute',
        textAlign: 'left',
        paddingLeft: '25px',
        justifyContent: "center"
    },
    ".MuiGrid-justify-xs-center": {
        justifyContent: "center"
    },
    typograhy2: {
        width: '232px',
        height: '21px',
        margin: '11px 59px 33.5px 0',
        fontSize: '17px',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#1473e6',
    },
    titulo: {
        width: '220px'
    },
    subtitulo: {
        marginLeft: '10px'
    }
}

const Login = (props) => {

    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingEffect, setLoadingEffect] = useState(false)
    const videoRef = useRef(null)
    const [openRecognition, setOpenRecognition] = useState(false)
    const [valid, setValid] = useState(true)
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '', button: false })
    const [intentos, setIntentos] = useState(0)
    const [disabledButton, setDisabledButton] = useState(false)

    useEffect(() => { setDisabledButton(Boolean(!user || !pwd)) }, [user, pwd])

    //Llamada para mail de soporte en caso que no pueda entrar por reconocimiento facial
    const handleEnviarMailSoporte = () => {
        if (user) {
            let request = {
                usuario: user
            }
            setLoadingEffect(true)
            fetch(URL_FETCH_MAIL_SOPORTE, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            }).then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        setLoadingEffect(false)
                        setOpenSnackBar({
                            open: true,
                            severity: SNACK_SUCCESS,
                            title: EXITO_ENVIAR_MAIL,
                            button: false
                        })
                    } else {
                        setLoadingEffect(false)
                        setOpenSnackBar({
                            open: true,
                            severity: SNACK_ERROR,
                            title: ERROR_ENVIAR_MAIL,
                            button: false
                        })
                    }
                })
            ).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        if (intentos > 0) {
            if (intentos >= 3) {
                setOpenSnackBar({
                    open: true,
                    severity: SNACK_ERROR,
                    title: "No pudimos validar tu usuario, superaste la cantidad de intentos. Ponte en contacto con soporte haciendo click ",
                    button: true
                })
            } else {
                setOpenSnackBar({
                    open: true,
                    severity: SNACK_ERROR,
                    title: "No pudimos validar tu foto, intente nuevamente. Intento " + intentos + " de 3.",
                    button: false
                })
            }
        }
    }, [intentos])

    useEffect(() => {
        setLoadingEffect(false)
        let token = localStorage.getItem('jwtuser')
        if (token) {
            let decodedToken = jwt_decode(token);
            let currentDate = new Date();
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                navigate(`/login`);
                localStorage.removeItem("jwtuser")
            } else {
                var userin = JSON.parse(localStorage.getItem('userin'));
                if (Utils.usuarioConPermisos(userin.roles)) {
                    let url = URL_FRONT_UI;
                    url += `/home/?token=${token}&userName=${userin.username}&id=${userin.id}&firstName=${userin.firstName}&lastName=${userin.lastName}&roles=${userin.roles}&apps=${userin.apps}&area=${userin.area}`;
                    window.location.replace(url);
                } else {
                    setOpenSnackBar({
                        open: true,
                        severity: SNACK_ERROR,
                        title: USUARIO_SIN_PERMISOS
                    })
                }
            }
        } else {
            navigate(`/login`)
            localStorage.removeItem("jwtuser")
        }
        setLoadingEffect(false)
    }, [])

    //Llamada para verificar si el usuario necesita reconocimiento facial o no
    const verifyFaceRecognitionRequired = () => {
        if (user && user !== '' && pwd && pwd !== '') {
            let req = {
                user: user.trim(),
                password: pwd.trim()
            }
            setLoadingEffect(true)
            console.log(process.env.REACT_APP_URL_SERVICIOS)
            fetch(FETCH_URL_FACE_RECOGNITION_VALIDATE, {
            //fetch('http://10.8.100.166:8443/grv/login/login/verify-face-recognition-required', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req)
            }).then(res =>
                res.json()
                    .then(data => {
                        if (data && data.status && data.status === 500) {
                            setLoadingEffect(false)
                            setOpenSnackBar({
                                open: true,
                                severity: SNACK_ERROR,
                                title: USUARIO_SIN_PERMISOS,
                                button: false
                            })
                        }
                        if (data && data.user && data.user.faceRecognitionRequired === false) {
                            setDisabledButton(true)
                            setTimeout(function () {
                                setOpenSnackBar({
                                    open: true,
                                    severity: SNACK_SUCCESS,
                                    title: MENSAJE_INGRESO_EXITOSO,
                                    button: false
                                })
                                setLoadingEffect(false)
                                setOpenRecognition(false);

                                let datosUsuario = {
                                    token: data.access_token,
                                    user: data.user.username,
                                    id: data.user.id,
                                    firstName: data.user.firstName,
                                    lastName: data.user.lastName,
                                    roles: data.user.roles,
                                    apps: data.user.apps,
                                    area: data.user.area,
                                    idGrupo:data && data.user && data.user.idGrupo 
                                }
                                //Redireccion a fronts
                                document.cookie = "datos_usuario=" + JSON.stringify(datosUsuario)
                                document.cookie = "user_image=" + JSON.stringify(data.user_image)
                                Utils.verificarAreaUsuarioLogueadoYRedireccion(datosUsuario)
                            }, 5000);
                        } else {
                            if (data && data.status && data.status !== 200) {
                                setLoadingEffect(false)
                                setOpenSnackBar({
                                    open: true,
                                    severity: SNACK_ERROR,
                                    title: "Hubo un error, intente nuevamente.",
                                    button: false
                                })
                            } else {
                                setTimeout(function () {
                                    if (user && user !== '' && pwd && pwd !== '') {
                                        pythonCall();
                                        setOpenRecognition(true);
                                    } else {
                                        setValid(false)
                                    }
                                }, 5000)
                            }
                        }
                    }).catch(err => {
                        setIntentos(intentos + 1)
                        setLoading(false)
                        setOpenSnackBar({
                            open: true,
                            severity: SNACK_ERROR,
                            title: ERROR_SERVICIO_LOGIN,
                            button: false
                        })
                    })
            ).catch(() => {
                setIntentos(intentos + 1)
                setLoading(false)
                setOpenSnackBar({
                    open: true,
                    severity: SNACK_ERROR,
                    title: ERROR_SERVICIO_LOGIN,
                    button: false
                })
            })
        }
    }

    //Mostrar cara una vez que ingrese las credenciales.
    const getVideo = () => {
        navigator
            .mediaDevices
            .getUserMedia({
                video: true
            })
            .then(stream => {
                let video = videoRef.current
                if ("srcObject" in video) {
                    video.srcObject = stream
                    video.play()
                }
            })
            .catch(err => console.log(err))
    }

    //Sacar foto a partir de la camara
    const getScreenshotFromCameraBlob = () => {
        const canvas = document.createElement('canvas');
        const video = document.createElement('video');
        video.setAttribute("autoplay", true);
        return new Promise((resolve, reject) => navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then((stream) => {
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.addEventListener("loadeddata", () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(resolve, 'image/png');
                })
            })
            .catch(reject)
        )
    }

    //Llamada a la URI si todo sale ok lo setea los parametros necesarios en document.cookie, con foto para
    //reconocimiento facial.
    const pythonCall = () => {
        setLoadingEffect(false)
        getScreenshotFromCameraBlob()
            .then((blob) => {
                const formData = new FormData();
                formData.append("file", blob);
                formData.append("user", user.trim());
                formData.append("password", pwd.trim());
                let url = FECTH_URL_LOGIN;
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => {
                        response.json()
                            .then(data => {
                                if (data && data.access_token && data.user) {
                                    setDisabledButton(true)
                                    setOpenSnackBar({
                                        open: true,
                                        severity: SNACK_SUCCESS,
                                        title: MENSAJE_INGRESO_EXITOSO,
                                        button: false
                                    })
                                    if (Utils.usuarioConPermisos(data.user.roles)) {
                                        setTimeout(function () {
                                            setOpenRecognition(false);
                                            let datosUsuario = {
                                                token: data.access_token,
                                                user: data.user.username,
                                                id: data.user.id,
                                                firstName: data.user.firstName,
                                                lastName: data.user.lastName,
                                                roles: data.user.roles,
                                                apps: data.user.apps,
                                                area: data.user.area,
                                                idGrupo:data && data.user && data.user.idGrupo 
                                            }
                                            //Redireccion a fronts
                                            document.cookie = "datos_usuario=" + JSON.stringify(datosUsuario)
                                            document.cookie = "user_image=" + JSON.stringify(data.user_image)
                                            Utils.verificarAreaUsuarioLogueadoYRedireccion(datosUsuario)
                                        }, 5000);

                                    } else {
                                        setOpenRecognition(false)
                                        setIntentos(intentos + 1)
                                        //Apago la camara por si hubo error
                                        navigator
                                            .mediaDevices
                                            .getUserMedia({
                                                video: true
                                            })
                                            .then(stream => {
                                                stream.getTracks()
                                                    .forEach(track => track.stop());
                                            })

                                    }
                                } else {
                                    setIntentos(intentos + 1)
                                    //Apago la camara por si hubo error
                                    navigator
                                        .mediaDevices
                                        .getUserMedia({
                                            video: true
                                        })
                                        .then(stream => {
                                            stream.getTracks()
                                                .forEach(track => track.stop());
                                        })
                                }
                                setLoading(false)
                                setTimeout(function () {
                                    setOpenRecognition(false);
                                }, 5000);
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        setIntentos(intentos + 1)
                        setLoading(false)
                        setOpenSnackBar({
                            open: true,
                            severity: SNACK_ERROR,
                            title: ERROR_SERVICIO_LOGIN,
                            button: false
                        })
                        setTimeout(function () {
                            setOpenRecognition(false);
                        }, 5000);
                        //Apago la camara por si hubo error
                        navigator
                            .mediaDevices
                            .getUserMedia({
                                video: true
                            })
                            .then(stream => {
                                stream.getTracks()
                                    .forEach(track => track.stop());
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })

    }

    const onChangeUsuario = (event) => {
        setUser(event.target.value !== '' ? event.target.value : undefined)
    }

    const onChangePwd = (event) => {
        setPwd(event.target.value !== '' ? event.target.value : undefined)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({
            open: false,
            title: '',
            severity: '',
            button: false
        });
    }

    //Si se agrega las credenciales se llama a getVideo() que muestra la camara del usuario
    useEffect(() => {
        if (openRecognition) {
            getVideo()
        }
    }, [openRecognition])

    return (
        <Box sx={classes.root}>
            {openRecognition ?
                <Box>
                    <Container maxWidth="xl">
                        <Grid container direction="row" justify="center">
                            <Grid item container xs={12} display='block' sx={{ marginTop: "2rem", textAlign: "center" }}>
                                <Grid item width={"100%"} display={'flex'}>
                                    <Grid item style={{ margin: "auto" }} display={'flex'}>
                                        <img src={isoLogo} alt="login"></img>
                                        <CustomTypography color="#124680" text="Reconocimiento Facial" variant='h5' bold={true} />
                                    </Grid>
                                </Grid>
                                <Grid item mt={2}>
                                    <video ref={videoRef} width={318} height={317} style={{ margin: "0 0 28px", borderRadius: "16px", border: "1px solid grey" }}></video>
                                </Grid>
                                <Grid item>
                                    <CustomTypography text="Escaneando tu rostro..." variant='h5' bold={true} />
                                    <CustomTypography text="Mantente de frente a la cámara mientras se realiza la validación." style={{ fontSize: "20px", color: "#161616" }} />
                                </Grid>
                                <Grid item style={{ display: "flex", justifyContent: "center" }} mt={2}>
                                    <img src={Lampara} alt='icon'/>
                                    <CustomTypography text="Tip: Busca una buena iluminación." style={{ fontSize: "14px" }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            :
                <Box>
                    <CustomLoading loading={loadingEffect} />
                    <Container maxWidth='xl' sx={classes.contenedor}>
                        <Grid container direction="row" justify="center"  >
                            <Grid item container xs={8}  >
                                <Grid container sx={classes.cont}>
                                    <Grid justify='center' container direction='column' sx={classes.tituloImagen} >
                                        <Grid item> <CustomTypography color="#ffff" text="SAS" variant='h3' /></Grid>
                                        <Grid item> <CustomTypography color="#ffff" text="Sistema de Administración de Siniestros" variant='h4' />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sx={classes.imagen} ></Grid >
                                </Grid>
                            </Grid>
                            <Grid item xs={4} container >
                                <Grid item container style={{ margin: '0px', justifyContent: "center" }} spacing={2} direction="column" justify="center" alignItems="center" >
                                    <Grid item sx={classes.titulo}>
                                        <img src={isoLogo} alt="login" style={{ maxWidth: '100%' }}></img>
                                    </Grid>
                                    <Grid item sx={classes.titulo}>
                                        <CustomTypography color="#124680" text="Bienvenido!" variant='h5' bold={true} />
                                    </Grid>
                                    <Grid item sx={classes.subtitulo}>
                                        <CustomTypography fontWeight='500' bold={true} color="#1473e6" text="Inicie sesión con sus credenciales" variant='body2' />
                                    </Grid>
                                    <Grid item sx={classes.titulo}>
                                        <CustomText label={'Usuario'} id={'user'} width={'200px'} onChange={onChangeUsuario} value={user}
                                            helperText={!valid ? 'Usuario Obligatorio' : null} error={!valid} variant='standard' />

                                    </Grid>
                                    <Grid item sx={classes.titulo}>
                                        <CustomText label={'Contraseña'} id={'pwd'} type={'password'} width={'200px'} onChange={onChangePwd} value={pwd}
                                            helperText={!valid ? 'Contraseña Obligatoria' : null} error={!valid} variant='standard' />
                                    </Grid>
                                    <Grid item >
                                        <CustomButton disabled={disabledButton} onClik={() => verifyFaceRecognitionRequired()}
                                            label={'Ingresar al sistema'} variant={'contained'} isAction={true} color={'primary'} size={'large'} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                    <Snackbar open={openSnackBar.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert onClose={handleClose} severity={openSnackBar.severity}>
                            {openSnackBar.title}{openSnackBar.button ? <a style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }} onClick={() => handleEnviarMailSoporte()}>aqui.</a> : null}
                        </Alert>
                    </Snackbar>
                </Box>
            }
        </Box>
    )
}

export default Login
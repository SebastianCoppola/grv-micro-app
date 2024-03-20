import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getPrestacionesPrequirurgicas, setPrestacionesPrequirurgicas } from '../../../../redux/actions/convenio'
import BuscadorContrataciones from '../../../commons/Buscador/BuscadorContrataciones'
import Loader from '../../../commons/Loading/Loader'
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'
import CustomTableContrataciones from '../../../commons/Table/CustomTableContrataciones'

const useStyles = makeStyles((theme) => ({
  cabecera: {
    padding: '6% 0%',
    borderLeft: '2px solid #1473e6',
    backgroundColor: '#f5f5f5',
    marginBottom: '8px',
    marginRight: '2%'
  },
  noData: {
    fontSize: '17px',
    marginLeft: '8%',
    marginRight: '18%',
    lineHeight: 1.32,
    color: '#e34850',
    marginTop: "20px",
  },
  titulos: {
    fontSize: "10px",
    color: "#747474",
  },
}))

const DrawerPrQx = (props) => {
  const { convenio } = props
  //Redux
  const dataPreQx = useSelector(state => state.convenio.prestacionesPreQx)
  const loadingPrestacionesPrequirurgicas = useSelector(state => state.convenio.loadingPrestacionesPrequirurgicas)
  const dispatch = useDispatch()
  const [openSnackBar, setOpenSnackBar] = useState({ "open": false, "title": '', "severity": '' })
  //Datos de la tabla
  const [dataTabla, setDataTabla] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [criterioBusqueda, setCriterioBusqueda] = useState("")
  //Estilos
  const classes = useStyles()
  const [loadingPantalla, setLoadingPantalla] = useState(true)
  const [req, setReq] = useState(null)
  const [test, setTest] = useState(false)

  useEffect(() => dispatch(setPrestacionesPrequirurgicas(null)), [])

  useEffect(() => {
    setLoadingPantalla(true)
    if (criterioBusqueda !== "") {
      setPage(0)
    }
    if (page === 0) {
      setReq({ ...req, offset: page * rowsPerPage, criterioBusqueda })
    }
  }, [criterioBusqueda])

  useEffect(() => {
    if (convenio && convenio.idConvenio) {
      setReq({
        idConvenio: convenio.idConvenio,
        criterioBusqueda: criterioBusqueda !== "" ? criterioBusqueda : "",
        offset: page * rowsPerPage,
        limit: rowsPerPage
      })
    } else {
      setLoadingPantalla(false)
      setReq(null)
    }
  }, [page, rowsPerPage])

  useEffect(() => {
    if (req != null) {
      dispatch(getPrestacionesPrequirurgicas(req, callBack))
    } else {
      setDataTabla([])
    }
  }, [req])

  const buscador = (e) => {
    setCriterioBusqueda(e)
  }

  const callBack = (bool, data) => {
    if (!bool) {
      setLoadingPantalla(false)
      setOpenSnackBar({ open: true, severity: "error", title: "Ocurrio un error en el servidor, intente nuevamente" })
    } else if (data.length === 0) {
      setLoadingPantalla(false)
      setDataTabla([])
    } else {
      setLoadingPantalla(false)
      dispatch(setPrestacionesPrequirurgicas(data))
    }
  }

  useEffect(() => {

    if (dataTabla && dataTabla.length === 0) {
      setTest(true)
    }
  }, [dataTabla])

  useEffect(() => {
    if (dataTabla && dataTabla.length > 0 && test) {
      setLoadingPantalla(false)
    }
  }, [test])

  useEffect(() => {
    const dataRellenar = [];
    const dimension = page * rowsPerPage
    if (dataPreQx && dataPreQx.cantidadTotal && dataPreQx.cantidadTotal !== 0) {
      for (let index = 0; index < dimension; index++) {
        dataRellenar.push({})
      }
    }
    let dataApi = dataPreQx && dataPreQx.objetos ? dataPreQx.objetos.map(newData => {
      return { ...newData }
    }
    ) : []
    const dataRestante = [];
    const lengthData = dataRellenar.length + dataApi.length
    if (dataPreQx && dataPreQx.cantidadTotal && lengthData < dataPreQx.cantidadTotal) {
      for (let index = lengthData; index < dataPreQx.cantidadTotal; index++) {
        dataRestante.push({})
      }
    }
    setDataTabla([...dataRellenar, ...dataApi, ...dataRestante])
  }, [dataPreQx])

  //Columnas Tabla:
  const columnas = [
    {
      title: <Typography className={classes.titulos} style={{ cursor: "auto" }}>CÓDIGO Y DESCRIPCIÓN</Typography>,
      render: row => row.codigo + " - " + (row.descripcion && row.descripcion.length > 23 ? row.descripcion.substr(0, 23) + "..." : row.descripcion),
      cellStyle: { minWidth: '350px', maxWidth: '350px', maxWidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis' },
    },
    {
      title: <Typography className={classes.titulos} style={{ cursor: "auto" }}>TIPO PRESTACIÓN</Typography>,
      field: "tipoPrestacion",
      cellStyle: { minWidth: '150px', maxWidth: '150px', maxWidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis' },
    },
    {
      title: <Typography className={classes.titulos} style={{ cursor: "auto" }}>PRECIO</Typography>,
      render: row => row.precio ? ("$" + row.precio + ".00") : "$0.00",
      cellStyle: { minWidth: '150px', maxWidth: '150px', maxWidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis' },
    },
  ]

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') { return }
    setOpenSnackBar({ open: false });
  };


  return (
    <Grid container>
      <Grid container xs={12}>
        <Grid item xs={3} style={{ marginBottom: "20px" }}>
          <BuscadorContrataciones
            onClick={e => buscador(e)}
            placeholder='Buscar'
            value={criterioBusqueda}
          />
        </Grid>
      </Grid>
      {
        loadingPantalla === true ?
          (
            <Grid style={{ margin: "auto" }}>
              <Loader loading={true} />
            </Grid>
          )
          : loadingPantalla === false && dataTabla && dataTabla.length > 0 ? (
            <CustomTableContrataciones
              data={dataTabla}
              cantTotal={dataPreQx && dataPreQx.cantidadTotal ? dataPreQx.cantidadTotal : 0}
              columnas={columnas}
              pagination={true}
              selection={false}
              noSorting={true}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              loading={loadingPrestacionesPrequirurgicas}
              paginationWidth={true}
            />
          ) : (
            <Grid item className={classes.cabecera} sx={12} style={{ width: "100%", height: "60px", padding: "1px" }}>
              <Fragment>
                <Typography className={classes.noData}>
                  No existen prácticas prequirúrgicas en este convenio.
                </Typography>
              </Fragment>
            </Grid>
          )}
      <CustomSnackBar
        handleClose={handleCloseSnackBar}
        open={openSnackBar.open}
        title={openSnackBar.title}
        severity={openSnackBar.severity}
      />
    </Grid>
  )
}

export default DrawerPrQx
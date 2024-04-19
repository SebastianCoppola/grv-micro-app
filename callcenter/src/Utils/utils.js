import moment from 'moment'
import { CALL_CENTER, MODULO_CEM, OPCIONES_PAGINACION_15_20_25, OPCIONES_PAGINACION_5_10_15,ESPACIO, CP, PISO, DEPTO } from './const'

class Utils {

    static calcularEdad(fechaNacimiento) {
        var hoy = new Date()
        var cumpleanos = new Date(fechaNacimiento)
        var edad = hoy.getFullYear() - cumpleanos.getFullYear()
        var m = hoy.getMonth() - cumpleanos.getMonth()
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
        }
        return edad ?? ' - '
    }

    static getNombreYApellidoAccidentado(denuncia) {
        return denuncia && denuncia.accidentado ? Utils.stringNull(denuncia.accidentado.apellido) + ' ' + Utils.stringNull(denuncia.accidentado.nombre) : ''
    }

    static getNombreYApellidoVIP(denuncia) {
        return denuncia && denuncia.denuncianteAutorizado ? Utils.stringNull(denuncia.denuncianteAutorizado.apellido) + ' ' + Utils.stringNull(denuncia.denuncianteAutorizado.nombre) : ''
    }

    static getDomicilioAccidentado(denuncia) {
        if (denuncia && denuncia.accidentado) {
            let direccion = Utils.stringNull(denuncia.accidentado.calle) + ' ' + Utils.stringNull(denuncia.accidentado.numero)
            if (denuncia.accidentado.piso) {
                direccion += ' Piso: ' + Utils.stringNull(denuncia.accidentado.piso);
            }
            if (denuncia.accidentado.depto) {
                direccion += ' Depto: ' + Utils.stringNull(denuncia.accidentado.depto);
            }
            direccion += ' ' + Utils.stringNull(denuncia.accidentado.localidadNombre) + ' - ' + Utils.stringNull(denuncia.accidentado.localidadProvinciaNombre)
            direccion += ' - CP: ' + Utils.stringNull(denuncia.accidentado.codigoPostalCodigo)
            return direccion
        }
        return null
    }

    static getDomicilioAccidentadoSinlocalidadYCp(denuncia) {
        if (denuncia && denuncia.accidentado) {
            let direccion = Utils.stringNull(denuncia.accidentado.calle) + ESPACIO + Utils.stringNull(denuncia.accidentado.numero)
            if (denuncia.accidentado.piso) {
                direccion += PISO + Utils.stringNull(denuncia.accidentado.piso);
            }
            if (denuncia.accidentado.depto) {
                direccion += DEPTO + Utils.stringNull(denuncia.accidentado.depto);
            }
            return direccion
        }
        return null
    }
    static getLocalidadYCpAccidentado(denuncia) {
        return denuncia && denuncia.accidentado && denuncia.accidentado.localidadNombre && denuncia.accidentado.codigoPostalCodigo ? denuncia.accidentado.localidadNombre + CP + denuncia.accidentado.codigoPostalCodigo : null
    }

    static getDireccionSede(denuncia) {
        if (denuncia && denuncia.sede) {
            let direccion = Utils.stringNull(denuncia.sede.direccion) + ' ' + Utils.stringNull(denuncia.sede.nro)
            return direccion
        }
        return null
    }

    static dateFormat(fecha) {
        return fecha ? moment(fecha, "YYYY-MM-DD[T]HH:mm:ss[Z]").format("DD/MM/YYYY") : ''
    }

    static dateFormato(fecha) {
        return fecha ? moment(fecha, "YYYY-MM-DD[T]HH:mm:ss").format("DD/MM/YYYY") : ''
    }

    static dateFormat2(fecha) {
        return fecha ? moment(fecha, "DD/MM/YYYY").format("YYYY-MM-DD[T]HH:mm:ss") : ''
    }

    static dateFormato2(fecha) {
        return fecha ? moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD[T]HH:mm:ss") : ''
    }

    static dateFormat3(fecha) {
        return fecha ? moment(fecha, "DD/MM/YYYY").format("MM/DD/YYYY") : ''
    }

    static dateHourFormat(fecha) {
        return fecha ? moment(fecha, "YYYY-MM-DD[T]HH:mm:ss[Z]").format("YYYY-MM-DD[T]HH:mm:ss") : ''
    }

    static dateFormat4(fecha) {
        return fecha ? moment(fecha, "DD/MM/YYYY").format("YYYY-MM-DD") : ''
    }

    // Convierte una fecha a formato yyyy/mm/dd
    static yearMonthDateFormat(fecha) {
        if (fecha instanceof Date && isFinite(fecha)) {
            var year = fecha.toLocaleString("default", { year: "numeric" })
            var month = fecha.toLocaleString("default", { month: "2-digit" })
            var day = fecha.toLocaleString("default", { day: "2-digit" })
            return year + "-" + month + "-" + day + 'T00:00:00'
        } else {
            return ''
        }
    }

    static formatoFecha(fecha, formato) {
        const map = {
            dd: fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate(),
            mm: (fecha.getMonth() + 1) < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1,
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getUTCFullYear()
        }
        return formato.replace(/dd|mm|yyyy|yy/gi, matched => map[matched])
    }

    static getLastDayOfWeekFromDate = (date) => {
        let currentDate = date;
        return new Date(currentDate.setDate(currentDate.getDate() - 7));
    }

    static time24h(fecha) {
        return fecha ? moment(fecha, "YYYY-MM-DD[T]HH:mm:ss[Z]").format('HH:mm') : ''
    }

    static hora(fecha, primerSubstring, segundoSubstring, tercerSubstring, cuartoSubstring, add) {
        const hora = parseInt(fecha && fecha.toString().substring(primerSubstring, segundoSubstring)) + add
        const minutos = fecha && fecha.toString().substring(tercerSubstring, cuartoSubstring)
        const horaFinal = hora + minutos
        return horaFinal
    }

    static stringNull(string) {
        return string ? string : ''
    }

    static habilitarAsignacion = (idAsignado, idOperador) => {
        if (idAsignado) {
            if (idAsignado === idOperador) {
                return true
            } else {
                return false
            }
        }
    }

    static getTelefonoCompleto(denuncia) {
        if (denuncia && denuncia.accidentado) {
            let telefono = Utils.stringNull(denuncia.accidentado.codigoPaisCelular) + ' ' + Utils.stringNull(denuncia.accidentado.codigoAreaCelular)
            telefono += ' - ' + Utils.stringNull(denuncia.accidentado.numeroCelular)
            return telefono
        }
        return null
    }

    static getCentroMedicoCompleto(denuncia) {
        if (denuncia && denuncia.centroPrimerAsistencia) {
            let direccion = Utils.stringNull(denuncia.centroPrimerAsistencia.domicilioCalle) + ' ' + Utils.stringNull(denuncia.centroPrimerAsistencia.domicilioNumero)
            direccion += ' - ' + Utils.stringNull(denuncia.centroPrimerAsistencia.localidadNombre) + ' - ' + Utils.stringNull(denuncia.centroPrimerAsistencia.provinciaNombre)
            return direccion
        }
        return null;
    }

    static getLabelCodEstadoCem(idEstadoCem) {
        return idEstadoCem === 2 ? 'Borrador' : idEstadoCem === 0 ? 'Incompleto' : 'Completo';
    }

    static dateFormat3(fecha) {
        return fecha ? moment(fecha, "YYYY-MM-DD[T]HH:mm:ss[Z]").format("YYYY-MM-DD") : ''
    }

    static isBorrador(denuncia) {
        return denuncia && denuncia.estadoCEM === 2 ? true : false
    }

    static getIdLocalidadDomicilio(denuncia) {
        return denuncia && denuncia.accidentado ? denuncia.accidentado.localidadIdLocalidad : null
    }

    static capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    static getIdLocalidadTrabajo(denuncia) {
        return denuncia && denuncia.sede ? denuncia.sede.localidadesIdLocalidad : null
    }

    static getIdLocalidadItinere(denuncia) {
        return denuncia && denuncia.localidadItinereIdLocalidad ? denuncia.localidadItinereIdLocalidad : null
    }

    static getIdLocalidadCentroMedico(denuncia) {
        return denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.localidadIdLocalidad : null
    }

    static getIdCentroMedico(denuncia) {
        return denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.id : null
    }

    static usuarioConPermisos(roles) {
        if (roles) {
            let rol = roles.filter(it => it === 'Supervisor' || it === 'Operador')
            if (rol && rol[0]) {
                return true;
            }
        }
        return false;
    }

    static getSiniestroMixto(denuncia, data) {
        if (
            (denuncia && denuncia.centroPrimerAsistencia !== null && denuncia.centroPrimerAsistencia.id !== 921)
            ||
            (data && data.dataSeccionCentroMedico && data.dataSeccionCentroMedico.id !== 921)) {
            return true
        } else {
            return false
        }
    }

    static AdressContratacion = (data) => {
        let adress = ''
        if (data) {
            let calle = Utils.stringNull(data ? data.domicilioCalle : '')
            let nro = Utils.stringNull(data ? data.domicilioNumero : '')
            let localidad = Utils.stringNull(data ? data.localidad : '')
            let codPostal = Utils.stringNull(data ? data.codigoPostal : '')
            adress = `${nro + ' ' + calle}, X${codPostal} ${localidad}, Argentina`

        }
        return adress
    }

    //Recive calle, nro, codigoPostal y nombreLocalidad para calcular el GEOCODE (coordenadas)
    static AdressAccidentado = (calle, nro, codPostal, localidad) => {
        let res_calle = calle ?? ''
        let res_nro = nro ?? ''
        let res_codPostal = codPostal ?? ''
        let res_localidad = localidad ?? ''
        if (res_calle, res_nro, res_codPostal, res_localidad) {
            return `${nro + ' ' + calle}, X${codPostal} ${localidad}, Argentina`
        } else {
            return ''
        }
    }

    static validarCampos = (campos, nombre, valor, bool) => {
        let result = false
        campos && campos.find(it => {
            if (it.nombre === (nombre) && (valor === undefined || valor === null || valor === "")) {
                result = true
            }
        })
        if (bool) {
            result = false
        }
        return result
    }

    static busquedaCodigo = (data, codigo) => {
        let result
        if (data !== null) {
            let doc = data.indexOf('src=') + 5
            let doc2 = data.indexOf('alt') + 10
            let primer = data.substring(0, doc)
            let segundo = data.substring(doc2)
            result = `${primer} data:image/png;base64,${codigo} ${segundo}`
        }
        return result
    }

    static verificacionReingreso(idEstadoMedico, rechazado, dictamen) {
        const mensajeRechazado = 'El siniestro seleccionado se encuentra "RECHAZADO" y no admite reingresos, esta seguro que desea continuar?';
        const mensajeDictamen = 'El siniestro seleccionado es "DICTAMEN" y no admite reingresos, esta seguro que desea continuar?';
        let informacion = {
            mensaje: null,
            continuar: true
        }
        if (rechazado) {
            return informacion = { ...informacion, mensaje: mensajeRechazado }
        }
        if (dictamen) {
            return informacion = { ...informacion, mensaje: mensajeDictamen }
        } else {
            switch (idEstadoMedico) {
                case 1:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("", false, true, true) }
                case 7:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Muerte", true, true) }
                case 10:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Descartado por error", true, true) }
                case 25:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Desestimo de prestaciones", true, true) }
                case 26:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Derivación", true, true) }
                case 28:
                    return informacion = { continuar: false, mensaje: Utils.mensajes("Muerte por causas laborales", false, true) }
                case 29:
                    return informacion = { continuar: false, mensaje: Utils.mensajes("Muerte por causas inculpables", false, true) }
                case 33:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Abandono de tto", true, true) }
                default:
                    return informacion
            }
        }
    }

    static verificacionIntercurrencia(idEstadoMedico, rechazado, dictamen) {
        const mensajeRechazado = 'El siniestro seleccionado se encuentra "RECHAZADO" y no admite intercurrencia, esta seguro que desea continuar?';
        const mensajeDictamen = 'El siniestro seleccionado es "DICTAMEN" y no admite intercurrencia, esta seguro que desea continuar?';
        const mensajeIntercurrencia = ' El siniestro seleccionado corresponde ser ingresado como Reingreso.';
        const mensajeDerivacion = 'El siniestro seleccionado se encuentra en gestión por la ART de origen. El paciente deberá comunicarse con la misma para notificar su intercurrencia.'
        let informacion = {
            mensaje: null,
            continuar: true
        }
        if (rechazado) {
            return informacion = { ...informacion, mensaje: mensajeRechazado }
        }
        if (dictamen) {
            return informacion = { ...informacion, mensaje: mensajeDictamen }
        } else {
            switch (idEstadoMedico) {
                case 7:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Muerte", true, false) }
                case 10:
                    return informacion = { continuar: false, mensaje: Utils.mensajes("Descartado por error", true, false) }
                case 24:
                    return informacion = { continuar: false, mensaje: mensajeIntercurrencia }
                case 25:
                    return informacion = { continuar: false, mensaje: Utils.mensajes("Desestimo de prestaciones", true, false) }
                case 26:
                    return informacion = { continuar: false, mensaje: mensajeDerivacion }
                case 28:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Muerte por causas laborales", false, false) }
                case 29:
                    return informacion = { continuar: false, mensaje: Utils.mensajes("Muerte por causas inculpables", false, false) }
                case 33:
                    return informacion = { ...informacion, mensaje: Utils.mensajes("Abandono de tto", true, false) }
                default:
                    return informacion
            }
        }
    }

    static mensajes(razon, continuar, activo, reingreso) {
        if (activo) {
            return `El siniestro seleccionado aun se encuentra activo y no admite ${reingreso ? 'reingresos' : 'intercurrencia'} , esta seguro que desea continuar?`
        }
        if (continuar) {
            return `El siniestro seleccionado se encuentra cerrado por "${razon}" y no admite ${reingreso ? 'reingresos' : 'intercurrencia'}, esta seguro que desea continuar?`
        } else {
            return `El siniestro seleccionado se encuentra cerrado por "${razon}" y no admite ${reingreso ? 'reingresos' : 'intercurrencia'}`
        }
    }

    static nroAsignadoProvisorio(data) {
        if (data && data.nroAsignado) {
            return data.nroAsignado
        } else if (data && data.nroProvisorio) {
            return data.nroProvisorio
        } else {
            return ''
        }
    }

    static nroAsignadoProvisorio2(data) {
        if (data && data.nroAsignadoDenuncia) {
            return data.nroAsignadoDenuncia
        } else if (data && data.nroProvisorioDenuncia) {
            return data.nroProvisorioDenuncia
        } else {
            return ''
        }
    }

    static nroAsignadoProvisorio3(data) {
        if (data && data.nroAsignadoDenunciaOrigen) {
            return data.nroAsignadoDenunciaOrigen
        } else if (data && data.nroProvisorioDenuncia) {
            return data.nroProvisorioDenuncia
        } else {
            return ''
        }
    }

    static nroAsignadoProvisorio4(data) {
        if (data && data.denunciaNroAsignado) {
            return data.denunciaNroAsignado
        } else if (data && data.denunciaNroProvisorio) {
            return data.denunciaNroProvisorio
        } else {
            return ''
        }
    }

    static createTipoDTO(element, setTiposActuales,) {
        switch (element.codigo) {
            case 1:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorInsumosSerologicosDTO ?
                        { ...anterior, proveedorInsumosSerologicosDTO: { ...anterior.proveedorInsumosSerologicosDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorInsumosSerologicosDTO: { eliminarRelacion: !element.seleccionado } }));
                break;
            case 2:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorExtraccionistaDTO ?
                        { ...anterior, proveedorExtraccionistaDTO: { ...anterior.proveedorExtraccionistaDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorExtraccionistaDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 3:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorServicioTrasladoDTO ?
                        { ...anterior, proveedorServicioTrasladoDTO: { ...anterior.proveedorServicioTrasladoDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorServicioTrasladoDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 4:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorInsumosQuirurgicosDTO ?
                        { ...anterior, proveedorInsumosQuirurgicosDTO: { ...anterior.proveedorInsumosQuirurgicosDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorInsumosQuirurgicosDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 5:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorPrestadorMedicoDTO ?
                        { ...anterior, proveedorPrestadorMedicoDTO: { ...anterior.proveedorPrestadorMedicoDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorPrestadorMedicoDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 6:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorInfectologoDTO ?
                        { ...anterior, proveedorInfectologoDTO: { ...anterior.proveedorInfectologoDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorInfectologoDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 7:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorLaboratorioDTO ?
                        { ...anterior, proveedorLaboratorioDTO: { ...anterior.proveedorLaboratorioDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorLaboratorioDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 8:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorInsumosOrtopedicosDTO ?
                        { ...anterior, proveedorInsumosOrtopedicosDTO: { ...anterior.proveedorInsumosOrtopedicosDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorInsumosOrtopedicosDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 9:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorHotelDTO ?
                        { ...anterior, proveedorHotelDTO: { ...anterior.proveedorHotelDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorHotelDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 10:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorFarmaciaDTO ?
                        { ...anterior, proveedorFarmaciaDTO: { ...anterior.proveedorFarmaciaDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorFarmaciaDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
            case 11:
                setTiposActuales((anterior) => (
                    anterior && anterior.proveedorAsociacionDTO ?
                        { ...anterior, proveedorAsociacionDTO: { ...anterior.proveedorAsociacionDTO, eliminarRelacion: !element.seleccionado } }
                        : { ...anterior, proveedorAsociacionDTO: { eliminarRelacion: !element.seleccionado } }
                ));
                break;
        }
    }

    static validarCamposEditar = (valor, id) => {
        let result = false
        if (id === 1 && (valor === undefined || valor === null || valor === "")) {
            result = true
        }
        return result
    }

    static ValidarEspecialidadesPrestador = (dataAcordeon) => {
        let result = false
        if (
            dataAcordeon.proveedorPrestadorMedicoDTO.idTipoPrestadorMedico === 5
            && (dataAcordeon.proveedorPrestadorMedicoDTO.especialidadesMedicas
                && dataAcordeon.proveedorPrestadorMedicoDTO.especialidadesMedicas[0]) === undefined) {
            result = true
        }
        return result
    }

    static validarGuardar = (dataSave, dataSaveAcordeon) => {
        let result = true
        if (dataSave
            && ((dataSave.idTipoPersona === 1 && dataSave.dni && dataSave.dni !== '')
                || (dataSave.idTipoPersona === 2 && dataSave.cuit && dataSave.cuit !== '')
            )
            && (dataSave.razonSocial && dataSave.razonSocial !== '')
            && (dataSave && dataSave.idLocalidad)
            && (dataSave.codigoPostal && dataSave.codigoPostal !== null)
            && (dataSave.domicilioCalle && dataSave.domicilioCalle !== '')
            && (dataSave.domicilioNumero && dataSave.domicilioNumero !== '')
            && (dataSave.idTiposProveedor && dataSave.idTiposProveedor.length > 0)

            && (dataSaveAcordeon && dataSaveAcordeon.proveedorPrestadorMedicoDTO
                && (dataSaveAcordeon.proveedorPrestadorMedicoDTO.eliminarRelacion === true
                    ||
                    (dataSaveAcordeon.proveedorPrestadorMedicoDTO.idTipoPrestadorMedico !== undefined)
                )
            )
        ) {
            result = false
        }
        return result
    }
    

    //Calcular porcentaje aumento con criterioBusqueda
    static calcularPorcentajeAumento = (request, prestacion, ajustarCriterio, porcentaje) => {
        if (request && request[ajustarCriterio] !== null && request.porcentajeAumento !== null) {
            if (this.matchCriterioBusqueda(prestacion, request[ajustarCriterio])) {
                let precio = parseFloat(prestacion.precio) + parseFloat(prestacion.precio) * (parseFloat(porcentaje) / 100)
                return precio.toFixed(2)
            } else {
                return prestacion.precio
            }
        }
    }

    //Calcular porcentaje aumento todos
    static calcularPorcentajeAumentoTodos(precioInicial, porcentaje) {
        precioInicial += parseFloat(precioInicial) * (parseFloat(porcentaje) / 100)
        return precioInicial.toFixed(2)
    }

    static aplicarCriterioBusquedaConvenio = (array, criterioBusqueda) => {
        return array.filter(it => {
            if ((it.codigo && it.codigo.toLowerCase().includes(criterioBusqueda.toLowerCase()))
                || (it.nombre && it.nombre.toLowerCase().includes(criterioBusqueda.toLowerCase()))
                || (it.descripcion && it.descripcion.toLowerCase().includes(criterioBusqueda.toLowerCase()))) {
                return it
            }
        })
    }

    static matchCriterioBusqueda = (registro, criterioBusqueda) => {
        if ((registro.codigo && registro.codigo.toLowerCase().includes(criterioBusqueda.toLowerCase()))
            || (registro.nombre && registro.nombre.toLowerCase().includes(criterioBusqueda.toLowerCase()))
            || (registro.descripcion && registro.descripcion.toLowerCase().includes(criterioBusqueda.toLowerCase()))) {
            return true
        } else {
            return false
        }
    }

    static calcularPrQx(tipo, prestacion, request) {
        //tipo 1 = Prestaciones Nomencladas
        //tipo 2 = Prestaciones NBU
        let setAll = tipo === 1 ? "marcarPrQxTodasNomencladas" : "marcarPrQxTodasNBU"
        let setCriterio = tipo === 1 ? "prQxNomencladasCriterio" : "prQxNBUCriterio"
        if (request && request[setCriterio] && request[setCriterio].length > 0) {
            let tempValuePrQx = null
            request[setCriterio].forEach(it => {
                if (this.matchCriterioBusqueda(prestacion, it.criterio)) {
                    tempValuePrQx = it.prQx
                }
            })

            if (tempValuePrQx !== null) {
                return tempValuePrQx
            }
        }
        if (request && (request[setAll] !== null && request[setAll] !== undefined)) {
            return request[setAll]
        }
        else {
            return prestacion.esPrQx
        }
    }

    static procesarDataTablasConvenio = (tipo, back, request, criterioBusqueda, page, rowsPerPage) => {
        //tipo 1 = Prestaciones Nomencladas
        //tipo 2 = Prestaciones NBU
        //tipo 3 = Modulos
        let req = tipo === 1 ? "prestacionesNomencladas" : tipo === 2 ? "prestacionesNoNomencladas" : "modulos"
        let add = tipo === 1 || tipo === 2 ? "agregarPrestacion" : "agregarModulo"
        let id = tipo === 1 || tipo === 2 ? "idPrestacion" : "idModulo"
        let ajustarAll = tipo === 1 ? "ajustarTodasNomencladas" : tipo === 2 ? "ajustarTodasNoNomencladas" : "ajustarTodosModulos"
        let ajustarCriterio = tipo === 1 ? "ajustarNomencladasCriterio" : tipo === 2 ? "ajustarNoNomencladasCriterio" : "ajustarModulosCriterio"
        let setAllPreQx = "marcarPrQxTodasNomencladas"
        //Asigno dataRequest segun criteriode búsqueda o no:
        let dataRequest = request && request[req] && request[req].length > 0
            ? (criterioBusqueda
                ? Utils.aplicarCriterioBusquedaConvenio(request[req], criterioBusqueda)
                : request[req])
            : null
        //Asigno dataBack:
        let dataBack = back && back.objetos ? back.objetos : null
        //Asigno dataBack:
        let cantidadDataBack = back && back.cantidadTotal ? back.cantidadTotal : 0
        //Asigno newRegistros de dataRequest:
        let newRegistros = dataRequest && dataRequest.filter(it => it[add] === true)

        //Proceso ambos arrays
        if (dataBack || dataRequest) {

            //Set cantidadTotal sumando dataBack y request:
            let tempCantidad;
            if (!dataBack && dataRequest) {
                tempCantidad = newRegistros && newRegistros.length
            }
            else if (dataBack && !dataRequest) {
                tempCantidad = cantidadDataBack
            }
            else if (dataBack && dataRequest) {
                tempCantidad = cantidadDataBack + (newRegistros && newRegistros.length)
            }

            //Set data mergeando dataBack y dataRequest:          
            let dimension = rowsPerPage * page

            let dataRellenar = [];
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }

            let dataApi = []
            let r = dimension //index dataRequest
            let d = 0 //index dataBack
            for (let n = 0; n < rowsPerPage; n++) {
                if (newRegistros && newRegistros.length >= dimension && newRegistros[r]) {
                    dataApi.push(newRegistros[r])
                    r++
                }
                else if (dataBack && dataBack[d]) {
                    let registroRepetido = dataRequest && dataRequest.filter(it => it[id] === dataBack[d][id])[0]
                    if (registroRepetido) {
                        dataApi.push(registroRepetido)
                    } else {
                        if (tipo === 1) {
                            dataApi.push({
                                ...dataBack[d],
                                esPrQx: this.calcularPrQx(1, dataBack[d], request),
                                precio: request && request[ajustarCriterio] ?
                                    Utils.calcularPorcentajeAumento(request, dataBack[d], ajustarCriterio, request.porcentajeAumento)
                                    : request && request[ajustarAll]
                                        ? Utils.calcularPorcentajeAumentoTodos(parseFloat(dataBack[d].precio), request.porcentajeAumento)
                                        : dataBack[d].precio
                            })
                        } else {
                            dataApi.push({
                                ...dataBack[d],
                                precio: request && request[ajustarCriterio] ?
                                    Utils.calcularPorcentajeAumento(request, dataBack[d], ajustarCriterio, request.porcentajeAumento)
                                    : request && request[ajustarAll]
                                        ? Utils.calcularPorcentajeAumentoTodos(parseFloat(dataBack[d].precio), request.porcentajeAumento)
                                        : dataBack[d].precio
                            })
                        }
                    }
                    d++
                }
            }

            let dataRestante = [];
            let lengthData = dataRellenar.length + dataApi.length
            if (lengthData < tempCantidad) {
                for (let index = lengthData; index < tempCantidad; index++) {
                    dataRestante.push({})
                }
            }

            return {
                objetos: [...dataRellenar, ...dataApi, ...dataRestante],
                cantidadTotal: tempCantidad
            }

        } else {
            return { objetos: [], cantidadTotal: 0 }
        }
    }

    static convertFechaActualToString = () => {
        const fechaActual = new Date()
        let dia = fechaActual.getUTCDate().toString()
        let mes = fechaActual.getUTCMonth().toString()
        let año = fechaActual.getFullYear().toString()
        let hora = fechaActual.getHours().toString()
        let minutos = fechaActual.getMinutes().toString()
        let mesReal = parseInt(mes) + 1
        if (parseInt(hora) < 10) hora = "0" + hora
        if (parseInt(minutos) < 10) minutos = "0" + minutos
        let diaActual = dia + "/" + mesReal + "/" + año + " " + hora + ":" + minutos
        return diaActual
    }

    //Compara strings ignorando acentos y mayúsculas y devuelve un booleano.  
    static stringsAreEqual = (string1, string2) => {
        let formated1 = string1.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let formated2 = string2.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return formated1 === formated2
    }

    //Recibe el estado médico de una denuncia y devuelve el color con que la misma será visualizada en la tabla: 
    static colorChipDenuncia = (colorEstadoMedico) => {
        switch (colorEstadoMedico) {
            case 1:
                return '#959595'
            case 2:
                return '#0a26f7'
            case 9:
                return '#f5a74e'
            default:
                return '#e34850'
        }
    }

    //Recibe valid stringDate y devuelve 'dd/mm/yyyy 24:00':
    static dateFormat5 = (string) => {
        let date1 = new Date(string)
        let date2 = date1.toLocaleString('es-AR', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
        return date2
    }

    //Devuelve 'dd/mm/yyyy 24:00':
    static dateFormat6 = (diaString, horaString) => {
        let dia = diaString ? new Date(diaString) : null
        let hora = horaString ? horaString.split(':') : null
        if (dia && hora) {
            let res = new Date(dia.setHours(hora[0], hora[1]))
            return Utils.dateFormat5(res)
        } else if (dia && !hora) {
            let res = dia.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
            return res
        } else if (!dia && hora) {
            return hora
        } else {
            return ' - '
        }
    }

    //Recibe valid stringDate y devuelve 'dd/mm/yyyy':
    static dateFormat7 = (string) => {
        let date1 = new Date(string)
        let date2 = date1.toLocaleString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        return date2
    }

    //Recibo fecha + cantidad de días y se lo sumo a una fecha: 
    static sumarDias = (fecha, dias) => {
        fecha.setDate(fecha.getDate() + dias);
        return fecha
    }

    //Recive dos fechas y devuelve TRUE o FALSE según igualdad:
    static datesAreEqual = (date1, date2) => {
        let newDate1 = new Date(date1)
        let newDate2 = new Date(date2)
        let areEqual = (
            newDate1.getDate() === newDate2.getDate() &&
            newDate1.getMonth() === newDate2.getMonth() &&
            newDate1.getYear() === newDate2.getYear()
        )
        return areEqual
    }

    static getCookieByName = (name) => {
        let regex = new RegExp(`(^| )${name}=([^;]+)`)
        let match = document.cookie.match(regex)
        if (match) return match[2]
        else return null
    }

    static deleteCookieByName = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    //Funcion para setear las rows en las tablas de call center
    static setRowsTables = (usuarioActivo) => {
        return usuarioActivo && usuarioActivo.apps && usuarioActivo.apps.length === 1 && usuarioActivo.apps[0] === MODULO_CEM ? 15 : 5
    }

    //Funcion para setear las opciones para las rows en las tablas de call center
    static setRowsOptionTables = (usuarioActivo) => {
        return usuarioActivo && usuarioActivo.apps && usuarioActivo.apps.length === 1 && usuarioActivo.apps[0] === MODULO_CEM ? OPCIONES_PAGINACION_15_20_25 : OPCIONES_PAGINACION_5_10_15
    }

    //Funcion para deserializar imagenes b64 a blob
    static deserializeImagenToBlob = (base64Data, imagenDefault) => {
        if (base64Data && base64Data !== null) {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/png" });
            const blobURL = URL.createObjectURL(blob)
            return <img src={blobURL} alt='usuario-responsable' style={{ width: '40px', height: '40px', margin: '0px 0px 0 16px', backgroundColor: '#ffffff' }} />
        }
        return <img src={imagenDefault} alt='usuario-responsable' style={{ width: '40px', height: '40px', margin: '0px 0px 0 16px', backgroundColor: '#ffffff' }} />
    }

    //Funcion para setear los estilos segun el estado medico para denuncias
    static getEstiloByEstadoMedico = (idEstadoMedico, esRechazado) => {
        let style = {
            color: '',
            backgroundColor: ''
        }

        switch (idEstadoMedico) {
            case 1:        
                style.color = '#2dc76d'
                style.backgroundColor = '#e9f9f0'
                return style;
            case 2:
                style.color = '#2f61d5'
                style.backgroundColor = 'rgba(47, 97, 213, 0.1)'
                return style;
            case 9:
                if(esRechazado){
                    style.color = '#FDC800'
                    style.backgroundColor = 'rgba(255, 205, 113, 0.27)'
                    return style;
                }else{
                    style.color = '#e34850'
                    style.backgroundColor = 'rgba(255, 112, 82, 0.1)'
                    return style;
                }            
            default:
                style.color = '#e34850'
                style.backgroundColor = 'rgba(255, 112, 82, 0.1)'
                return style;
        }
    }

    //Funcion para determinar si el usuario activo es operador
    static getUsuarioEsOperador = (usuarioActivo) => {
        return usuarioActivo && usuarioActivo.isOperador
    }

    //Date yyyy-mm-dd + days
    static datePlusDays = (date, days) => {
        var fechaInicial = new Date(date)
        fechaInicial.setDate(fechaInicial.getDate() + days)
        var fechaNueva = fechaInicial.toISOString().split('T')[0]
        return fechaNueva
    }
}

export default Utils

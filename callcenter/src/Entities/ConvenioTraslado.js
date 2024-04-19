import Utils from "../Utils/utils"

export class MontoFijo {

    valor_viaje
    id_tipo_valor_negativo
    tipo_valor_negativo
    valor_negativo
    monto_fijo
    valor_km
    porcentual
    valor_hora_espera
    cantidad_hora_espera

    constructor() {}

    static emptyMontoFijo(){
        let montos_fijos = new MontoFijo()
        montos_fijos.valor_viaje = ''
        montos_fijos.id_tipo_valor_negativo = ''
        montos_fijos.tipo_valor_negativo = ''
        montos_fijos.valor_negativo = ''
        montos_fijos.monto_fijo = ''
        montos_fijos.valor_km = ''
        montos_fijos.porcentual = ''
        montos_fijos.valor_hora_espera = ''
        montos_fijos.cantidad_hora_espera = ''
        return montos_fijos
    }

    static mapMontoFijo(data){
        let montos_fijos = new MontoFijo()
        montos_fijos.valor_viaje = data.valorViaje ?? null
        montos_fijos.id_tipo_valor_negativo = data.idTipoValorViajeNegativo ?? null
        montos_fijos.tipo_valor_negativo = data.tipoValorViajeNegativo ?? null
        montos_fijos.valor_negativo = data.valorNegativo ?? null
        montos_fijos.monto_fijo = data.montoFijo ?? null
        montos_fijos.valor_km = data.valorKm ?? null
        montos_fijos.porcentual = data.porcentual ?? null
        montos_fijos.valor_hora_espera = data.valorHoraEspera ?? null
        montos_fijos.cantidad_hora_espera = data.cantHoraEspera ?? null
        return montos_fijos
    }
}

export class ValorZona {

    static zona
    static valor

    constructor(zona, valor) {
        this.zona = zona
        this.valor = valor
    }
}

class DestinoFrecuente {

    idDestinoFrecuente
    zonas

    constructor(idDestinoFrecuente, zonas){
        this.idDestinoFrecuente = idDestinoFrecuente
        this.zonas = zonas?.length ? 
            zonas.map(it => new Zona(
                it.idZona, 
                it.localidades?.length ? it.localidades.map(loc => loc.idLocalidad) : null, 
                it.localidades
            ))
        : null
    }
}

class Zona {

    idZona
    idLocalidades
    idDescripcionLocalidades

    constructor(idZona, idLocalidades, idDescripcionLocalidades){
        this.idZona = idZona
        this.idLocalidades = idLocalidades
        this.idDescripcionLocalidades = idDescripcionLocalidades?.length ?
            idDescripcionLocalidades.map(it => new Localidad(it.idLocalidad, it.nombre))
            : null
    }
}

class Localidad {

    idLocalidad
    localidad

    constructor(idLocalidad, localidad){
        this.idLocalidad = idLocalidad
        this.localidad = localidad
    }
}

class BaseConvenida {

    nombre
    direccion
    localidad
    idLocalidad

    constructor(nombre, direccion, localidad, idLocalidad) {
        this.nombre = nombre
        this.direccion = direccion
        this.localidad = localidad
        this.idLocalidad = idLocalidad
    }
}

export class ConvenioTraslado {

    idConvenioEditado
    isMontoFijo
    isValorZona
    token
    fecha_desde
    fecha_hasta
    montos_fijos
    valorZonas
    destinosFrecuentes
    base_convenidas
    proveedor_id

    constructor() {}

    static emptyConvenioTraslado(idProveedor){
        let convenio = new ConvenioTraslado()
        convenio.proveedor_id = idProveedor
        convenio.idConvenioEditado = null
        convenio.isMontoFijo = false
        convenio.isValorZona = false
        convenio.token = 0
        convenio.fecha_desde = ''
        convenio.fecha_hasta = ''
        convenio.montos_fijos = MontoFijo.emptyMontoFijo()
        convenio.valorZonas = ['1','2','3','4','5','6','7'].map(it => new ValorZona(it,''))
        convenio.destinosFrecuentes = null
        convenio.base_convenidas = null
        return convenio
    }

    static mapConvenioTraslado(data, idProveedor){
        let convenio = new ConvenioTraslado()
        convenio.proveedor_id = idProveedor
        convenio.idConvenioEditado = data.idConvenio
        convenio.isMontoFijo = data.valorMontoFijoDTO?.valorKm ? 1 : 0
        convenio.isValorZona = data.valorPorZona && data.valorPorZona.length ? 1 : 0
        convenio.token = data.token ? 1 : 0
        convenio.fecha_desde = Utils.dateFormat4(data.fechaVigenciaDesde)
        convenio.fecha_hasta = Utils.dateFormat4(data.fechaVigenciaHasta)
        convenio.montos_fijos = MontoFijo.mapMontoFijo(data.valorMontoFijoDTO)
        convenio.valorZonas = ['1','2','3','4','5','6','7'].map((zona) => {
            if(data.valorPorZona.find(it => it.zona.toString() === zona)?.valor){
                return new ValorZona(zona, data.valorPorZona.find(it => it.zona.toString() === zona).valor)
            }else{
                return new ValorZona(zona, null)
            }
        })
        convenio.destinosFrecuentes = data.listaDestinosFrecuentesZonasYLocalidades?.length ? 
            data.listaDestinosFrecuentesZonasYLocalidades.map(it => {
                return new DestinoFrecuente(it.idCentro, it.zonasYLocalidades)
            })
            : null
        convenio.base_convenidas = data.listadoBasesConvenidas?.length ? 
            data.listadoBasesConvenidas.map(it => new BaseConvenida(it.nombre, it.direccion, it.localidad, it.idLocalidad)) 
            : null
        return convenio
    }
}
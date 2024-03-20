class MontoFijo {

    valorViaje
    tipoValorViajeNegativo
    valorNegativo
    montoFijoPesos
    valorKm
    porcentual
    valorHoraEspera
    cantidadHoraEspera
    
    //Constructor:
    constructor() {}

    static emptyMontoFijo(){
        let montoFijo = new MontoFijo()
        montoFijo.valorViaje = ''
        montoFijo.tipoValorViajeNegativo = ''
        montoFijo.valorNegativo = ''
        montoFijo.montoFijoPesos = ''
        montoFijo.valorKm = ''
        montoFijo.porcentual = ''
        montoFijo.valorHoraEspera = ''
        montoFijo.cantidadHoraEspera = ''
        return montoFijo
    }

    static mapMontoFijo(data){
        let montoFijo = new MontoFijo()
        montoFijo.valorViaje = data.valorViaje
        montoFijo.tipoValorViajeNegativo = data.tipoValorViajeNegativo
        montoFijo.valorNegativo = data.valorNegativo
        montoFijo.montoFijoPesos = data.montoFijoPesos
        montoFijo.valorKm = data.valorKm
        montoFijo.porcentual = data.porcentual
        montoFijo.valorHoraEspera = data.valorHoraEspera
        montoFijo.cantidadHoraEspera = data.cantidadHoraEspera
        return montoFijo
    }
}

class ValorZona {

    zona
    valor

    constructor(zona, valor) {
        this.zona = zona
        this.valor = valor
    }
}

class DestinoFrecuente {
    
    idDestinoFrecuente
    zonas
    
    constructor(idDestinoFrecuente, zonas) {
        this.idDestinoFrecuente = idDestinoFrecuente
        this.zonas = zonas
    }
}

class BaseConvenida {
    
    nombre
    direccion
    localidad

    constructor(nombre, direccion, localidad) {
        this.nombre = nombre
        this.direccion = direccion
        this.localidad = localidad
    }
}

export class ConvenioTraslado {

    isMontoFijo
    isValorZona
    token
    fechaDesde
    fechaHasta
    montoFijo
    valorZonas
    destinosFrecuentes
    basesConvenidas

    constructor() {}

    static emptyConvenioTraslado(){
        let convenio = new ConvenioTraslado()
        convenio.isMontoFijo = false
        convenio.isValorZona = false
        convenio.token = false
        convenio.fechaDesde = ''
        convenio.fechaHasta = ''
        convenio.montoFijo = MontoFijo.emptyMontoFijo()
        convenio.valorZonas = ['1','2','3','4','5','6','7'].map(it => new ValorZona(it,''))
        convenio.destinosFrecuentes = []
        convenio.basesConvenidas = []
        return convenio
    }

    static mapConvenioTraslado(data){
        let convenio = new ConvenioTraslado()
        convenio.isMontoFijo = data.isMontoFijo
        convenio.isValorZona = data.isValorZona
        convenio.token = data.token
        convenio.fechaDesde = data.fechaDesde
        convenio.fechaHasta = data.fechaHasta
        convenio.montoFijo = data.montoFijo
        convenio.valorZonas = data.valorZonas
        convenio.destinosFrecuentes = data.destinosFrecuentes
        convenio.basesConvenidas = data.basesConvenidas
        return convenio
    }
}
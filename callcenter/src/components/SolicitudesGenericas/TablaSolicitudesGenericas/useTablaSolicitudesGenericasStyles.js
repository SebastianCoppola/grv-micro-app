import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    tabla: {
        '& .MuiTableCell-root': {
            width: 80,
            padding: '6px 16px 6px 10px',
            fontFamily: 'inherit',
            fontSize: 12,
            '& p': {
                fontSize: 12
            }
        },
        '& .MuiTableCell-head': {
            color: '#747474',
            verticalAlign: 'baseline',
        },
        '& thead th:last-of-type': {
            paddingRight: 0,
            paddingLeft: 0
        },
        '& tbody td:last-of-type': {
            paddingRight: 0,
            paddingLeft: 0
        }
    },
    areaGestion: {
        maxWidth: 68,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    gestor: {
        width: 'fit-content',
        maxWidth: 160,
        padding: 5,
        height: 30,
        borderRadius: 5,
        border: '1px solid #8e8e8e',
        backgroundColor: '#fafafa'
    },
    gestorIcon: {
        width: 20,
        height: 20
    },
    estado: {
        width: 96,
        height: 30,
        borderRadius: 5,
        border: '1px solid',
        display: 'block',
        textAlign: 'center',
        padding: 5,
        boxSizing: 'border-box'
    },
    estadoNoResuelto: {
        width: 96,
        height: 50,
        borderRadius: 5,
        border: '1px solid',
        display: 'block',
        textAlign: 'center',
        padding: 5,
        boxSizing: 'border-box'
    },
    estadoEnGestion: {
        color: '#2f61d5',
        borderColor: '#2f61d5',
        backgroundColor: 'rgba(47, 97, 213, 0.1)'
    },
    estadoDerivado: {
        color: '#f29423',
        borderColor: '#f29423',
        backgroundColor: 'rgba(255, 205, 113, 0.27)'
    },
    estadoCerrado: {
        color: '#2dc76d',
        borderColor: '#2dc76d',
        backgroundColor: 'rgba(45, 199, 109, 0.27)'
    },
    estadoRechazado: {
        color: '#ff7052',
        borderColor: '#ff7052',
        backgroundColor: 'rgba(255, 112, 82, 0.27)'
    },
    acciones: {
        borderRadius: 5,
        border: '1px solid  #d3d3d3',
        padding: 7
    },
    pagination: {
        '& .MuiTablePagination-actions': {
            marginLeft: 0
        },
        '& .MuiToolbar-gutters': {
            paddingLeft: 0
        },
        '& .MuiTablePagination-selectRoot': {
            margin: 0
        }
    },
    notFoundOnTable: {
        height: 300,
        '& div': {
            backgroundColor: '#f5f5f5',
            color: '#e34850'
        }

    }
}));
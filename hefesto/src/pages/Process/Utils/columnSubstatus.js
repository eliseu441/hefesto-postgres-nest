
const headerStyle = {filter: 'blur(0.3px)', textAlign: 'center', minWidth: '70px', height: '40px', fontFamily: 'Lucida Sans', cursor: 'pointer', verticalAlign: 'middle', borderBottomWidth: '2px', borderColor: 'rgb(0, 0, 0, 0.7)',  color: 'white', }
const colunas = {
    ID_SITE: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'ID_SITE',
        text: 'ID_SITE',
        sort: true,
    },
    DATA_INSERCAO: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'DATA_INSERCAO',
        text: 'DATA_INSERCAO',
        sort: true,
    },
    ID_ENGENHARIA: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'ID_ENGENHARIA',
        text: 'ID_ENGENHARIA',
        sort: true,
    },
    REGIONAL: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'REGIONAL',
        text: 'REGIONAL',
        sort: true,
    },
    UF: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'UF',
        text: 'UF',
        sort: true,
    },
    SITE: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'SITE',
        text: 'SITE',
        sort: true,
    },
    TIPO_SITE: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'TIPO_SITE',
        text: 'TIPO_SITE',
        sort: true,
    }
}
export default colunas;
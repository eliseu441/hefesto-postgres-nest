
const headerStyle = {filter: 'blur(0.3px)', textAlign: 'center', minWidth: '70px', height: '40px', fontFamily: 'Lucida Sans', cursor: 'pointer', verticalAlign: 'middle', borderColor: 'rgb(0, 0, 0, 0.7)',  color: 'white', }
const colunas = {
    ID: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'ID',
        text: 'ID',
        sort: true,
    },
    STATUS: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'STATUS',
        text: 'STATUS',
        sort: true,
    },
    SLA: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'SLA',
        text: 'SLA',
        sort: true,
    },
    ORDEM: {
        headerStyle: headerStyle,
        style: { textAlign: 'center' },
        editable: false,
        dataField: 'ORDER',
        text: 'ORDEM',
        sort: true,
    }
}
export default colunas;
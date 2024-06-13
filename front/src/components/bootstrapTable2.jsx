import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { downloadExcel } from 'react-export-table-to-excel';
import paginationFactory from 'react-bootstrap-table2-paginator';
const { SearchBar } = Search;
const sortOptions = {
  sortCaret: (order, column) => {
    if (!order) return <span ></span>;
    else if (order === 'asc') return <span>▲</span>;
    else if (order === 'desc') return <span>▼</span>;
    return null;
  },
};


const Table = (params) => {
  const [classTable, setClassTable] = useState(params.classTable);
  const [colunas, setColunas] = useState(params.columnsDetails);
  const [etapas, setEtapas] = useState(params.dataDetails);

  useEffect(() => {
    setEtapas(params.dataDetails)
    setColunas(params.columnsDetails)
    setClassTable(params.classTable)


  }, [params.dataDetails, params.columnsDetails]);
  function handleDownloadExcel(data, columns) {

    let header = columns.map(colunas => colunas.dataField)
    downloadExcel({
      fileName: "consulta sites fibrados",
      sheet: "SITES_FIBRA",
      tablePayload: {
        header,
        body: data,
      },
    });
  }







  return (
    <>
      {etapas && colunas ?
        <ToolkitProvider
          keyField='id'
          data={etapas}
          columns={colunas}
          search
        >{
            props => (

              <div className={
                classTable
              } >
                {params.searchBar == 'sim' ?
                  <>
                    <SearchBar srText='' placeholder='Pesquisar' class='col-4 form-control shadow-none' className='searchTable ' {...props.searchProps} />
                    <button class="buttonExcell " onClick={e => handleDownloadExcel(etapas, colunas)}>Baixar Excell</button>
                  </>
                  : <></>}
                <div className=''>


                  <BootstrapTable
                    {...props.baseProps}
                    cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
                    responsive
                    striped
                    hover
                    classes='dadosTabela m-2'
                    sort={sortOptions}
                    pagination={paginationFactory()}
                  //rowStyle = {lineOne}
                  />
                </div>



              </div>
            )
          }
        </ToolkitProvider> : <></>
      }
    </>
  )

}

export default Table;
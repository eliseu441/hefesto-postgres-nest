import React, { useState, useEffect } from 'react';

import { DropdownList, Multiselect, Combobox } from 'react-widgets';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIGET from '../../services/workflow/Consultar';
import APIEDIT from '../../services/workflow/Editar';
import { setDefaultLocale } from 'react-datepicker';




const Home = () => {

    const [expand, setExpand] = useState(0);
    const [comboProject, setComboProject] = useState([]);
    const [project, setProject] = useState('');
    const [client, setClient] = useState('');
    const [loading, setLoading] = useState(false);
    const [cardId, setCardId] = useState(1);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        setLoading(true)
        const projects = APIGET.getProjects().then(e => {
            setComboProject(e)
            setLoading(false)

        }).catch(console.error)

    }, []);
    const createClient = async () => {
        setLoading(true)
        let insert = await APIEDIT.insertClient({ id_project: project, client })
        if (insert !== undefined && insert.insert == true) {
            toast.success('Cadastro criado!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        } else {
            toast.error('Erro ao criar Cadastro!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            })
        }

        setLoading(false)
    };

    useEffect(() => {
        console.log(cardId)
    }, [cardId]);
    const getCards = async (el) => {
        setLoading(true)
        setProject(el.ID)
        const apiCard = await APIGET.getCards({ id_project: el.ID })
        let formatCards = []
        for (let item of apiCard) {
            let id = item.ID_STATUS + 1
            console.log(item)
            formatCards = [...formatCards,
            <div class=' col-md-3 col-11 ms-1 step-card'>
                <div id={item.ID_STATUS} class='d-flex justify-content-between'>
                    <span class='cardTitle'>{item.STATUS}</span>
                    <i class="bi bi-info-circle-fill fs-2 information" onClick={e => setCardId(item.ID_STATUS)}></i>
                </div>

                <div id={item.ID_STATUS} class='expandedInfo'>
                    <div class='col-sm-6'>
                        <span class="comboTitles ">Total no status:</span>
                        <div class='total-box col-sm-6 col-3'>
                            <span >{item.TOTAL}</span>
                        </div>
                    </div>
                    <div class='col-sm-6'>
                        <span class="comboTitles" style={{ color: 'red' }}>Atrasados:</span>
                        <div class='total-box col-sm-6 col-3' style={{ borderColor: 'red', boxShadow: '1px 1px 0px 1px red' }}>
                            <span >{item.SLA}</span>
                        </div>
                    </div>
                    <div class='col-sm mb-1 mt-1'>
                        <button
                            className="btn edit-card"
                            style={{ height: '30px' }}
                        >
                            Alterar
                        </button>
                    </div>
                </div>
            </div>
            ]
            setCards(formatCards)
            setCardId(id + 1)
            console.log(cards)

        }
        setLoading(false)
        //   onClick={e=> deleteProduct(detailProdutcs.length)}


    }


    return (

        <>

            {loading == true ? <div class=" bg-loader">
                <div class="loader"></div>
            </div> : <></>}

            <ToastContainer limit={2} />
            <div className="page-content" >


                <div className="card cadastro-project " data-aos="zoom-in" data-aos-duration="800">

                    <div className="card-body">
                        <div class='row'>
                            <div class='col-sm-6'>
                                <span class="comboTitles "> Selecione o projeto:</span>
                                <DropdownList
                                    textField='PROJECT'
                                    data={comboProject ? comboProject : []}
                                    className="dropdownText"
                                    placeholder="selecionar"
                                    onChange={
                                        e => { getCards(e) }
                                    }
                                />
                            </div>



                        </div>

                    </div>

                </div>
                {project !== '' ? <div class='card ps-3 pt-2 col-12 mt-2'>
                    <div>
                        <div class='col-12  d-flex justify-content-start mt-1 pe-4'>
                            <button class='workflow' data-bs-toggle="modal" data-bs-target="#modalCadastro"> novo cadastro
                            </button>
                        </div>
                        <div class="col-12 mt-4 pe-4 d-flex justify-content-start mb-3">
                            <span class=' total-cadastros '>TOTAL DE CADASTROS:
                            </span>
                            <div class='total-box  '>
                                <span >0</span>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        {cards ? cards : <></>}
                    </div>



                </div>
                    : <></>}
            </div>




            <div class="modal fade" data-bs-backdrop="static" id="modalCadastro" tabindex="-1" aria-labelledby="modalCadastroLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex justify-content-center col-11">
                                <h4 class='status-macro'> NOVO CADASTRO </h4>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row col-12 d-flex justify-content-start p-3">
                                <div class='col-sm-7'>
                                    <span class="comboTitles">Nome do cliente</span>
                                    <input type="text" placeholder="Nome" class="default-input"
                                        value={client} onChange={e => setClient(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class='col-sm-3 ps-3'>
                                <button
                                    onClick={e => createClient()}
                                    className="btn edit-card"
                                    style={{ height: '30px' }}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}


export default Home;

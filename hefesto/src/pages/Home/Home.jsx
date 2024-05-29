import React, { useState, useEffect } from 'react';

import { DropdownList, Multiselect, Combobox } from 'react-widgets';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIGET from '../../services/workflow/Consultar';
import APIEDIT from '../../services/workflow/Editar';
import Preloader from "../../layout/preLoader/Preloader.jsx";




const Home = () => {
    const [expand, setExpand] = useState(0);
    const [comboProject, setComboProject] = useState([]);
    const [project, setProject] = useState('');
    const [client, setClient] = useState('');
    const [loading, setLoading] = useState(false);
    const [cardId, setCardId] = useState(0);
    const [cards, setCards] = useState([]);
    const [cardDesc, setCardDesc] = useState([]);
    const [active, setActive] = useState([]);
    const [preloading, setPreloading] = useState(true);
    useEffect(() => {
        //pre-loader
        setTimeout(() => {
            setPreloading(false);
        }, 1500);



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
    const getCards = async (el) => {
        setLoading(true)
        console.log(el.ID)
        setProject(el.ID)
        const apiCard = await APIGET.getCards({ id_project: el.ID })
        let formatCards = []
        let formatCardDesc = []
        let contador = 0
        console.log(apiCard)
        for (let item of apiCard) {
            console.log(item)
            formatCardDesc = [...formatCardDesc,
            <div id={item.ID_STATUS} class='expandedInfo col-12 row d-flex'>
                <div class='col-sm-4'>
                    <span class="comboTitles ">Total no status:</span>
                    <div class='total-box col-sm-6 col-3'>
                        <span >{item.TOTAL}</span>
                    </div>
                </div>
                <div class='col-sm-4'>
                    <span class="comboTitles" style={{ color: 'red' }}>Atrasados:</span>
                    <div class='total-box col-sm-6 col-3' style={{ borderColor: 'red', boxShadow: '1px 1px 0px 1px red' }}>
                        <span >{item.SLA}</span>
                    </div>
                </div>
                <div class='col-sm mb-1 mt-1'>
                    <button
                        className="btn edit-card"
                        style={{ height: '30px' }}
                        onClick={e => setCardId(item.ID_STATUS)}
                    >
                        Alterar
                    </button>
                </div>
            </div>
            ]
            setCardDesc(formatCardDesc)

            formatCards = [...formatCards,
                <p id={item.ID} onClick={e => setActive(formatCardDesc[parseInt(item.ID)])} class='col-md-3 col-11 ms-1 step-card' data-bs-toggle="collapse" data-bs-target="#collapseCard" aria-expanded="false" aria-controls="collapseCard">
    
    
                    <button class="noselect card-step">
                        <span class="text">{(contador + 1) + '-' + item.STATUS}</span>
                        <span class="icon"><i class="bi bi-plus plus-step"></i></span>
                    </button>
    
                </p>
                ]
                setCards(formatCards)
            setCardId(cardId + 1)
            contador++

        }
        setLoading(false)
        //   onClick={e=> deleteProduct(detailProdutcs.length)}
    }
    const setDesc = async (ind) => {
        
        setActive(cardDesc[ind])
    }




    return (

        <>
            {preloading ? <Preloader /> : <></>}
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

                    <div class='row d-flex'>

                        {cards ? cards : <></>}
                        <div class="collapse col-12" id="collapseCard">
                            <div class="card card-body">
                                {active ? active : <></>}
                            </div>
                        </div>
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

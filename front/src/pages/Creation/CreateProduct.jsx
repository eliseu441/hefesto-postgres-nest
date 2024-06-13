
import React, { useState, useEffect } from 'react';
import { DropdownList, Multiselect, Combobox } from 'react-widgets';
import moment from 'moment';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import APIEDIT from '../../services/workflow/Editar';
import APIGET from '../../services/workflow/Consultar';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Switch from "react-switch";
import 'react-toastify/dist/ReactToastify.css';
import DropzoneFiles from '../../components/DropzoneFiles';



const CreateProducts = () => {
    const pathMassiva = 'teste'

    const [project, setProject] = useState('');
    const [company, setCompany] = useState('');
    const [prazo, setPrazo] = useState('');
    const [products, setProducts] = useState([]);
    const [insertProducts, setInsertProducts] = useState([]);
    const [detailProdutcs, setDetailProducts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [workflow, setWorkflow] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [existent, setExistent] = useState(false);
    const [comboProjects, setComboProjects] = useState([]);
    const [files, setFiles] = useState([]);



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    useEffect(() => {
        setLoading(true)
        APIGET.getProjects().then(e => {
            setComboProjects(e)
            setLoading(false)

        }).catch(console.error)
    }, []);


    const showProducts = async () => {
        //   onClick={e=> deleteProduct(detailProdutcs.length)}
        let cardProducts = [...detailProdutcs,
        <div class='mt-2 col-4' data-aos="fade-up" >
            <div class="product ">
                <div class="info__title col-12" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{products}</div>
                <div class="info__title col-12">Preço: R${price}</div>
                <div class="info__title col-12">Quantidade: {quantity}</div>
            </div>
        </div>
        ]
        let finalProducts = [...insertProducts, { item: products, price: price, quantity: quantity }]

        setInsertProducts(finalProducts)
        setDetailProducts(cardProducts)

    }



    const insertProject = async () => {
        setLoading(true)
        const api = await APIEDIT.insertProject({
            project,
            company,
            date: moment(selectedDate).format('YYYY-MM-DD')
        })

        if (api !== undefined && api.insert == true) {
            setWorkflow(project)
            toast.success('Projeto criado, adicione produtos!', {
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
            toast.error('Erro ao criar Projeto!', {
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
    const sendProducts = async () => {
        setLoading(true)
        let insert = await APIEDIT.insertProducts({ insertProducts, project: workflow })
        if (insert !== undefined && insert.insert == true) {
            setWorkflow(project)
            toast.success('Produtos adicionados, va para tela de etapas!', {
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
            toast.error('Erro ao inserir Produtos!', {
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
    const deleteProduct = async (i) => {
        setDetailProducts([])
        setInsertProducts([])
    };
    const filesOnChange = (files) => setFiles(files);
    const saveChanges = async () => {
        let uploadResult = null;
        if (files) {
            if (files.length > 0) {

                const contextUpload = pathMassiva
                const data = {
                    tipo: 'ALTERAÇÃO'
                }
                uploadResult = await UploadService.upload(
                    '',
                    { data, files, contextUpload },
                    (progressEvent) => {
                        const { loaded, total } = progressEvent;

                        const progressPercent = Math.round((loaded * 100.0) / total);


                        if (progressPercent === 100) {
                            addToast('Upload concluído. Aguarde mais alguns instantes...', {
                                appearance: 'info',
                                autoDismiss: true,
                            });
                        }
                    },
                );

            } else {
                return
            }
        }

    }



    return (
        <>

            {loading == true ? <div class=" bg-loader">
                <div class="loader"></div>
            </div> : <></>}

            <ToastContainer limit={2} />
            <div className="page-content row" >


                <div className="card col-lg-8 m-1 cadastro-project" data-aos="zoom-in" data-aos-duration="800">

                    <div className="card-body col-sm-8">

                        <div id="linha-horizontal">
                            <h2 class='col-11 d-flex justify-content-center status-macro'>CADASTRO DE NOVO WORKFLOW </h2>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6 mt-4'>
                                <span class="comboTitles">Nome do projeto</span>
                                <input type="text" placeholder="ex: Produção de hardware" class="default-input"
                                    value={project}
                                    disabled={existent}
                                    onChange={e => setProject(e.target.value)}
                                />
                            </div>
                            <div class='col-sm-5 mt-4'>
                                <span class="comboTitles">Empresa</span>
                                <input type="text" placeholder="ex: Microsoft" class="default-input"
                                    value={company} onChange={e => setCompany(e.target.value)}
                                />
                            </div>
                            <div class='col-sm-6 mt-2'>
                                <span class='comboTitles '>Prazo Estimado:</span>
                                <div class='col-8 datePicker d-flex p-2'>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={e => handleDateChange(e)}
                                        placeholderText="DD/MM/YYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <button className="btn ms-3 cleanPed" onClick={e => handleDateChange(null)}> <i class="bi bi-trash-fill"></i> </button>
                                </div>
                            </div>


                            <div class=' col-sm-7'>
                                <div class='col-12 m-1 d-flex align-items-center'>

                                    <Switch
                                        height={15}
                                        handleDiameter={20}
                                        width={35}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        onChange={e => setExistent(!existent)}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        uncheckedIcon=""
                                        checkedIcon=""
                                        checked={existent} />
                                    <span class='comboTitles'>Usar projeto existente</span>
                                </div>
                                <DropdownList
                                    textField='PROJECT'
                                    data={comboProjects}
                                    className="dropdownText"
                                    placeholder="selecione"
                                    disabled={!existent}
                                    onChange={
                                        e => { setWorkflow(e.PROJECT) }
                                    }
                                />

                            </div>

                            <div class=" sendProducts mt-4 me-2 ms-3" onClick={(e) => insertProject()}>
                                <i class="bi bi-send-x-fill" >
                                    <span class="tooltiptext">adicionar projeto</span>
                                </i>
                            </div>
                        </div>

                    </div>
                    {workflow ?
                        <div className=" mt-3 " data-aos="zoom-in" data-aos-duration="800">

                            <div class='col-12 row d-flex justify-content-start mb-3 ms-2'>
                                <div class='col-sm-7'>
                                    <span class="comboTitles">Produto</span>
                                    <input type="text" placeholder="Nome" class="default-input"
                                        value={products} onChange={e => setProducts(e.target.value)}
                                    />
                                </div>
                                <div class='col-6 col-sm-2'>
                                    <span class="comboTitles">Quantidade</span>
                                    <input type="number" placeholder="qtd." class="default-input "
                                        value={quantity} onChange={e => setQuantity(e.target.value)}
                                    /></div>

                                <div class='col-6 col-sm-2'>
                                    <span class="comboTitles">Preço</span>
                                    <input type="number" placeholder="price(un.)" class="default-input "
                                        value={price} onChange={e => setPrice(e.target.value)}
                                    />

                                </div>
                                <div class="button_plus nova-massiva mt-4 me-2 ms-3" onClick={(e) => showProducts()}>
                                    <i class="bi bi-plus-lg" >
                                        <span class="tooltiptext">adicionar produto</span>
                                    </i>
                                </div>
                                <div class="cleanPed ms-1 mt-4 ms-3" onClick={e => deleteProduct()} >
                                    <i class="bi bi-trash-fill ">
                                        <span class="tooltiptext">Excluir produtos</span>
                                    </i>
                                </div>
                                <div class='col-2 mt-4 '>
                                    <button
                                        className="btn massiva"
                                        data-bs-toggle="modal" data-bs-target="#insertMassiva"

                                    >
                                        excell

                                    </button>
                                </div>


                            </div>
                        </div>



                        : <></>}


                </div>

                {workflow ?
                    <div className="card products-card ms-2 mt-1 col-lg-3" >

                        <div className="card-body "  >

                            <div id="linha-horizontal" class=' d-flex row'>
                                <h4 class='.col-12 ms-2 d-flex justify-content-center ' style={{ textAlign: 'center', color: workflow ? 'black' : 'red' }}>
                                    Produtos Cadastrados no workflow: {workflow}
                                </h4>


                            </div>
                            <div class='row d-flex justify-content-center  col-12'  >


                                {detailProdutcs.length > 0 ?
                                    <div class='row ' data-aos="zoom-in">
                                        <div class='mt-2 col-12 d-flex justify-content-center'>
                                            <button
                                                class="btn edit-stock "
                                                style={{ height: '30px' }}
                                                onClick={e => sendProducts()}
                                            >
                                                Eviar
                                            </button>
                                        </div>
                                        <div class='d-grid justify-content-center'>
                                            {detailProdutcs}
                                        </div>
                                    </div> :
                                    <div class='mt-2 col-12 d-flex justify-content-center'>
                                        <p class='' style={{ color: 'red', fontWeight: 'bolder', textAlign: 'center' }}>nenhum produto cadastrado</p>
                                    </div>
                                }

                            </div>

                        </div>
                    </div> : <></>
                }



            </div>
            <div class="modal fade" id="insertMassiva" tabindex="-1" aria-labelledby="insertMassivaLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg modal-massiva">


                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title fs-5 col-11 d-flex justify-content-center status-macro" id="insertMassivaLabel">UPLOAD DE PRODUTOS</h4>
                            <button type="button" class="btn-close" id="closeAllSites" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body ps-5">
                            <div class="row ">

                                <div class='col-sm-6 '>

                                    <span class="comboTitles  ms-4 "> Modelo:</span>
                                    <div class="templateMassiva col-3 mt-3 ps-3 ms-5">
                                        <a class='' href="/downloads/insertProducts.xlsx">TEMPLATE</a>
                                        <b class="bottom">produtos</b>
                                    </div>
                                    <DropzoneFiles
                                        files={files}
                                        setFiles={filesOnChange}
                                        maxSizeMB={50}
                                        titulo='Arquivo excell:'
                                        maxFilesToUpload={5}
                                        extOnlyAccept={[]}
                                    />
                                </div>
                                <div class='dropzone-massiva ms-2 col-sm-5'>

                                    <p class='mt-0 col-12' style={{ color: 'red', fontWeight: '500' }}>
                                        *Sempre verifique se seu arquivo de massiva esta de acordo com os campos do modelo lembrando que só é possivel enviar um arquivo por massiva</p>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer p-0">


                            <div class='d-flex justify-content-end align-items-end'>
                                <button type="button" class="btn btn-danger me-3" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" onClick={e => saveChanges()} class="btn massiva">Enviar Massiva</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>


    );
}

export default CreateProducts;
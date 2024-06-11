
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



const CreateProducts = () => {

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
        <div class='col-sm-4 d-flex justify-content-center mt-4  p-0' data-aos="fade-up" >
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
        /*
        console.log(i)
        console.log(insertProducts)
        console.log(detailProdutcs)
        let teste = detailProdutcs.splice(index, 1); 
        let teste2 = insertProducts.splice(index, 1); 
        setDetailProducts(teste)
        setInsertProducts(teste2)
        console.log(insertProducts); 
*/
        setDetailProducts([])
        setInsertProducts([])


    };



    return (
        <>

            {loading == true ? <div class=" bg-loader">
                <div class="loader"></div>
            </div> : <></>}

            <ToastContainer limit={2} />
            <div className="page-content" >


                <div className="card cadastro-project" data-aos="zoom-in" data-aos-duration="800">

                    <div className="card-body">

                        <div id="linha-horizontal">
                            <h2 class='col-11 d-flex justify-content-center status-macro'>CADASTRO DE NOVO WORKFLOW </h2>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6 mt-4'>
                                <span class="comboTitles">Nome do projeto</span>
                                <input type="text" placeholder="ex: Produção de hardware" class="default-input"
                                    value={project} onChange={e => setProject(e.target.value)}
                                />
                            </div>
                            <div class='col-sm-3 mt-4'>
                                <span class="comboTitles">Empresa</span>
                                <input type="text" placeholder="ex: Microsoft" class="default-input"
                                    value={company} onChange={e => setCompany(e.target.value)}
                                />
                            </div>
                            <div class='col-2 mt-4'>
                                <span class='comboTitles '>Prazo Estimado:</span>
                                <div class='col-8 datePicker d-flex p-2'>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={e => handleDateChange(e)}
                                        placeholderText="DD/MM/YYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <button className="btn ms-3 deleteDate" onClick={e => handleDateChange(null)}> <i class="bi bi-trash-fill"></i> </button>
                                </div>
                            </div>


                            <div class=' col-sm-4'>
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
                </div>
                {workflow ? <div data-aos="zoom-in" data-aos-duration="800">
                    <div className="card mt-3" >

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


                        </div>
                    </div>

                    <div className="card mt-3" >

                        <div className="card-body"  >

                            <div id="linha-horizontal" class=' d-flex row'>
                                <h4 class='.col-12 ms-2 d-flex justify-content-center ' style={{ color: workflow ? 'black' : 'red' }}>
                                    {workflow ? `Produtos Cadastrados - ${workflow}`
                                        : '*Crie um projeto antes de cadastrar produtos*'
                                    }
                                </h4>


                            </div>
                            <div class='row d-flex justify-content-center col-12'  >
                                
                                
                                {detailProdutcs.length > 0 ? <div class='row ' data-aos="zoom-in">
                                    <div class='mt-2 col-12 d-flex justify-content-center'>
                                <button
                                    class="btn edit-stock "
                                    style={{ height: '30px' }}
                                    onClick={e => sendProducts()}
                                >
                                    Eviar
                                </button>
                                </div>
                                    {detailProdutcs}
                                    </div> : <p class='col-12 d-flex justify-content-center' style={{ color: 'red', fontWeight: 'bolder' }}>nenhum produto cadastrado</p>}

                            </div>

                        </div>
                    </div>
                </div>
                    : <></>}


            </div>
        </>


    );
}

export default CreateProducts;
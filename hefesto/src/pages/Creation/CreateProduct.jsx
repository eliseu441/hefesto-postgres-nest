
import React, { useState, useEffect } from 'react';
import { DropdownList, Multiselect, Combobox } from 'react-widgets';
import moment from 'moment';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import API from '../../services/workflow/Editar'
import { ToastContainer, toast, Slide } from 'react-toastify';
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

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    useEffect(() => {
    }, []);


    const showProducts = async () => {
        //   onClick={e=> deleteProduct(detailProdutcs.length)}
        let cardProducts = [...detailProdutcs,
        <div class='col-sm mt-4 d-flex justify-content-center p-1' data-aos="fade-up">
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
        const api = await API.insertProject({
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
        let insert = await API.insertProducts({ insertProducts, project: workflow })
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
                                <input type="text" placeholder="ex: Produção de hardware" class="input-topologia"
                                    value={project} onChange={e => setProject(e.target.value)}
                                />
                            </div>
                            <div class='col-sm-3 mt-4'>
                                <span class="comboTitles">Empresa</span>
                                <input type="text" placeholder="ex: Microsoft" class="input-topologia"
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


                            <div class='d-flex mt-2 ms-3'>
                                <div class='col-sm row'>
                                    <button
                                        className="btn criar-fo"
                                        onClick={e => insertProject()}
                                    >
                                        Criar Projeto

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="card mt-3" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1000">

                    <div class='col-12 row d-flex justify-content-start mb-3 ms-2'>
                        <div class='col-sm-7'>
                            <span class="comboTitles">Produto</span>
                            <input type="text" placeholder="Nome" class="input-topologia"
                                value={products} onChange={e => setProducts(e.target.value)}
                            />
                        </div>
                        <div class='col-6 col-sm-2'>
                            <span class="comboTitles">Quantidade</span>
                            <input type="number" placeholder="qtd." class="input-topologia "
                                value={quantity} onChange={e => setQuantity(e.target.value)}
                            /></div>

                        <div class='col-6 col-sm-2'>
                            <span class="comboTitles">Preço</span>
                            <input type="number" placeholder="price(un.)" class="input-topologia "
                                value={price} onChange={e => setPrice(e.target.value)}
                            />

                        </div>
                        <div class="button_plus nova-massiva mt-4 me-2 ms-3" onClick={(e) => showProducts()}>
                            <i class="bi bi-plus-lg" >
                                <span class="tooltiptext">adicionar produto</span>
                            </i>
                        </div>
                        <div class="sendProducts ms-2 mt-4 col-1 ms-3" onClick={e => sendProducts()}>
                            <i class="bi bi-send-x-fill">
                                <span class="tooltiptext">cadastrar produtos</span>
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

                    <div className="card-body" >

                        <div id="linha-horizontal" class=' d-flex row'>
                            <h4 class='.col-12 ms-2 d-flex justify-content-center ' style={{ color: workflow ? 'black' : 'red' }}>
                                {workflow ? `Produtos Cadastrados - ${workflow}`
                                    : '*Crie um projeto antes de cadastrar produtos*'
                                }
                            </h4>


                        </div>
                        <div class='row d-flex justify-content-center' data-aos="zoom-in" >
                            {detailProdutcs.length > 0 ? detailProdutcs : <></>}

                        </div>

                    </div>
                </div>

            </div>
        </>


    );
}

export default CreateProducts;
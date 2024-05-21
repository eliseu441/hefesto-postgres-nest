
import React, { useState, useEffect } from 'react';
import { DropdownList, Multiselect, Combobox } from 'react-widgets';
import moment from 'moment';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import API from '../../services/Editar/Editar'



const CreateProducts = () => {

    const [project, setProject] = useState('');
    const [company, setCompany] = useState('');
    const [prazo, setPrazo] = useState('');
    const [products, setProducts] = useState([]);
    const [detailProdutcs, setDetailProducts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    useEffect(() => {
    }, []);


    const showProducts = async () => {
        let cardProducts = [...detailProdutcs,
        <div class='col-sm mt-4 d-flex justify-content-center p-1'>

            <div class="product ">
                <div class="info__title col-12">{products}</div>
                <div class="info__title col-12">Preço: R${price}</div>
                <div class="info__title col-12">Quantidade: {quantity}</div>

            </div>

        </div>
        ]
        console.log(cardProducts)
        setDetailProducts(cardProducts)
    }



    const insertProject = async () => {
        let insert = await API.insertProject({
            project,
            company,
            quantity,
            date: moment(selectedDate).format('YYYY-MM-DD')
        }).then(res => {
            console.log(res)
        }).catch(console.error)
    };




    return (
        <>

            <div className="page-content" >

                <div className="card " >

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

                            <div class='col-12 row d-flex justify-content-start'>
                                <div class='col-sm-7'>
                                    <span class="comboTitles">Produto</span>
                                    <input type="text" placeholder="Nome" class="input-topologia"
                                        value={products} onChange={e => setProducts(e.target.value)}
                                    />
                                </div>
                                <div class='col-sm-2'>
                                    <span class="comboTitles">Quantidade</span>
                                    <input type="number" placeholder="qtd." class="input-topologia "
                                        value={quantity} onChange={e => setQuantity(e.target.value)}
                                    /></div>

                                <div class='col-7 col-sm-2'>
                                    <span class="comboTitles">Preço</span>
                                    <input type="number" placeholder="price(un.)" class="input-topologia "
                                        value={price} onChange={e => setPrice(e.target.value)}
                                    />

                                </div>
                                <div class="button_plus nova-massiva mt-4 col-1" onClick={(e) => showProducts()}>
                                    <i class="bi bi-plus-lg" >
                                        <span class="tooltiptext">adicionar produto</span>
                                    </i>
                                </div>


                            </div>
                            <div class='d-flex mt-2'>
                                <div class='col-sm-2 '>
                                    <button
                                        className="btn criar-fo"
                                        onClick={e => insertProject()}
                                    >
                                        Criar Projeto

                                    </button>

                                </div>
                                <div class="cleanPed ms-2" >
                                    <i class="bi bi-funnel-fill">
                                        <span class="tooltiptext">Limpar campos</span>
                                    </i>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="card mt-3" >

                    <div className="card-body">

                        <div id="linha-horizontal">
                            <h4 class='col-11 d-flex justify-content-center'>Produtos cadastrados</h4>
                        </div>
                        <div class='row d-flex justify-content-center'>
                            {detailProdutcs.length > 0 ? detailProdutcs : <></>}

                        </div>

                    </div>
                </div>
            </div>
        </>


    );
}

export default CreateProducts;
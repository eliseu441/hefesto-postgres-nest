
import React, { useState, useEffect } from 'react';
import { DropdownList, Multiselect, Combobox } from 'react-widgets';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import APIGET from '../../services/workflow/Consultar';
import APIEDIT from '../../services/workflow/Editar';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-widgets/styles.css';
import Switch from "react-switch";



const CreateProcess = () => {

    const [project, setProject] = useState('');
    const [after, setAfter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [comboStatus, setComboStatus] = useState([]);
    const [comboProject, setComboProject] = useState([]);
    const [sla, setSla] = useState(0);
    const [position, setPosition] = useState(0);
    const [checkStart, setCheackStart] = useState(true);

    useEffect(() => {
        setLoading(true)
        const projects = APIGET.getProjects().then(e => {
            setComboProject(e)
            setLoading(false)
        
        }).catch(console.error)
        
    }, []);
    const handleChangeStart = nextChecked => {
        setCheackStart(nextChecked);
    };
    const getStatus = async(params) => {
        setLoading(true)
        setProject(params.ID)
        const substatus = await APIGET.getStatus({id_project: params.ID});
        setComboStatus(substatus)
        setLoading(false)
    };
    const insertStatus = async() => {
        setLoading(true)
        const substatus = await APIEDIT.insertStatus({
            order_id: checkStart ? 0 :  after,
            status,
            sla,
            id_project: project
        });
        if (substatus !== undefined && substatus.insert == true) {
            toast.success('Substatus criado!', {
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
            toast.error('Erro ao criar substatus!', {
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
        return 
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
                            <h2 class='col-11 d-flex justify-content-center status-macro'>ESTRUTURAÇÃO </h2>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6 mt-4'>
                                <span class="comboTitles "> Selecione o projeto:</span>
                                <DropdownList
                                    textField='PROJECT'
                                    data={comboProject ? comboProject : []}
                                    className="dropdownText"
                                    placeholder="todos"
                                    onChange={
                                        e => { getStatus(e) }
                                      }
                                />
                            </div>



                        </div>

                    </div>

                </div>
                <div className="card mt-3" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1000">

                    <div class='col-12 row d-flex justify-content-start mb-3 ms-2'>
                        <div class='col-sm-7'>
                            <span class="comboTitles">Status</span>
                            <input type="text" placeholder="Nome" class="input-topologia"
                                value={status} onChange={e => setStatus(e.target.value)}
                            />
                        </div>
                        <div class='col-6 col-sm-2'>
                            <span class='comboTitles'>Status Inicial</span>
                            <Switch
                                height={20}
                                handleDiameter={30}
                                width={48}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                onChange={handleChangeStart}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                uncheckedIcon=""
                                checkedIcon=""
                                checked={checkStart} />


                        </div>

                        <div class='col-6 col-sm-2'>
                            <span class="comboTitles">Depois de:</span>
                            <DropdownList
                                    textField='STATUS'
                                    data={comboStatus }
                                    className="dropdownText"
                                    placeholder="todos"
                                    disabled={checkStart}
                                    onChange={
                                        e => { setAfter(e.ID) }
                                      }
                                />

                        </div>
                        <div class='col-6 col-sm-2'>
                            <span class="comboTitles">SLA:</span>
                            <input type="number" placeholder="price(un.)" class="input-topologia "
                                value={sla} onChange={e => setSla(e.target.value)}
                            />

                        </div>
                        <div class="button_plus nova-massiva mt-4 me-2 ms-3" onClick={e=> insertStatus()}>
                            <i class="bi bi-plus-lg" >
                                <span class="tooltiptext">adicionar status</span>
                            </i>
                        </div>



                    </div>
                </div>



            </div>
        </>


    );
}

export default CreateProcess;
import React, { useState, useEffect } from 'react';





const Home = () => {

    const [expand, setExpand] = useState(0);




    return (
        <>

            <div class='page-content home'>
            <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
                <div class='row col-12  d-flex justify-content-center'>
                    <div class='card  col-4 info-card'>
                        <div class='d-flex justify-content-between'>
                            <h2>testeS</h2>
                           
                    <i class="bi bi-info-circle-fill fs-2 information" onClick={e=> expand == 1 ? setExpand(0) : setExpand(1)}></i>
                    
                    
                    </div>

                        <div class={expand == 1 ? 'expandedInfo' : 'hidden'}>
                        <h1>teste</h1>
                        <h1>teste</h1>
                        <h1>teste</h1>
                        <h1>teste</h1>
                        </div>
                    </div>
                    <div class='card col-4 info-card' >
                        <h1>teste</h1>
                    </div>
                    
                    <div class='card col-4 info-card' >
                        <h1>teste</h1>
                    </div>
                    <div class='card col-4 info-card' >
                        <h1>teste</h1>
                    </div>
                    
                    
                </div>


            </div>
        </>

    );

}


export default Home;

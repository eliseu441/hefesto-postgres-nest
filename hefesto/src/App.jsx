import { useState } from 'react'
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import { useEffect } from 'react';
import './sass/style.scss';
import './App.css'
import Home from './pages/Home/Home.jsx';
import CreateProduct from './pages/Creation/CreateProduct.jsx';
import Header from './layout/header/Header.jsx';
import SideNavBar from './layout/sidebar/SideNavBar.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";
import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (

    <HashRouter>
    <Header />
    <SideNavBar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/CreateProduct" element={<CreateProduct />} />
      </Routes>



    </HashRouter>

  )
}

export default App

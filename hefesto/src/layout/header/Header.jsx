import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import vivo from './logo.png';


const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);
  return (

    <header class={isSticky ? "fixed notSticked" : 'fixed '} >


      <nav class="navbar fixed-top color-nav d-flex justify-content-center">

      <div class='stars'>
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>

          <span class='header-title' >PROJETO HEFESTO</span>
          
      </nav>
    </header>
  )
}

export default Header
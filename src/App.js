import React from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "./App.css";

import About from './views/About'
import FormSearch from "./components/FormSearch.jsx";
import Search from "./views/Search";
import Home from "./views/Home.jsx";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">

        <div className="app-grid">
          
          <div className="app-sidebar">
            <div className="app-sidebar__logo">
              <img src="https://jonasguedes.com/labs/pokemontcg/img/logo-pokemon.f9e19588.png" alt="Pokemon TCG"/>
            </div>

            <div className="app-sidebar__menu">
              <ul>
                <li><Link to="/">Cards</Link></li>
                <li><Link to="about">About</Link></li>
              </ul>
            </div>

          </div>

          <div className="app-content">

            <div className="app-content__actions">
              <div className="app-content__search">
                <FormSearch></FormSearch>
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="about" element={<About />} />
              <Route path="search/:search" element={<Search />} />
              <Route path="*" element={<Home />} />
            </Routes>

            <p>The literal and graphical information presented on this site about Pokemon, including card images and card text, Pokemon, The Pokemon TCG, and The Pokemon TCG Online and its trademarks are ©1995-2021 Nintendo, The Pokémon Company International, Inc, and GAMEFREAK. This website is not produced by, endorsed by, supported by, or affiliated with Nintendo, The Pokémon Company International, Inc, or GAMEFREAK.</p>

          </div>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;

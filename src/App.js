import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageError from "./components/PageError";
import Cards from "./components/cards";
import ReglasDelJuego from "./components/ReglasDelJuego";
import Game from "./Game";
import MenuNavbar from "./components/MenuNavbar";


function App() {
    return(
        <>
            <MenuNavbar/>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Game/>} />
                <Route path="/desarrolladores" element={<Cards/>} />
                <Route path="/reglasdeljuego" element={<ReglasDelJuego/>} />
                <Route path="*" element={<PageError/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default App;
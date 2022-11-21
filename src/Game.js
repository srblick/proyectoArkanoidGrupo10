import Phaser from "phaser";
import { useEffect } from "react";
import { React, useState } from "react";
import Escena from "./components/Escena";
import EscenaSec from "./components/EscenaSec";
import Felicitaciones from "./components/Felicitaciones";
import GameOver from "./components/GameOver";
import Menu from "./components/Menu"


export default function Game(){

    //uso state de una variable listo, si no usamos esto los lienzos se acumulan en la vista.
    const [listo, setListo] = useState(false);

    //usamos el hook para que renderice acciones que react no hace.
    useEffect(()=>{
        const config = {
            type: Phaser.AUTO,
            scale: {
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
                width: 800,
                height: 600
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene:[Menu,Escena,Felicitaciones,GameOver,EscenaSec]

        };
        // arranca el Juego
        const game = new Phaser.Game(config);
        //trigger el juego esta completamente listo
        game.events.on("LISTO", setListo);
        //sino pongo esto se acumulan duplicados del lienzo
        return ()=>{
            setListo(false);
            game.destroy(true);
        }
    },[listo])
    
}
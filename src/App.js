import Phaser from "phaser";
import { useEffect } from "react";
import { React, useState } from "react";
import Escena from "./components/Escena";
import Felicitaciones from "./components/Felicitaciones";
import GameOver from "./components/GameOver";

export default function App(){

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
            scene:[Escena,Felicitaciones,GameOver]
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
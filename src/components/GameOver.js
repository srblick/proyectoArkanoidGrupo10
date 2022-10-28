import { BotonReiniciar } from "./BotonReiniciar";
import Phaser from "phaser";

class GameOver extends Phaser.Scene {
    constructor(){
        super({ key: 'gameover'})
        this.botonReiniciar = new BotonReiniciar(this);
    }

    preload(){
        this.load.image('gameover', 'img/gameOver.png');
        this.botonReiniciar.precargar();
    }

    create(){
        this.add.image(400, 300, 'fondo');
        this.botonReiniciar.crear();
        this.imagenGameOver = this.add.image(400,200,'gameover');
    }
}

export default GameOver;
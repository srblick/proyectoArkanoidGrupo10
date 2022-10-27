import Phaser from "phaser";
import BotonReiniciar from "./BotonReiniciar"

class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'gameOver'});
        this.botonReiniciar = new BotonReiniciar(this);
    }
    
    preload() {
        this.load.image('gameOver','img/gameover.png');
        this.botonReiniciar.precargar();
    }

    create() {
        this.add.image(400, 300, fondo);
        this.botonReiniciar.crear();
        this.imagenGameOver = this.add.image(400, 300, 'gameOver');
    }
}

export default GameOver;
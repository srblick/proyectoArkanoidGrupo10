import Phaser from "phaser";
import BotonReiniciar from "./BotonReiniciar"

class GameWin extends Phaser.Scene{
    constructor(){
        super({key: 'gameWin'});
        this.botonReiniciar = new BotonReiniciar(this);
    }
    
    preload() {
        this.load.image('gameWin','img/gamewin.png');
        this.botonReiniciar.precargar();
    }

    create() {
        this.add.image(400, 300, fondo);
        this.botonReiniciar.crear();
        this.imagenGameWin = this.add.image(400, 300, 'gameWin');
    }
}

export default GameWin;
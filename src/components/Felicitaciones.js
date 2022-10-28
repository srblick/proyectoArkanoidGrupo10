import { BotonReiniciar } from "./BotonReiniciar";
import Phaser from "phaser";

class Felicitaciones extends Phaser.Scene {
    constructor(){
        super({ key: 'felicitaciones'})
        this.botonReiniciar = new BotonReiniciar(this);
    }

    preload(){
        this.load.image('felicitaciones', 'img/felicitaciones1.png');
        this.botonReiniciar.precargar();
    }

    create(){
        this.add.image(400, 300, 'fondo');
        this.botonReiniciar.crear();
        this.imagenFelicitaciones = this.add.image(400,200,'felicitaciones');
    }
}

export default Felicitaciones;
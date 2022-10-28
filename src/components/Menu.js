import { BotonEscenarioA, botonEscenarioA } from "./BotonEscenarioA";
import { BotonEscenarioB, botonEscenarioB } from "./BotonEscenarioB";
import Phaser from "phaser";

class Menu extends Phaser.Scene {
    constructor(){
        super({ key: 'menu'})
        this.botonEscenarioA = new BotonEscenarioA(this);
        this.botonEscenarioB = new BotonEscenarioB(this);
    }

    preload(){
        this.load.image('menu', 'img/menu.jpg');
        this.botonEscenarioA.precargar();
        this.botonEscenarioB.precargar();
    }

    create(){
        this.add.image(400, 300, 'menu');
        this.botonEscenarioA.crear();
        this.botonEscenarioB.crear();
    }
}

export default Menu;
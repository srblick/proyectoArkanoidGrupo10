import Phaser from "phaser";

class Puntaje extends Phaser.Scene{
    constructor(scene){
    super({key: 'puntaje'})
    this.relatedScene = scene;
    this.puntuacion = 0;
    }

    create(){
        this.scoreText = this.relatedScene.add.text(16,16, 'PUNTOS: 0',{
            fontSize: '35px',
            fill: '#fff',
            fontFamily: 'arial'
        });
    }

    incrementarPuntos(puntos){
        this.puntuacion += puntos;
        this.scoreText.setText('PUNTOS: ' + this.puntuacion);
    }
}

export default Puntaje;
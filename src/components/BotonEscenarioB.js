export class BotonEscenarioB{
    constructor(escena){
        this.escenarelacionada = escena;
    }

    precargar(){
        this.escenarelacionada.load.image('botonB', 'img/botonB.png');
    }

    crear(){
        this.botoninicio = this.escenarelacionada.add.image(400,400,'botonB').setInteractive();

        this.botoninicio.on('pointerdown', () => {
            this.escenarelacionada.sound.add('audioButton',{loop: false}).play();
            this.escenarelacionada.scene.start('secundaria');
        });
        
    }
}
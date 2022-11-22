export class BotonEscenarioA{
    constructor(escena){
        this.escenarelacionada = escena;
    }

    precargar(){
        this.escenarelacionada.load.image('botonA', 'img/botonA.png');
    }

    crear(){
        this.botoninicio = this.escenarelacionada.add.image(400,200,'botonA').setInteractive();

        this.botoninicio.on('pointerdown', () => {
            this.escenarelacionada.sound.add('audioButton',{loop: false}).play();
            this.escenarelacionada.scene.start('principal');
        });
        
    }
}
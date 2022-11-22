export class BotonReiniciar{
    constructor(escena){
        this.escenarelacionada = escena;
    }

    precargar(){
        this.escenarelacionada.load.image('botonreiniciar', 'img/reiniciar.png');
    }

    crear(){
        this.botoninicio = this.escenarelacionada.add.image(400,450,'botonreiniciar').setInteractive();

        this.botoninicio.on('pointerdown', () => {
            this.escenarelacionada.sound.add('audioButton',{loop: false}).play();
            this.escenarelacionada.scene.start('menu');
        });
        
    }
}
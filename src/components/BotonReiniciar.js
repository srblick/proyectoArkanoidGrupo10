export class BotonReiniciar{
    constructor(escena){
        this.escenarelacionada = escena;
    }

    precargar(){
        this.escenarelacionada.load.image('boton', 'img/reiniciar.png');
    }

    crear(){
        this.botoninicio = this.escenarelacionada.add.image(400,450,'boton').setInteractive();

        this.botoninicio.on('pointerdown', () => {
            this.escenarelacionada.scene.start('principal');
        });
        
    }
}
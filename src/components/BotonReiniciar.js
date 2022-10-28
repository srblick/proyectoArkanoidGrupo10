export default class BotonReiniciar{
    constructor(escena){
        this.escenaRelacionada = escena;
    }

    precargar(){
        this.escenaRelacionada.load.spritesheet('boton', 'img/reiniciar.png',{frameWidth: 201, frameHeight: 84});
    }

    crear(){
        this.botonInicio = this.escenaRelacionada.add.sprite(400, 500, 'boton').setInteractive();

        //se activa cuando pasa el cursor por arriba del boton
        this.botonInicio.on('pointerover', () => {
            this.botonInicio.setFrame(1);
        });
        //se activa cuando el cursor sale del boton
        this.botonInicio.on('pointerout', () => {
            this.botonInicio.setFrame(0);
        });
        //se activa cuando hace click en el boton y cambia a la escena principal
        this.botonInicio.on('pointerdown', () => {
            this.botonInicio.setFrame(2);
            this.escenaRelacionada.scene.start('principal');
        });
    }
}
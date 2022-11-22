import Phaser from "phaser";

class Escena extends Phaser.Scene{

    constructor(){
        super({key: 'principal'})
    }
    platform = null;
    pelota = null;
    gameOver = null;
    puntaje = null;

    cursor = null;

    audioBloque;
    audioPlataforma;
    
    //metodo para iniciar una puntuacion
    init(){
        this.puntaje = 0;
    }
    
    //Precarga de todos los elementos de la escena
    preload ()
    {
        this.load.image('fondo', 'img/fondo.png');
        this.load.image('platform', 'img/platform.png');
        this.load.image('pelota', 'img/pelota.png');

        this.load.image('gameOver', 'img/gameOver.png');

        this.load.image('bloqueRojo', 'img/bloqueRojo.png');
        this.load.image('bloqueAzul', 'img/bloqueAzul.png');

    }

    create ()
    {
        //los bordes, excepto la parte inferior de la escena, tienen colisiones
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        //agrega la imagen de fondo
        this.add.image(400, 300,'fondo');

        //Ubica la puntuación en la esquina derecha, con su forma
        this.puntajeEnTexto = this.add.text(16,16, 'PUNTOS: 0',{
            fontSize: '35px',
            fill: '#fff',
            fontFamily: 'arial'
        });

        //TODO SOBRE EL GRUPO DE BLOQUES
        this.grupoDeBloques = this.physics.add.staticGroup({
            key: ['bloqueRojo', 'bloqueAzul'],
            frameQuantity: 8,
            gridAlign: {
                width: 8,
                height: 3,
                cellWidth: 100,
                cellHeight: 60,
                x: 55,
                y: 100  
            }
        });


        //TODO SOBRE LA PLATAFORMA
        this.platform = this.physics.add.image(400,550, 'platform').setImmovable();
        this.platform.body.allowGravity = false;
        this.platform.setCollideWorldBounds(true);

        //TODO SOBRE LA PELOTA
        this.pelota = this.physics.add.image(400,520, 'pelota');
        //El "setData" guarda un estado de la pelota en esta caso "reposo"
        this.pelota.setData('reposo', true)
        this.pelota.setCollideWorldBounds(true);

        //COLISIONES DE LA PELOTA, PLATAFORMA Y BLOQUES
        this.physics.add.collider(this.pelota, this.platform, this.ImpactoPlatform, null, this);
        this.physics.add.collider(this.pelota, this.grupoDeBloques, this.ImpactoBloque, null, this);

        this.pelota.setBounce(1);

        //INPUT PARA LOS CONTROLES DE LA PLATAFORMA
        this.cursors = this.input.keyboard.createCursorKeys();

        //Agrego audios
        this.audioBloque = this.sound.add('audioBloque',{loop: false});
        this.audioPlataforma = this.sound.add('audioPlataforma',{loop: false});

    }
    
    //METODO CUANDO IMPACTA LA PELOTA CON EL BLOQUE
    ImpactoBloque(pelota, bloque){
        bloque.disableBody(true,true);
        this.aumentarPuntaje(15);
        this.audioBloque.play();
        //si llegan los bloques a cero se carga la escena de "felicitaciones"
        if(this.grupoDeBloques.countActive() === 0){
            this.mostrarFelicitaciones();
        }
    }
    aumentarPuntaje(puntos){
        this.puntaje += puntos;
        this.puntajeEnTexto.setText('PUNTOS: ' + this.puntaje);
    }

    ImpactoPlatform(){

        //REDIRECCIONA LA PELOTA SEGUN DONDE QUE PARTE DE LA PLATAFORMA GOLPEE
        let impactoRelativo = this.pelota.x - this.platform.x;

        this.audioPlataforma.play();

        if(impactoRelativo < 0.1 && impactoRelativo > -0.1){
            this.pelota.setVelocityX(Phaser.Math.Between(-10, 10))
        } else{
        this.pelota.setVelocityX(10 * impactoRelativo);
        }
    }
    
    update()
    {
        //ESTOS "IF" SENTENCIAN EL MOVIMIENTO DE LA PLATAFORMA
        if(this.cursors.left.isDown){
            this.platform.setVelocityX(-320);

            if(this.pelota.getData('reposo')){
                this.pelota.setVelocityX(-320);
            }
        }
        else if(this.cursors.right.isDown){
            this.platform.setVelocityX(320);

            if(this.pelota.getData('reposo')){
                this.pelota.setVelocityX(320);
            }
        }
        else{
            this.platform.setVelocityX(0);
            if(this.pelota.getData('reposo')){
                this.pelota.setVelocityX(0);
            }
        }
        //LANZA LA PELOTA HACIA ARRIBA
        if(this.cursors.up.isDown){
            this.pelota.setVelocity(-75, -320);
            this.pelota.setData('reposo', false);
        }

        //ESTE "IF" CARGA LA ESCENA CUANDO LA PELOTA CAE AL VACIO
        if(this.pelota.y > 600){
            this.mostrarGameOver();
        }
    }

    //METODO PARA CARGAR LA ESCENA DE "GAMEOVER"
    mostrarGameOver(){
        this.scene.start('gameover');
    }

    //METODO PARA CARGAR LA ESCENA DE "FELICITACIONES"
    mostrarFelicitaciones(){
        this.scene.start('felicitaciones');
    }

}
export default Escena;
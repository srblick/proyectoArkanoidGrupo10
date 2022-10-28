import Phaser from "phaser";


class Escena extends Phaser.Scene{

    constructor(){
        super({key:'principal'});
    }
    platforms = null;
    cursors = null;

    init(){
        this.puntaje = 0;
    }

    preload ()
    {
        this.load.image('fondo', 'img/fondo01.png');
        //cargamos las imagenes para nuestro juego
        this.load.spritesheet('pelota', 
            'img/balls.png',
            { frameWidth: 10, frameHeight: 10 }
        );
        this.load.spritesheet('vaus', 
            'img/player.png',
            { frameWidth: 88, frameHeight: 22 }
        );
        //cargamos los bloques
        this.load.image('bBlue', 'img/bBlue.png');
        this.load.image('bRed', 'img/bRed.png');
        this.load.image('bGreen', 'img/bGreen.png');
        this.load.image('bOrange', 'img/bOrange.png');
        this.load.image('bViolet', 'img/bViolet.png');
        this.load.image('bGray', 'img/bGray.png');
        this.load.image('bYellow', 'img/bYellow.png');
        this.load.image('bCyan', 'img/bCyan.png');
        this.load.image('bRock', 'img/bRock.png');
        this.load.image('bBronce', 'img/bBronce.png');
    }

    create ()
    {
        //creando fondo
        this.add.image(400, 300, 'fondo');
        //creamos el texto para el puntaje
        this.puntosEnTexto = this.add.text(10, 10, 'Puntos: 0', {
            fontSize: '20px',
            fill: 'green',
            fontFamily: 'arial'
        });

        //se anade la fisica a la  nave
        //Agregamos la pelota y creamos la animacion
        this.plataforms = this.physics.add.sprite(400, 500, 'vaus').setImmovable();
        this.anims.create({
            key: 'animaVaus',
            frames: this.anims.generateFrameNumbers('vaus', { start: 15, end: 18 }),
            frameRate: 10,
            repeat: -1
        });
        // se quita la gravedad a la nave
        this.plataforms.body.allowGravity = false;
        this.plataforms.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        //Agregamos la pelota y creamos la animacion
        this.pelota = this.physics.add.sprite(400,484, 'pelota');
        this.anims.create({
            key: 'animaPelota',
            frames: this.anims.generateFrameNumbers('pelota', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.pelota.setData('pegada', true);
        this.pelota.setCollideWorldBounds(true);
        this.pelota.setBounce(1);
        //this.pelota.setVelocity(50, 50);

        this.physics.add.collider(this.pelota, this.plataforms, this.contarColisiones, null, this);
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bloques = this.physics.add.staticGroup({
            key:['bBlue', 'bRed', 'bGreen', 'bOrange', 'bViolet', 'bGray', 'bYellow', 'bCyan', 'bRock', 'bBronce'],
            frameQuantity: 3,
            gridAlign:{
                width: 10,
                height: 3,
                cellWidth: 46,
                cellHeight: 24,
                x: 200,
                y: 50
            }
        });

        this.physics.add.collider(this.pelota, this.bloques, this.ColisionPelotaBloque, null, this);

        const keyCode = Phaser.Input.Keyboard.KeyCodes;

        this.teclaA = this.input.keyboard.addKey(keyCode.A);
    }
    
    update()
    {
        // movemos la nave segun la tecla que se precione
        if(this.cursors.left.isDown){
            this.plataforms.setVelocityX(-300);
            if(this.pelota.getData('pegada')){
                this.pelota.setVelocityX(-300);
            }
        }else if(this.cursors.right.isDown){
            this.plataforms.setVelocityX(300);
            if(this.pelota.getData('pegada')){
                this.pelota.setVelocityX(300);
            }
        }else{
            this.plataforms.setVelocityX(0);
            if(this.pelota.getData('pegada')){
                this.pelota.setVelocityX(0);
            }
        }
        if(this.cursors.up.isDown){
            this.pelota.setVelocity(250,-250);
            this.pelota.setData('pegada', false);
        }

        this.plataforms.anims.play('animaVaus', true);
        this.pelota.anims.play('animaPelota', true);
        if(this.pelota.y > 600){
            this.mostrarGameOver();
        }
    }

    ColisionPelotaBloque(pelota, bloques){
        bloques.disableBody(true, true);
        this.AumentarPuntaje(1);
        if(this.bloques.countActive() === 0){
            this.mostrarGameWin();
        }
    }

    AumentarPuntaje(puntos){
        this.puntaje += puntos;
        this.puntosEnTexto.setText('Puntos: '+this.puntaje);
    }
    
    contarColisiones(pelota, plataforms){
        let lugarDeImpacto = pelota.x - plataforms.x;
        if(lugarDeImpacto > 0 || lugarDeImpacto < 0){
            pelota.setVelocityX(7 * lugarDeImpacto);
        }else{
            pelota.setVelocityX(Phaser.Math.Between(-11, 11));
        }
    }

    mostrarGameOver(){
        this.scene.start('gameOver')
    }
    mostrarGameWin(){
        this.scene.start('gameWin')
    }


}
export default Escena;
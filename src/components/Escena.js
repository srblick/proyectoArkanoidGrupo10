import Phaser from "phaser";

class Escena extends Phaser.Scene{

    contructor(){
        super({key:'principal'})
    }
    platforms = null;
    cursors = null;

    init(){
        this.puntaje = 0;
    }

    preload ()
    {
        //cargamos las imagenes para nuestro juego
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('vauns', 'assets/skies/space3.png');
        this.load.image('pelota', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create ()
    {
        //creando fondo
        this.add.image(400, 300, 'vauns');

        this.imagenGameOver = this.add.image(400, 256, 'gameOver');
        this.imagenGameOver.visible = false;

        this.puntosEnTexto = this.add.text(10, 10, 'Puntos: 0', {
            fontSize: '20px',
            fill: 'red',
            fontFamily: 'arial'
        });

        this.imagenGameWin = this.add.image(400, 256, 'gameWin');
        this.imagenGameWin.visible = false;
        //se anade la fisica a la  nave
        this.plataforms = this.physics.add.image(400, 500, 'vauns').setImmovable();
        // se quita la gravedad a la nave
        this.plataforms.body.allowGravity = false;
        this.plataforms.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.pelota = this.physics.add.image(400,50, 'pelota');
        this.pelota.setData('pegada', true);
        this.pelota.setCollideWorldBounds(true);
        this.pelota.setBounce(1);
        //this.pelota.setVelocity(50, 50);

        this.physics.add.collider(this.pelota, this.plataforms, this.contarColisiones, null, this);
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bloques = this.physics.add.staticGroup({
            key:['bloqueVioleta', 'bloqueRojo', 'bloqueVerde'],
            frameQuantity: 10,
            gridAlign:{
                width: 10,
                height: 5,
                cellWidth: 85,
                cellHeight: 35,
                x: 50,
                y: 50
            }
        });

        this.physics.add.collider(this.pelota, this.bloques, this.ColisionPelotaBloque, null, this);

        const keyCode = Phaser.input.keyboard.keyCode;

        this.teclaA = this.input.keyboard.addKey(keyCode.A);
    }
    
    update()
    {
        // movemos la nave segun la tecla que se precione
        if(this.cursors.left.isDown){
            this.plataforms.setVelocityX(-100);
        }else if(this.cursors.left.isDown){
            this.plataforms.setVelocityX(100);
        }else{
            this.plataforms.setVelocityX(0);
        }

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

    mostrarGameOver(){
        this.scene.start('gameOver')
    }
    mostrarGameWin(){
        this.scene.start('gameWin')
    }

}
export default Escena;
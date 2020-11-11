import 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  init() {
    this.gameOver = false;

    this.score = 0;
  }

  preload() {
    // load images
    this.load.image('logo', '../../assets/gamer_logo.png');
    this.load.image('sky', '../../assets/sky.png');
    this.load.image('ground', '../../assets/platform.png');
    this.load.image('flower', '../../assets/flower.png');
    this.load.image('shell', '../../assets/shell.png');
    this.load.spritesheet('girl', '../../assets/player.png', { frameWidth: 81, frameHeight: 99 });

  }


  create() {
    // this.add.image(400, 300, 'logo');
    //  A simple background for our game
    this.add.image(450, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(3).refreshBody();
    // this.platforms.create(450, 595, 'ground').setScale(3).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    // this.platforms.create(830, 430, 'ground');
    // this.platforms.create(150, 250, 'ground');
    // this.platforms.create(850, 220, 'ground');

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, 'girl');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Add the player animations: turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'girl', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('girl', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    //  Keyborad Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some flowers to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.flowers = this.physics.add.group({
      key: 'flower',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.flowers.children.iterate(function(child) {

      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.shells = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '33px', fill: '#000000' });

    //  Collide the player, and the flowers with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.flowers, this.platforms);
    this.physics.add.collider(this.shells, this.platforms);

    //  Check to see if the player overlaps with any of the flowers, if he does call the gatherFlower function
    this.physics.add.overlap(this.player, this.flowers, this.gatherFlower, null, this);

    this.physics.add.collider(this.player, this.shells, this.hitShell, null, this);
  }


  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown) {

      if (this.player.body.touching.down) {
        this.player.setVelocityY(-330);
        this.canDoubleJump = true;
      } else if (this.canDoubleJump) {
        this.player.setVelocityY(-330);
      }

    }
  }

  gatherFlower(player, flower) {
    flower.disableBody(true, true);

    // Update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.flowers.countActive(true) === 0) {
      //  A new batch of flowers to gather
      this.flowers.children.iterate(function(child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      let shellDistx = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      this.shell = this.shells.create(shellDistx, 16, 'shell');
      this.shell.setBounce(1);
      this.shell.setCollideWorldBounds(true);
      this.shell.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.shell.allowGravity = false;

    }
  }

  hitShell() {
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    this.gameOver = true;
  }
};
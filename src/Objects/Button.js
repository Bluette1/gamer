import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(contextScene, width, height, firstBtn, secondBtn, text, targetedScene) {
    super(contextScene);
    this.scene = contextScene;
    this.x = width;
    this.y = height;

    this.button = this.scene.add.sprite(0, 0, firstBtn).setInteractive();
    this.text = this.scene.add.text(0, 0, text, { fontSize: '33px', fill: '#ffffff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', function() {
      this.scene.scene.start(targetedScene);
    }.bind(this));

    this.button.on('pointerover', function() {
      this.button.setTexture(secondBtn);
    }.bind(this));

    this.button.on('pointerout', function() {
      this.button.setTexture(firstBtn);
    }.bind(this));

    this.scene.add.existing(this);
  }
}
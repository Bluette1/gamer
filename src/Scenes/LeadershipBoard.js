import Phaser from 'phaser';
import config from '../Config/config';
import Api from '../ScoreService/Api';

export default class LeadershipBoard extends Phaser.Scene {
  constructor() {
    super('LeadershipBoard');
  }
  init() {
    this.leaders = this.sys.game.globals.leaders;
  }

  create() {
    this.text = this.add.text(0, 0, 'Top 10 Gamers', { fontSize: '33px', fill: '#FFB6C1' });
    this.leadersZone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );


    if (this.leaders) {
      this.leaders = Api.topScores(10, this.leaders);

      let displayScores = '';
      this.leaders.forEach(entry => {
        displayScores += `\n${entry.user}: ${entry.score}`;
      });
      this.scores = this.add.text(1, 1, displayScores, { lineSpacing: 20, fontSize: 20, fill: '#FFB6C1' });
      Phaser.Display.Align.In.Center(this.scores, this.leadersZone, 0, -50);
    } else {
      const err = this.add.text(0, 0, `There was a problem connecting to the Leaderboard API!`);
      Phaser.Display.Align.In.Center(err, this.leadersZone);
    }

    Phaser.Display.Align.In.Center(
      this.text,
      this.leadersZone,
    );

    this.text.setY(50);

    this.begin();
  }

  begin() {
    setTimeout(() => {
      this.scene.start('Title');
    }, 8000);
  }
}
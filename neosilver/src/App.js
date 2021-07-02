import { Component } from 'react';
import Player from "./Player";
import './App.css';


const weapons = ["rock", "paper", "scissors"];
let pScore = 0;
let bScore = 0;

class App extends Component {
  state = {
    player: weapons[0],
    bot: weapons[0],
    winner: ""
  };

  startGame = () => {
    let cpt = 0;
    let gameInterval = setInterval(() => {
      cpt++;

      this.setState({
        bot: weapons[Math.floor(Math.random() * weapons.length)],
        winner: ""
      });

      if (cpt > 5) {
        clearInterval(gameInterval);
        this.setState({
          winner: this.selectWinner()
        });
      }
    }, 100);
  }

  updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const botScore = document.querySelector(".bot-score p");
    playerScore.textContent = pScore;
    botScore.textContent = bScore;
  };

  selectWinner = () => {
    const winner = document.querySelector(".winner");
    const { player, bot } = this.state;

    if (player === bot) {
      winner.textContent = "Oops it's a Tie!";
      return;
    } else if ((player === "rock" && bot === "scissors") ||
      (player === "scissors" && bot === "paper") ||
      (player === "paper" && bot === "rock")) {
        winner.textContent = "Player Wins!";
        pScore++;
        this.updateScore();
        return;
    } else {
        winner.textContent = "Bot Wins!";
        bScore++;
        this.updateScore();
        return;
    }
  };

  selectWeapon = weapon => {
    this.setState({
      player: weapon,
      winner: ""
    });
  };

  render() {
    const { player, bot } = this.state;
    return (
      <>
        <section className="game">
          <div className="score">
            <div className="player-score">
              <h2>Player</h2>
              <p>0</p>
            </div>
            <div className="bot-score">
              <h2>Bot</h2>
              <p>0</p>
            </div>
          </div>
        </section>

        <div className="intro">
          <h1>Rock Paper and Scissors</h1>
          <button>Let's Play</button>
        </div>

        <div className="match">
          <h2 className="winner">Choose an option</h2>
          <div className="hands">
            <Player weapon={player} />
            <Player weapon={bot} />
          </div>

          <div className="options">
            <button className="rock" onClick={() => this.startGame(this.selectWeapon("rock"))}>rock</button>
            <button className="paper" onClick={() => this.startGame(this.selectWeapon("paper"))}>paper</button>
            <button className="scissors" onClick={() => this.startGame(this.selectWeapon("scissors"))}>scissor</button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
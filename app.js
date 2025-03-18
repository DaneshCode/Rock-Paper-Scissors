const CHOICES = ['Rock', 'Paper', 'Scissors'];
const WINNING_SCORE = 5;

class Game {
  constructor() {
    this.scores = { player: 0, computer: 0 };
    this.elements = {
      player: document.getElementById('playerChoice'),
      computer: document.getElementById('computerChoice'),
      result: document.getElementById('result'),
      playerScore: document.getElementById('playerScore'),
      computerScore: document.getElementById('computerScore')
    };
    this.initializeGame();
  }

  initializeGame() {
    document.querySelectorAll('.buttons button').forEach(button => {
      button.addEventListener('click', () => this.handleChoice(button.dataset.choice));
    });
  }

  async handleChoice(playerChoice) {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

    this.resetAnimations();
    await this.animateChoices(playerChoice, computerChoice);
    this.updateScores(playerChoice, computerChoice);
  }

  resetAnimations() {
    Object.values(this.elements).forEach(el => {
      if (el.id !== 'playerScore' && el.id !== 'computerScore') {
        el.classList.remove('show');
        el.style.transform = 'translateY(20px)';
      }
    });
  }

  async animateChoices(playerChoice, computerChoice) {
    await this.animate(this.elements.player, playerChoice, 300);
    await this.animate(this.elements.computer, computerChoice, 500);

    const result = this.getResult(playerChoice, computerChoice);
    await this.animate(this.elements.result, result, 500);
  }

  animate(element, text, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        element.textContent = text;
        element.classList.add('show');
        element.style.transform = 'translateY(0)';
        resolve();
      }, delay);
    });
  }

  getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return '🤝 Draw!';

    const winConditions = {
      Rock: 'Scissors',
      Paper: 'Rock',
      Scissors: 'Paper'
    };

    return winConditions[playerChoice] === computerChoice ? '🎉 You Win!' : '💔 You Lose!';
  }

  updateScores(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return;

    const playerWins = this.getResult(playerChoice, computerChoice).includes('Win');
    this.scores[playerWins ? 'player' : 'computer']++;

    this.updateScoreDisplay();
    this.checkGameEnd();
  }

  updateScoreDisplay() {
    this.elements.playerScore.textContent = `Player Score: ${this.scores.player}`;
    this.elements.computerScore.textContent = `Computer Score: ${this.scores.computer}`;
  }

  checkGameEnd() {
    if (this.scores.player === WINNING_SCORE || this.scores.computer === WINNING_SCORE) {
      const winner = this.scores.player === WINNING_SCORE ? '🎉 You Win' : '💔 You Lose';
      this.elements.result.textContent = `${winner} the Game!`;
      this.scores.player = this.scores.computer = 0;
      this.updateScoreDisplay();
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new Game());

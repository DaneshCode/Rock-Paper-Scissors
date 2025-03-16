function choice(playerChoice) {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Reset previous state
  const elements = ['playerChoice', 'computerChoice', 'result'].map((id) =>
    document.getElementById(id),
  );
  elements.forEach((el) => {
    el.classList.remove('show');
    el.style.transform = 'translateY(20px)';
  });

  // Animate player choice
  setTimeout(() => {
    elements[0].innerText = playerChoice;
    elements[0].classList.add('show');
    elements[0].style.transform = 'translateY(0)';
  }, 300);

  // Animate computer choice
  setTimeout(() => {
    elements[1].innerText = computerChoice;
    elements[1].classList.add('show');
    elements[1].style.transform = 'translateY(0)';
  }, 800);

  // Update scores and show result
  setTimeout(() => {
    const result = getResult(playerChoice, computerChoice);
    elements[2].innerHTML = result;
    elements[2].classList.add('show');
    elements[2].style.transform = 'translateY(0)';

    // Update scores based on result
    updateScores(playerChoice, computerChoice);
  }, 1300);
}

function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return '🤝 Draw !';
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    return '🎉 You Win !';
  }
  return '💔 You Lose !';
}

let humanScore = 0;
let computerScore = 0;
const humanScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');

function updateScores(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return;
  }
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    humanScore++;
  } else {
    computerScore++;
  }

  // Update score display
  humanScoreElement.textContent = `Player Score: ${humanScore}`;
  computerScoreElement.textContent = `Computer Score: ${computerScore}`;

  if (humanScore === 5) {
    document.getElementById('result').innerHTML = '🎉 You Win the Game !';
    resetGame();
  }
  if (computerScore === 5) {
    document.getElementById('result').innerHTML = '💔 You Lose the Game !';
    resetGame();
  }
  function resetGame() {
    humanScore = 0;
    computerScore = 0;
  }
}

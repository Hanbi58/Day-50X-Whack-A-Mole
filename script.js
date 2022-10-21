function getRandomUrl() {
  const randomNum = Math.floor(Math.random() * 8 + 1);
  return `./Assets/G${randomNum}.png`;
}

const startBtn = document.querySelector(".start");
const backDrop = document.querySelector(".back-drop");
const gameBoardEl = document.querySelector(".game");
const timeLeftEl = document.querySelector(".timeLeft");
const scoreEl = document.querySelector(".score");
let time = 30;
let score = 0;

startBtn.addEventListener("click", () => {
  backDrop.classList.add("hid");
  gameBoardEl.classList.remove("hid");
  time = 30;
  score = 0;
  gameStart();
});

const gameBoardWidth = +getComputedStyle(gameBoardEl).width.substring(
  0,
  getComputedStyle(gameBoardEl).width.length - 2
);
const gameBoardHeight = +getComputedStyle(gameBoardEl).height.substring(
  0,
  getComputedStyle(gameBoardEl).height.length - 2
);
function makeGopher() {
  const gopher = document.createElement("div");
  gopher.classList.add("gopher");
  gameBoardEl.appendChild(gopher);
  gopher.style.backgroundImage = `url(${getRandomUrl()})`;
  gopher.style.top = `${Math.floor(Math.random(0) * gameBoardHeight)}px`;
  gopher.style.left = `${Math.floor(Math.random(0) * gameBoardWidth)}px`;
  gopher.addEventListener("click", () => {
    score++;
    scoreEl.innerText = `Score:${("0" + score).slice(-2)}`;
    gopher.classList.add("disappear");
    setTimeout(() => {
      gopher.remove();
    }, 3000);
  });
}

function gameStart() {
  const gameItl = setInterval(() => {
    makeGopher();
  }, 300);
  const timeItl = setInterval(() => {
    time--;
    timeLeftEl.innerText = `Time Left:${time}s`;
    if (time <= 0) {
      clearInterval(timeItl);
      clearInterval(gameItl);
      backDrop.classList.remove("hid");
      gameBoardEl.classList.add("hid");
      backDrop.innerHTML = `<div class="modal">
      <h1>Your Score is ${score} </h1>
      <h2>希望你的游戏经历紧张又刺激嘿嘿</h2>
      <button class="start">Restart</button>
    </div>`;
      const startBtn = document.querySelector(".start");
      startBtn.addEventListener("click", () => {
        backDrop.classList.add("hid");
        gameBoardEl.classList.remove("hid");
        gameBoardEl.innerHTML = `<div class="board">
        <div class="timeLeft tx">Time Left:30s</div>
        <div class="score tx">Score:00</div>
      </div>`;
        time = 30;
        score = 0;

        gameStart();
      });
    }
  }, 1000);
}

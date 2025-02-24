const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector("#new-btn");
const resetBtn = document.querySelector("#reset-btn");
const resultBox = document.querySelector("#result");
const msgContainer = document.querySelector(".msg-container");

let isPlayerX = true;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

newGameBtn.addEventListener("click", () => {
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hide");
  boxes.forEach((box) => {
    box.innerText = "";
    resultBox.innerText = "";
    enableButtons();
    box.classList.remove("no-hover");
  });
});

resetBtn.addEventListener("click", () => {
  isPlayerX = true;
  msgContainer.classList.add("hide");
  boxes.forEach((box) => {
    box.innerText = "";
    resultBox.innerText = "";
    box.classList.remove("no-hover");
  });
  enableButtons(); // Ensure cursor is set back to pointer when resetting
});

const disableButtons = () => {
  boxes.forEach((box) => {
    box.disabled = true;
    box.style.cursor = "default"; // Reset cursor to default after game ends
    box.classList.add("no-hover");
  });
};

const enableButtons = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.style.cursor = "pointer";
    box.classList.remove("no-hover");
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (isPlayerX) {
      box.classList.add("x");
      box.innerText = "X";
      box.style.color = "#e63946";
    } else {
      box.classList.add("o");
      box.innerText = "O";
      box.style.color = "#1d3557";
    }

    box.disabled = true;
    isPlayerX = !isPlayerX;
    checkWinner();
  });
});

const displayWinner = (winner) => {
  resultBox.innerText = `Congratulations, ${winner} wins! 🚩`;
  msgContainer.classList.remove("hide");
  disableButtons();
  resetBtn.classList.add("hide");
};

const checkWinner = () => {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      displayWinner(val1);
      return;
    }
  }
};

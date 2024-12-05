const inputElm = document.getElementById("input");
const storedInput = localStorage.getItem("day4-input");
if (storedInput !== null) {
  inputElm.value = storedInput;
}
const inputSaveBtn = document.getElementById("input-save");
inputSaveBtn?.addEventListener("click", () => {
  localStorage.setItem("day4-input", inputElm.value);
});

const part1Solve = document.getElementById("part1-solve");
const part2Solve = document.getElementById("part2-solve");

part1Solve?.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split(/\s+/);
  let result = 0;

  const rows = input.length;
  const cols = input[0].length;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (input[i][j] === "X") {
        if (
          input[i - 1] !== undefined &&
          input[i - 1][j - 1] === "M" &&
          input[i - 2] !== undefined &&
          input[i - 2][j - 2] === "A" &&
          input[i - 3] !== undefined &&
          input[i - 3][j - 3] === "S"
        ) {
          ++result;
        }

        if (
          input[i - 1] !== undefined &&
          input[i - 1][j] === "M" &&
          input[i - 2] !== undefined &&
          input[i - 2][j] === "A" &&
          input[i - 3] !== undefined &&
          input[i - 3][j] === "S"
        ) {
          ++result;
        }

        if (
          input[i - 1] !== undefined &&
          input[i - 1][j + 1] === "M" &&
          input[i - 2] !== undefined &&
          input[i - 2][j + 2] === "A" &&
          input[i - 3] !== undefined &&
          input[i - 3][j + 3] === "S"
        ) {
          ++result;
        }

        if (
          input[i][j - 1] === "M" &&
          input[i][j - 2] === "A" &&
          input[i][j - 3] === "S"
        ) {
          ++result;
        }

        if (
          input[i][j + 1] === "M" &&
          input[i][j + 2] === "A" &&
          input[i][j + 3] === "S"
        ) {
          ++result;
        }

        if (
          input[i + 1] !== undefined &&
          input[i + 1][j - 1] === "M" &&
          input[i + 2] !== undefined &&
          input[i + 2][j - 2] === "A" &&
          input[i + 3] !== undefined &&
          input[i + 3][j - 3] === "S"
        ) {
          ++result;
        }

        if (
          input[i + 1] !== undefined &&
          input[i + 1][j] === "M" &&
          input[i + 2] !== undefined &&
          input[i + 2][j] === "A" &&
          input[i + 3] !== undefined &&
          input[i + 3][j] === "S"
        ) {
          ++result;
        }

        if (
          input[i + 1] !== undefined &&
          input[i + 1][j + 1] === "M" &&
          input[i + 2] !== undefined &&
          input[i + 2][j + 2] === "A" &&
          input[i + 3] !== undefined &&
          input[i + 3][j + 3] === "S"
        ) {
          ++result;
        }
      }
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part1-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part1-stats");
  stats?.replaceChildren(`${duration} ms`);
});

const canvas = document.getElementById("part2-canvas");
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#202020";
ctx.fillRect(0, 0, canvas.width, canvas.height);

part2Solve.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split(/\s+/);
  let result = 0;

  ctx.fillStyle = "white";
  ctx.font = "30px Monospace";
  const rows = input.length;
  const cols = input[0].length;
  for (let i = 0; i < rows; ++i) {
    ctx.fillText(input[i], 0, 30 * i);
    for (let j = 0; j < cols; ++j) {
      if (input[i][j] === "A") {
        if (input[i - 1] !== undefined && input[i + 1] !== undefined) {
          const tl = input[i - 1][j - 1];
          const br = input[i + 1][j + 1];

          const tr = input[i - 1][j + 1];
          const bl = input[i + 1][j - 1];

          if (
            ((tl === "M" && br === "S") || (tl === "S" && br === "M")) &&
            ((tr === "M" && bl === "S") || (tr === "S" && bl === "M"))
          ) {
            ++result;
          }
        }
      }
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

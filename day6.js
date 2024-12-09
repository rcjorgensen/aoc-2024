class Game {
  /**
   * @param {number} rows
   * @param {number} cols
   */
  constructor(rows, cols) {
    this.board = [];
    for (let i = 0; i < rows; ++i) {
      this.board.push(Array(cols).fill(0));
    }

    this.positionX = null;
    this.positionY = null;

    this.direction = "UP";

    this.visited = [];
    for (let i = 0; i < rows; ++i) {
      this.visited.push(Array(cols).fill(0));
    }

    this.done = false;
  }

  get width() {
    return this.board[0].length;
  }

  get height() {
    return this.board.length;
  }

  get visitCount() {
    let count = 0;
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        count += this.visited[i][j];
      }
    }
    return count;
  }

  /**
   * @param {string} input
   * @returns {Board}
   */
  static parse(input) {
    const rows = input.trim().split("\n");
    const game = new Game(rows.length, rows[0].length);
    for (let i = 0; i < rows.length; ++i) {
      for (let j = 0; j < rows[0].length; ++j) {
        if (rows[i][j] === "#") {
          game.board[i][j] = 1;
          continue;
        }

        if (rows[i][j] === "^") {
          game.positionX = j;
          game.positionY = i;
          game.visited[i][j] = 1;
        }
      }
    }
    return game;
  }

  next() {
    switch (this.direction) {
      case "UP":
        if (this.board[this.positionY - 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY - 1][this.positionX] === 1) {
          this.direction = "RIGHT";
          return;
        }

        this.positionY -= 1;

        break;
      case "RIGHT":
        if (this.board[this.positionY][this.positionX + 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY][this.positionX + 1] === 1) {
          this.direction = "DOWN";
          return;
        }

        this.positionX += 1;
        break;
      case "DOWN":
        if (this.board[this.positionY + 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY + 1][this.positionX] === 1) {
          this.direction = "LEFT";
          return;
        }

        this.positionY += 1;

        break;
      case "LEFT":
        if (this.board[this.positionY][this.positionX - 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY][this.positionX - 1] === 1) {
          this.direction = "UP";
          return;
        }

        this.positionX -= 1;

        break;
    }

    this.visited[this.positionY][this.positionX] = 1;
  }

  /**
   * @param {HTMLCanvasElement} canvas
   */
  render(canvas) {
    const scale = 5;
    const padding = 10;
    const width = scale * this.width;
    const height = scale * this.height;
    const ctx = canvas.getContext("2d");
    canvas.width = width + 2 * padding;
    canvas.height = height + 2 * padding;

    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //ctx.strokeStyle = "grey";
    //ctx.beginPath();

    //// draw horizontal grid lines
    //for (let i = 0; i <= height; i += scale) {
    //  ctx.moveTo(padding, i + padding + offSet);
    //  ctx.lineTo(width + padding, i + padding + offSet);
    //}
    //
    //// draw vertical grid lines
    //for (let j = 0; j <= width; j += scale) {
    //  ctx.moveTo(j + padding + offSet, padding);
    //  ctx.lineTo(j + padding + offSet, height + padding);
    //}
    //
    //ctx.stroke();

    // draw obstacles and visited
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        if (this.board[i][j] === 1) {
          ctx.fillStyle = "#6A5ACD";
          ctx.fillRect(scale * j + padding, scale * i + padding, scale, scale);
        } else if (this.visited[i][j] === 1) {
          ctx.fillStyle = "#FDFD96";
          ctx.fillRect(scale * j + padding, scale * i + padding, scale, scale);
        }
      }
    }
  }
}

const inputElm = document.getElementById("input");

const storedInput = localStorage.getItem("day6-input");
if (storedInput !== null) {
  inputElm.value = storedInput;
}

const storedScroll = localStorage.getItem("day6-input-scroll");
if (storedScroll !== null) {
  inputElm.scrollTop = parseInt(storedScroll);
}

const storedSize = localStorage.getItem("day6-input-size");
if (storedSize !== null) {
  const { width, height } = JSON.parse(storedSize);
  inputElm.style.width = `${width}px`;
  inputElm.style.height = `${height}px`;
}

window.onbeforeunload = () => {
  localStorage.setItem("day6-input-scroll", inputElm.scrollTop);
  localStorage.setItem(
    "day6-input-size",
    JSON.stringify({
      width: inputElm.offsetWidth,
      height: inputElm.offsetHeight,
    }),
  );
};

const inputSaveBtn = document.getElementById("input-save");
inputSaveBtn.addEventListener("click", () => {
  localStorage.setItem("day6-input", inputElm.value);
});

const part1Solve = document.getElementById("part1-solve");
const part2Solve = document.getElementById("part2-solve");

part1Solve?.addEventListener("click", () => {
  const start = performance.now();

  const game = Game.parse(inputElm.value);

  while (!game.done) {
    game.next();
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part1-answer");
  answer.value = `${game.visitCount}`;

  const stats = document.getElementById("part1-stats");
  stats?.replaceChildren(`${duration} ms`);
});

const DIR_UP = 1;
const DIR_RIGHT = 2;
const DIR_DOWN = 4;
const DIR_LEFT = 8;

class Game2 {
  /**
   * @param {number} rows
   * @param {number} cols
   */
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.board = [];
    for (let i = 0; i < rows; ++i) {
      this.board.push(Array(cols).fill(0));
    }

    this.positionX = null;
    this.positionY = null;

    this.direction = DIR_UP;

    this.visited = [];
    for (let i = 0; i < rows; ++i) {
      this.visited.push(Array(cols).fill(0));
    }

    this.done = false;
    this.loops = false;
  }

  /**
   * @param {string} input
   * @returns {Board}
   */
  static parse(input) {
    const rows = input.trim().split("\n");
    const game = new Game2(rows.length, rows[0].length);
    for (let i = 0; i < rows.length; ++i) {
      for (let j = 0; j < rows[0].length; ++j) {
        if (rows[i][j] === "#") {
          game.board[i][j] = 1;
          continue;
        }

        if (rows[i][j] === "^") {
          game.positionX = j;
          game.positionY = i;
          game.visited[i][j] |= DIR_UP;
        }
      }
    }
    return game;
  }

  next() {
    switch (this.direction) {
      case DIR_UP:
        if (this.board[this.positionY - 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY - 1][this.positionX] === 1) {
          this.direction = DIR_RIGHT;
          return;
        }

        if (this.visited[this.positionY - 1][this.positionX] & this.direction) {
          this.done = true;
          this.loops = true;
          return;
        }

        this.positionY -= 1;
        this.visited[this.positionY][this.positionX] |= this.direction;

        break;
      case DIR_RIGHT:
        if (this.board[this.positionY][this.positionX + 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY][this.positionX + 1] === 1) {
          this.direction = DIR_DOWN;
          return;
        }

        if (this.visited[this.positionY][this.positionX + 1] & this.direction) {
          this.done = true;
          this.loops = true;
          return;
        }

        this.positionX += 1;
        this.visited[this.positionY][this.positionX] |= this.direction;

        break;
      case DIR_DOWN:
        if (this.board[this.positionY + 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY + 1][this.positionX] === 1) {
          this.direction = DIR_LEFT;
          return;
        }

        if (this.visited[this.positionY + 1][this.positionX] & this.direction) {
          this.done = true;
          this.loops = true;
          return;
        }

        this.positionY += 1;
        this.visited[this.positionY][this.positionX] |= this.direction;

        break;
      case DIR_LEFT:
        if (this.board[this.positionY][this.positionX - 1] === undefined) {
          this.done = true;
          return;
        }

        if (this.board[this.positionY][this.positionX - 1] === 1) {
          this.direction = DIR_UP;
          return;
        }

        if (this.visited[this.positionY][this.positionX - 1] & this.direction) {
          this.done = true;
          this.loops = true;
          return;
        }

        this.positionX -= 1;
        this.visited[this.positionY][this.positionX] |= this.direction;

        break;
    }
  }
}
part2Solve.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

  let game = Game2.parse(inputElm.value);
  const rows = game.rows;
  const cols = game.cols;

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (game.board[i][j] === 1) {
        continue;
      }
      game.board[i][j] = 1;

      while (!game.done) {
        game.next();
      }

      if (game.loops) {
        ++result;
      }

      game = Game2.parse(inputElm.value);
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

const canvas = document.getElementById("map");
let game = Game.parse(inputElm.value);

let intervalId = setInterval(() => {
  if (game.done) {
    game = Game.parse(inputElm.value);
  }
  game.render(canvas);
  game.next();
});

inputSaveBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  game = Game.parse(inputElm.value);
  intervalId = setInterval(() => {
    if (game.done) {
      game = Game.parse(inputElm.value);
    }
    game.render(canvas);
    game.next();
  });
});

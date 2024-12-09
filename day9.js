import { init, inputElm, part1Solve, part2Solve } from "./common.js";

init("day9");

part1Solve.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim();
  let blocks = [];
  let emptyBlockCount = 0;
  for (let i = 0; i < input.length; ++i) {
    if (i % 2 === 0) {
      for (let j = 0; j < input[i]; ++j) {
        blocks.push(i / 2);
      }
    } else {
      for (let j = 0; j < input[i]; ++j) {
        blocks.push(null);
        ++emptyBlockCount;
      }
    }
  }

  let result = 0;
  let i = 0;
  for (; emptyBlockCount > 0; --emptyBlockCount) {
    const block = blocks.pop();
    if (block !== null) {
      for (; i < blocks.length && blocks[i] !== null; ++i) {
        result += i * blocks[i];
      }
      blocks[i] = block;
    }
  }

  for (; i < blocks.length; ++i) {
    result += i * blocks[i];
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part1-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part1-stats");
  stats?.replaceChildren(`${duration} ms`);
});

part2Solve.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

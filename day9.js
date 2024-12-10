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
  const input = inputElm.value.trim();

  let result = 0;

  const blocks = [];
  for (let i = 0; i < input.length; ++i) {
    if (i % 2 === 0) {
      for (let j = 0; j < input[i]; ++j) {
        blocks.push(i / 2);
      }
    } else {
      for (let j = 0; j < input[i]; ++j) {
        blocks.push(null);
      }
    }
  }

  const files = [];
  for (let i = 0; i < blocks.length; ) {
    if (blocks[i] === null) {
      for (; i < blocks.length && blocks[i] === null; ++i) {}
    }
    const id = blocks[i];
    const addr = i;
    for (; i < blocks.length && blocks[i] === id; ++i) {}
    const size = i - addr;
    files.push({ addr, size });
  }

  for (let i = files.length - 1; i >= 0; --i) {
    const file = files[i];
    for (let j = 0; j < file.addr; ++j) {
      const next = blocks.slice(j, j + file.size);
      if (next.length === file.size && next.every((block) => block === null)) {
        for (let k = 0; k < file.size; ++k) {
          blocks[j + k] = i;
          blocks[file.addr + k] = null;
        }
        break;
      }
    }
  }

  for (let i = 0; i < blocks.length; ++i) {
    if (blocks[i] !== null) {
      result += i * blocks[i];
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

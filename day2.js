const inputElm = document.getElementById("input");

const storedInput = localStorage.getItem("day2-input");
if (storedInput !== null) {
  inputElm.value = storedInput;
}

const inputSaveBtn = document.getElementById("input-save");
inputSaveBtn?.addEventListener("click", () => {
  localStorage.setItem("day2-input", inputElm.value);
});

const part1Solve = document.getElementById("part1-solve");
const part2Solve = document.getElementById("part2-solve");

part1Solve?.addEventListener("click", () => {
  const start = performance.now();

  const input = inputElm.value.trim().split("\n");

  let count = 0;
  for (const line of input) {
    if (safe(line)) {
      ++count;
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part1-answer");
  answer.value = `${count}`;

  const stats = document.getElementById("part1-stats");
  stats?.replaceChildren(`${duration} ms`);
});

let safe2Count = 0;
part2Solve?.addEventListener("click", () => {
  const start = performance.now();

  const input = inputElm.value.trim().split("\n");

  let count = 0;
  for (const line of input) {
    const numbers = line
      .trim()
      .split(/\s+/)
      .map((c) => parseInt(c));
    if (safe2(numbers)) {
      ++count;
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${count}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
  console.log(`lists checked: ${safe2Count}`);
});

/**
 * @param {string} line
 */
function safe(line) {
  let i = 0;
  for (; line[i] !== " "; ++i) {}
  let current = parseInt(line.substring(0, i));
  ++i;
  let s = i;
  for (; line[i] !== " "; ++i) {}
  let next = parseInt(line.substring(s, i));
  ++i;
  let diff = next - current;
  if (diff === 0) return false;
  if (Math.abs(diff) > 3) return false;
  const sign = Math.sign(diff);
  current = next;
  for (; i < line.length; ++i) {
    s = i;
    for (; i < line.length && line[i] !== " "; ++i) {}
    next = parseInt(line.substring(s, i));
    let diff = next - current;
    if (diff === 0) {
      return false;
    }
    if (Math.abs(diff) > 3) {
      return false;
    }
    if (Math.sign(diff) !== sign) {
      return false;
    }
    current = next;
  }
  return true;
}

/**
 * @param {number[]} numbers
 * @param {boolean} numberRemoved = false
 * @returns {boolean}
 */
function safe2(numbers, numberRemoved = false) {
  ++safe2Count;
  let diff = numbers[1] - numbers[0];

  if (diff === 0 || Math.abs(diff) > 3) {
    if (numberRemoved) {
      return false;
    }

    // try removing current and next - removing anything beyond shouldn't be able to turn an unsafe list into a safe one.
    return (
      safe2(
        numbers.filter((_, index) => index !== 0),
        true,
      ) ||
      safe2(
        numbers.filter((_, index) => index !== 1),
        true,
      )
    );
  }

  const sign = Math.sign(diff);

  diff = numbers[2] - numbers[1];
  let nextSign = Math.sign(diff);

  if (diff === 0 || Math.abs(diff) > 3 || nextSign !== sign) {
    if (numberRemoved) {
      return false;
    }

    return (
      safe2(
        numbers.filter((_, index) => index !== 0),
        true,
      ) ||
      safe2(
        numbers.filter((_, index) => index !== 1),
        true,
      ) ||
      safe2(
        numbers.filter((_, index) => index !== 2),
        true,
      )
    );
  }

  for (let i = 3; i < numbers.length; ++i) {
    let diff = numbers[i] - numbers[i - 1];
    nextSign = Math.sign(diff);

    if (diff === 0 || Math.abs(diff) > 3 || nextSign !== sign) {
      if (numberRemoved) {
        return false;
      }

      // if it's the last number (and we didn't already remove anything) we can just remove it to make the list safe
      if (i === numbers.length - 1) {
        return true;
      }

      return (
        safe2(
          numbers.filter((_, index) => index !== i - 1 && index > i - 3),
          true,
        ) ||
        safe2(
          numbers.filter((_, index) => index !== i && index > i - 3),
          true,
        )
      );
    }
  }

  return true;
}

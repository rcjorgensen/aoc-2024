const inputElm = document.getElementById("input");

const storedInput = localStorage.getItem("day5-input");
if (storedInput !== null) {
  inputElm.value = storedInput;
}

const storedScroll = localStorage.getItem("day5-input-scroll");
if (storedScroll !== null) {
  inputElm.scrollTop = parseInt(storedScroll);
}

window.onbeforeunload = () => {
  localStorage.setItem("day5-input-scroll", inputElm.scrollTop);
};

const inputSaveBtn = document.getElementById("input-save");
inputSaveBtn?.addEventListener("click", () => {
  localStorage.setItem("day5-input", inputElm.value);
});

const part1Solve = document.getElementById("part1-solve");
const part2Solve = document.getElementById("part2-solve");

part1Solve?.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

  let i = 0;
  for (; i < input.length && input[i] !== ""; ++i) {}
  const rules = new Set(input.slice(0, i));

  ++i;

  function compare(a, b) {
    return rules.has(`${a}|${b}`) ? -1 : 1;
  }

  for (; i < input.length; ++i) {
    const numbers = input[i].trim().split(",");
    const sorted = numbers.toSorted(compare);
    if (sorted.every((value, index) => value === numbers[index])) {
      result += parseInt(numbers[(numbers.length - 1) / 2]);
    }
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

  let i = 0;
  for (; i < input.length && input[i] !== ""; ++i) {}
  const rules = new Set(input.slice(0, i));

  ++i;

  function compare(a, b) {
    return rules.has(`${a}|${b}`) ? -1 : 1;
  }

  for (; i < input.length; ++i) {
    const numbers = input[i].trim().split(",");
    const sorted = numbers.toSorted(compare);
    if (sorted.some((value, index) => value !== numbers[index])) {
      result += parseInt(sorted[(sorted.length - 1) / 2]);
    }
  }
  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

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

/**
 * @overload
 * @param {string[]} rules
 * @param {string[]} numbers
 *
 * @returns {boolean} true if the numbers breaks a rule
 */

/**
 * @overload
 * @param {string[]} rules
 * @param {string} m
 * @param {string} n
 *
 * @returns {boolean} true if the numbers breaks a rule
 */

/**
 * @param {string[]} rules
 * @param {string | string[]} m
 * @param {string} [n]
 */
function breaksRule(rules, m, n) {
  if (n === undefined) {
    const numbers = m;
    for (let j = 0; j < numbers.length - 1; ++j) {
      for (let k = j + 1; k < numbers.length; ++k) {
        if (breaksRule(rules, numbers[j], numbers[k])) {
          return true;
        }
      }
    }

    return false;
  }

  for (let rule of rules) {
    if (rule === `${n}|${m}`) {
      return true;
    }

    if (rule === `${m}|${n}`) {
      return false;
    }
  }

  return false;
}

part1Solve?.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

  let i = 0;
  for (; i < input.length && input[i] !== ""; ++i) {}
  const rules = input.slice(0, i);

  ++i;

  for (; i < input.length; ++i) {
    const numbers = input[i].trim().split(",");
    if (!breaksRule(rules, numbers)) {
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
  const input = inputElm.value.trim().split(/\s+/);
  let result = 0;

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

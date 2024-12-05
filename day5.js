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

/**
 * @param {[string, string][]} rules
 * @param {string[]} numbers
 *
 * @returns {string[]} the subset of rules that apply to `numbers`
 */
function getRules(rules, numbers) {
  return rules.filter(([l, r]) => {
    let foundL = false;
    let foundR = false;
    for (let n of numbers) {
      switch (n) {
        case l:
          foundL = true;
          break;
        case r:
          foundR = true;
          break;
      }

      if (foundL && foundR) return true;
    }

    return false;
  });
}

/**
 * @param {[string, string][]} rules
 *
 * @returns {string[]} a list of numbers ordered according to the rules, except the last number which we don't need anyway.
 */
function getNumbers(rules) {
  const counts = new Map();
  for (let [l] of rules) {
    counts.set(l, (counts.get(l) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([n]) => n);
}

part2Solve.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

  let i = 0;
  for (; i < input.length && input[i] !== ""; ++i) {}
  const rules = input.slice(0, i).map((rule) => rule.split("|"));

  ++i;

  for (; i < input.length; ++i) {
    const numbers = input[i].trim().split(",");
    const ordered = getNumbers(getRules(rules, numbers));
    // ordered is missing the last number due to how getNumbers is implemented,
    // but we actually don't need that number since the ordered list cannot differ only at the last index
    // we just need to not subtract 1 when finding the middle.
    if (ordered.some((value, index) => value !== numbers[index])) {
      result += parseInt(ordered[ordered.length / 2]);
    }
  }
  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

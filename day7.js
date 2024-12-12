import { init, inputElm, part1Solve, part2Solve } from "./common.js";

init("day7");

/**
 * @param {number} target
 * @param {string[]} operands
 * @param {number} result
 *
 * @returns {boolean} true if the result is equal to the target.
 */
function search(target, operands, result) {
  if (result > target) {
    return false;
  }

  if (operands.length === 0) {
    return result === target;
  }

  const operand = parseInt(operands[0]);
  const rest = operands.slice(1);

  return (
    search(target, rest, result + operand) ||
    search(target, rest, result * operand)
  );
}

/**
 * @param {number} target
 * @param {string[]} operands
 * @param {number} result
 *
 * @returns {boolean} true if the result is equal to the target.
 */
function search2(target, operands, result) {
  if (result > target) {
    return false;
  }

  if (operands.length === 0) {
    return result === target;
  }

  const operand = parseInt(operands[0]);
  const rest = operands.slice(1);

  return (
    search2(target, rest, result + operand) ||
    search2(target, rest, result * operand) ||
    search2(target, rest, parseInt(`${result}${operand}`))
  );
}

part1Solve.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

  for (const line of input) {
    const [lhs, rhs] = line.trim().split(":");
    const operands = rhs.trim().split(" ");
    const target = parseInt(lhs);
    if (search(target, operands.slice(1), parseInt(operands[0]))) {
      result += target;
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

  for (const line of input) {
    const [lhs, rhs] = line.trim().split(":");
    const operands = rhs.trim().split(" ");
    const target = parseInt(lhs);
    if (search2(target, operands.slice(1), parseInt(operands[0]))) {
      result += target;
    }
  }

  const duration = performance.now() - start;

  const answer = document.getElementById("part2-answer");
  answer.value = `${result}`;

  const stats = document.getElementById("part2-stats");
  stats?.replaceChildren(`${duration} ms`);
});

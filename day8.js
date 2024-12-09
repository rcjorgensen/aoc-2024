const inputElm = document.getElementById("input");

const storedInput = localStorage.getItem("day8-input");
if (storedInput !== null) {
  inputElm.value = storedInput;
}

const storedScroll = localStorage.getItem("day8-input-scroll");
if (storedScroll !== null) {
  inputElm.scrollTop = parseInt(storedScroll);
}

const storedSize = localStorage.getItem("day8-input-size");
if (storedSize !== null) {
  const { width, height } = JSON.parse(storedSize);
  inputElm.style.width = `${width}px`;
  inputElm.style.height = `${height}px`;
}

window.onbeforeunload = () => {
  localStorage.setItem("day8-input-scroll", inputElm.scrollTop);
  localStorage.setItem(
    "day8-input-size",
    JSON.stringify({
      width: inputElm.offsetWidth,
      height: inputElm.offsetHeight,
    }),
  );
};

const inputSaveBtn = document.getElementById("input-save");
inputSaveBtn.addEventListener("click", () => {
  localStorage.setItem("day8-input", inputElm.value);
});

const part1Solve = document.getElementById("part1-solve");
const part2Solve = document.getElementById("part2-solve");

part1Solve?.addEventListener("click", () => {
  const start = performance.now();
  const input = inputElm.value.trim().split("\n");

  let result = 0;

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

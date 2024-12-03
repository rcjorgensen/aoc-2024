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
    const input = inputElm.value.trim();
    let result = 0;



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



    const duration = performance.now() - start;

    const answer = document.getElementById("part2-answer");
    answer.value = `${result}`;

    const stats = document.getElementById("part2-stats");
    stats?.replaceChildren(`${duration} ms`);
});

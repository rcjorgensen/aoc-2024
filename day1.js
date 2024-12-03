const day1InputElm = document.getElementById("day1-input");
const day1StoredInput = localStorage.getItem("day1-input");
if (day1StoredInput !== null) {
    day1InputElm.value = day1StoredInput;
}
const day1InputSaveBtn = document.getElementById("day1-input-save");
day1InputSaveBtn?.addEventListener("click", () => {
    localStorage.setItem("day1-input", day1InputElm.value);
});
const day1Part1Solve = document.getElementById("day1-part1-solve");
day1Part1Solve?.addEventListener("click", () => {
    const start = performance.now();
    const input = day1InputElm.value.trim().split(/\s+/);
    const left = [];
    const right = [];
    for (let i = 0; i < input.length; ++i) {
        const n = parseInt(input[i]);
        if (i % 2 === 0) {
            left.push(n);
        }
        else {
            right.push(n);
        }
    }
    left.sort();
    right.sort();
    let sum = 0;
    for (let i = 0; i < left.length; ++i) {
        sum += Math.abs(left[i] - right[i]);
    }
    const duration = performance.now() - start;
    const answer = document.getElementById("day1-part1-answer");
    answer.value = `${sum}`;
    const stats = document.getElementById("day1-part1-stats");
    stats?.replaceChildren(`${duration} ms`);
});
const day1Part2Solve = document.getElementById("day1-part2-solve");
day1Part2Solve?.addEventListener("click", () => {
    const start = performance.now();
    const input = day1InputElm.value.trim().split(/\s+/);
    const left = [];
    const right = [];
    for (let i = 0; i < input.length; ++i) {
        const n = parseInt(input[i]);
        if (i % 2 === 0) {
            left.push(n);
        }
        else {
            right.push(n);
        }
    }
    left.sort();
    right.sort();
    let sum = 0;
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        // Move through right until we find a number bigger than or equal.
        for (; j < right.length && right[j] < left[i]; ++j) { }
        // Add the left number to the sum as many times as it matches in the right list.
        for (; j < right.length && left[i] === right[j]; ++j) {
            sum += left[i];
        }
        // All left numbers smaller than the current right number
        // wont have any matches, so we can move through the left list
        // until the left number is bigger than or equal to the right.
        for (; i < left.length && left[i] < right[j]; ++i) { }
    }
    const answer = document.getElementById("day1-part2-answer");
    answer.value = `${sum}`;
    const duration = performance.now() - start;
    const stats = document.getElementById("day1-part2-stats");
    stats?.replaceChildren(`${duration} ms`);
});

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
const day2InputElm = document.getElementById("day2-input");
const day2StoredInput = localStorage.getItem("day2-input");
if (day2StoredInput !== null) {
    day2InputElm.value = day2StoredInput;
}
const day2InputSaveBtn = document.getElementById("day2-input-save");
day2InputSaveBtn?.addEventListener("click", () => {
    localStorage.setItem("day2-input", day2InputElm.value);
});
const day2Part1Solve = document.getElementById("day2-part1-solve");
day2Part1Solve?.addEventListener("click", () => {
    const start = performance.now();
    const input = day2InputElm.value.trim().split("\n");
    let count = 0;
    for (const line of input) {
        if (safe(line)) {
            ++count;
        }
    }
    const duration = performance.now() - start;
    const answer = document.getElementById("day2-part1-answer");
    answer.value = `${count}`;
    const stats = document.getElementById("day2-part1-stats");
    stats?.replaceChildren(`${duration} ms`);
});
function safe(line) {
    let i = 0;
    for (; line[i] !== " "; ++i) { }
    let current = parseInt(line.substring(0, i));
    ++i;
    let s = i;
    for (; line[i] !== " "; ++i) { }
    let next = parseInt(line.substring(s, i));
    ++i;
    let diff = next - current;
    if (diff === 0)
        return false;
    if (Math.abs(diff) > 3)
        return false;
    const sign = Math.sign(diff);
    current = next;
    for (; i < line.length; ++i) {
        s = i;
        for (; i < line.length && line[i] !== " "; ++i) { }
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
const day2Part2Solve = document.getElementById("day2-part2-solve");
day2Part2Solve?.addEventListener("click", () => {
    const start = performance.now();
    const input = day2InputElm.value.trim().split("\n");
    let count = 0;
    for (const line of input) {
        if (safe2(line)) {
            ++count;
        }
    }
    const answer = document.getElementById("day2-part2-answer");
    //answer.value = `${sum}`;
    const duration = performance.now() - start;
    const stats = document.getElementById("day2-part2-stats");
    stats?.replaceChildren(`${duration} ms`);
});
function safe2(line) {
    let unsafe = 0;
    let i = 0;
    for (; line[i] !== " "; ++i) { }
    let current = parseInt(line.substring(0, i));
    ++i;
    let s = i;
    for (; line[i] !== " "; ++i) { }
    let next = parseInt(line.substring(s, i));
    ++i;
    let diff = next - current;
    if (diff === 0)
        return false;
    if (Math.abs(diff) > 3)
        return false;
    const sign = Math.sign(diff);
    current = next;
    for (; i < line.length; ++i) {
        s = i;
        for (; i < line.length && line[i] !== " "; ++i) { }
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
export {};

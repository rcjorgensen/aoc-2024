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

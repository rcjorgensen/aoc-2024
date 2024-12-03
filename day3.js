const inputElm = document.getElementById("input");
const storedInput = localStorage.getItem("aoc-input");
if (storedInput !== null) {
    inputElm.value = storedInput;
}
const inputSaveBtn = document.getElementById("input-save");
inputSaveBtn?.addEventListener("click", () => {
    localStorage.setItem("aoc-input", inputElm.value);
});

const part1Solve = document.getElementById("part1-solve");
const part2Solve = document.getElementById("part2-solve");

const digits = "1234567890";

part1Solve?.addEventListener("click", () => {
    const start = performance.now();
    const input = inputElm.value.trim();
    let result = 0;
    for (let i = 0; i < input.length; ++i) {
        if (input.slice(i).startsWith("mul(")) {
            i += "mul(".length;

            if (digits.includes(input[i])) {
                // parse digits
                let start = i;
                for (; i < input.length && digits.includes(input[i]) && start - i < 3; ++i) {
                }

                if (i < input.length && input[i] === ",") {
                    const fst = parseInt(input.slice(start, i));
                    ++i;

                    if (digits.includes(input[i])) {
                        start = i;

                        for (; i < input.length && digits.includes(input[i]) && start - i < 3; ++i) {
                        }

                        if (i < input.length && input[i] === ")") {
                            const snd = parseInt(input.slice(start, i));
                            result += fst * snd;
                        }
                    }
                }
            }
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
    const input = inputElm.value.trim();
    let result = 0;
    for (let i = 0; i < input.length; ++i) {
        while (i < input.length && input.slice(i).startsWith("don't()")) {
            for (; i < input.length && !input.slice(i).startsWith("do()"); ++i) { }
            if (i !== input.length) {
                i += "do()".length;
            }
        }

        if (input.slice(i).startsWith("mul(")) {
            i += "mul(".length;

            if (digits.includes(input[i])) {
                // parse digits
                let start = i;
                for (; i < input.length && digits.includes(input[i]) && start - i < 3; ++i) {
                }

                if (i < input.length && input[i] === ",") {
                    const fst = parseInt(input.slice(start, i));
                    ++i;

                    if (digits.includes(input[i])) {
                        start = i;

                        for (; i < input.length && digits.includes(input[i]) && start - i < 3; ++i) {
                        }

                        if (i < input.length && input[i] === ")") {
                            const snd = parseInt(input.slice(start, i));
                            result += fst * snd;
                        }
                    }
                }
            }
        }
    }

    const duration = performance.now() - start;
    const answer = document.getElementById("part2-answer");
    answer.value = `${result}`;
    const stats = document.getElementById("part2-stats");
    stats?.replaceChildren(`${duration} ms`);
});

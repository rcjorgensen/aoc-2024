export const inputElm = document.getElementById("input");

export const part1Solve = document.getElementById("part1-solve");
export const part2Solve = document.getElementById("part2-solve");

/**
 * @param {string} day
 */
export function init(day) {
  const storedInput = localStorage.getItem(`${day}-input`);
  if (storedInput !== null) {
    inputElm.value = storedInput;
  }

  const storedScroll = localStorage.getItem(`${day}-input-scroll`);
  if (storedScroll !== null) {
    inputElm.scrollTop = parseInt(storedScroll);
  }

  const storedSize = localStorage.getItem(`${day}-input-size`);
  if (storedSize !== null) {
    const { width, height } = JSON.parse(storedSize);
    inputElm.style.width = `${width}px`;
    inputElm.style.height = `${height}px`;
  }

  window.onbeforeunload = () => {
    localStorage.setItem(`${day}-input-scroll`, inputElm.scrollTop);
    localStorage.setItem(
      `${day}-input-size`,
      JSON.stringify({
        width: inputElm.offsetWidth,
        height: inputElm.offsetHeight,
      }),
    );
  };

  const inputSaveBtn = document.getElementById("input-save");
  inputSaveBtn.addEventListener("click", () => {
    localStorage.setItem(`${day}-input`, inputElm.value);
  });
}

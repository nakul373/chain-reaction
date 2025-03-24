const gridContainer = document.querySelector(".grid-container");
const createDivs = function (divsNo) {
  for (let i = 0; i < divsNo; i++) {
    const grid = document.createElement("div");
    grid.className = "grid";
    // grid.textContent = i;
    // grid.style.backgroundColor = "white";
    grid.id = `${i}`;
    gridContainer.appendChild(grid);
  }
};

const createGrid = function (rows, colems) {
  createDivs(rows * colems);

  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = `repeat(${colems}, 54px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 54px)`;
};
const rows = 3;
const colems = 5;
createGrid(rows, colems);

let currPlayer = "green";
let backgroundColor = "#0BDA51";

const clicksArr = Array(rows * colems).fill(0);
const cornerIndexes = [
  0,
  colems - 1,
  colems * rows - 1,
  colems * rows - colems,
];
console.log(cornerIndexes);

const edgeIndexes = [];
let edgeL = 0;
let edgeR = cornerIndexes[1];
let edgeT = 0;
let edgeB = cornerIndexes[3];

for (let i = 0; i < rows - 2; i++) {
  edgeL += colems;
  edgeR += colems;
  edgeIndexes.push(edgeL, edgeR);
}
for (let i = 0; i < colems - 2; i++) {
  edgeT += 1;
  edgeB += 1;

  edgeIndexes.push(edgeT, edgeB);
}
console.log(edgeIndexes);

const playerMap = new Map();
const getEl = (el) => document.getElementById(el);

const defaultDiv = function (el) {
  clicksArr[el.id] = 0;

  el.style.backgroundColor = "black";
  el.textContent = "";
};

const click = function (el) {
  clicksArr[el.id]++;
  playerMap.set(el.id, currPlayer);

  el.style.backgroundColor = backgroundColor;
  el.textContent = clicksArr[el.id];
};

const spread = function (el) {
  let noClicks;
  defaultDiv(el);
  const id = Number(el.id);
  const spreadEls = [];
  const aboveEl = getEl(id - colems);
  const belowEl = getEl(id + colems);
  const leftEl = getEl(id - 1);
  const rightEl = getEl(id + 1);

  if (cornerIndexes.includes(el.id)) {
    spreadEls.pop();
  }
  spreadEls.push(aboveEl, belowEl, leftEl, rightEl);

  spreadEls.forEach((el) => {
    if (clicksArr[el.id] === noClicks) {
      spread(el);
    } else click(el);
  });
};

gridContainer.addEventListener("click", function (el) {
  const box = el.target;
  const boxId = box.id;
  const clicks = clicksArr[boxId];

  if (clicksArr[boxId] === 0 || playerMap.get(boxId) === currPlayer) {
    if (clicks === 3) {
      spread(box);
    } else if (clicks < 3) {
      click(box);
    }
    const grid = document.querySelectorAll(".grid");

    currPlayer = currPlayer === "green" ? "red" : "green";
    backgroundColor = currPlayer === "green" ? "#0BDA51" : "red";
    grid.forEach((el) => (el.style.border = `2px solid ${backgroundColor}`));
  }
});

console.log("Etch-a-Sketch Loaded");
const container = document.querySelector('.container');
const sizeInput = document.getElementById('size');
const resizeButton = document.getElementById('resize');
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    createGrid(parseInt(sizeInput.value) || 16);
    resetColor();
});
let currentMode;
let currentColor;
function resetColor(){
currentMode = "black";
currentColor = "#000000";
}

const colorPicker = document.querySelector("#colorPicker");
const blackButton = document.querySelector("#black");
const randomButton = document.querySelector("#random");

blackButton.addEventListener("click", () => {
    currentMode = "black";
});

randomButton.addEventListener("click", () => {
    currentMode = "random";
});

colorPicker.addEventListener("input", (e) => {
    currentMode = "custom";
    currentColor = e.target.value;
});

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i=0; i<size*size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', () => {
            if(currentMode=="black")
                cell.style.backgroundColor = 'black';
            else if(currentMode=="random")
                cell.style.backgroundColor = randomColor();
            else if(currentMode=="custom")
                cell.style.backgroundColor = currentColor;
        });
        container.appendChild(cell);
    }
}
createGrid(16);

resizeButton.addEventListener('click', () => {
    let newSize = parseInt(sizeInput.value);
    if(newSize >= 1 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a size between 1 and 100');
    }
});
// Initialize Variables
let gridSize; // Number of squares in each row and column of the grid.
let container; // Container element displaying grid.
let eraseButton; // Returns grid color to white.
let clearButton; // Clears entire grid from color.
let discoveredPlanets = []; // An array to track the discovered planets and the sun.
let rocketCursor; // The rocket ship cursor image element.
let isRocketCursorActive; // A flag to indicate if the rocket ship cursor is active.

// Function to generate the grid
function generateGrid(gridSize) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear the container

  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  const squareSize = container.offsetWidth / gridSize;

  for (let row = 0; row < gridSize; row++) {
    for (let column = 0; column < gridSize; column++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      square.addEventListener('mouseenter', handleDrawing);
      container.appendChild(square);
    }
  }
}

// Function to handle drawing on a square when the mouse enters it
function handleDrawing(event) {
  if (isDrawing) {
    const square = event.target;
    const color = colorButton.value;
    
    square.style.backgroundColor = color;
    
    const squareId = square.getAttribute('data-square-id');
    if (discoveredPlanets.includes(squareId)) {
      square.style.backgroundImage = `url(images/${squareId}.png)`;
    }
  }
}

// Function to handle changes in the size of the grid
function handleGridSizeChange() {
  const gridSize = parseInt(document.getElementById('gridSizeInput').value);

  if (gridSize < 1) {
    document.getElementById('gridSizeInput').value = 1;
  } else if (gridSize > 100) {
    document.getElementById('gridSizeInput').value = 100;
  }

  document.getElementById('gridSizeSlider').value = document.getElementById('gridSizeInput').value;

  generateGrid(gridSize);
}


generateGrid(parseInt(document.getElementById('gridSizeInput').value));
document.getElementById('gridSizeSlider').addEventListener('input', handleGridSizeChange);
document.getElementById('gridSizeInput').addEventListener('input', handleGridSizeChange);


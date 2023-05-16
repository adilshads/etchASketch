/** Initialize Variables */

let gridSize; // Number of squares in each row and column of the grid. 
let container; // Container element displaying grid. 
let colorButton; // Drawing color.
let isDrawing; // Current Drawing color.
let eraseButton; // Returns grid color to white. 
let clearButton; // Clears entire grid from color. 
let discoveredPlanets = []; // An array to track the discovered planets and the sun. 
let rocketCursor; // The rocket ship cursor image element.
let isRocketCursorActive; // A flag to indicate if the rocket ship cursor is active.

function generateGrid(gridSize) {
    const container = document.createElement('div');
    container.style.width = '960px';
    document.body.appendChild(container);
  
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
  
  generateGrid(gridSize);
  
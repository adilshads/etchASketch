// Initialize Variables
let gridSize; // Number of squares in each row and column of the grid.
let container; // Container element displaying grid.
let eraseButton; // Returns grid color to white.
let clearButton; // Clears entire grid from color.
let discoveredPlanets = []; // An array to track the discovered planets and the sun.
let rocketCursor; // The rocket ship cursor image element.
let isRocketCursorActive; // A flag to indicate if the rocket ship cursor is active.

const planetImages = [
  'images/easSun.jpg',
  'images/easMercury.jpg',
  'images/easVenus.jpg',
  'images/easEarth.jpg',
  'images/easMars.jpg',
  'images/easJupiter.jpg',
  'images/easSaturn.jpg',
  'images/easUranus.jpg',
  'images/easNeptune.jpg'
];


// Function to generate the grid
function generateGrid(gridSize) {
  const container = document.getElementById('container');
  let isDrawing = false;

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
      square.setAttribute('data-square-id', `${row}-${column}`);
      square.addEventListener('mouseenter', handleRevealPlanet);
      square.addEventListener('mouseleave', handleColorChange);

      const random = Math.random();

      if (random < 0.1) {
        const randomPlanetIndex = Math.floor(Math.random() * planetImages.length);
        const planetImage = planetImages[randomPlanetIndex];
        square.style.backgroundImage = `url(${planetImage})`;
        square.style.backgroundSize = 'cover';
        square.style.backgroundPosition = 'center';
        square.style.opacity = '0'; // Hide the image initially
      }

      container.appendChild(square);
    }
  }
}

// Function to revealing the planets or sun. 
function handleRevealPlanet(event) {
  const square = event.target;
  const squareId = square.getAttribute('data-square-id');

  square.style.opacity = '1'; // Reveal the image
  discoveredPlanets.push(squareId);
}

// Function to handle changing the colors.
function handleColorChange(event) {
  const colorButton = document.querySelector('#colorPicker');
  isDrawing = true;

 if (isDrawing) {
    console.log("Drawing is enabled");
    
    const square = event.target;
    const color = colorButton.value;
    
    console.log("Color:", color);
    
    square.style.backgroundColor = color;
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
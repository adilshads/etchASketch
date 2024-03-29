// Initialize Variables
let gridSize; // Number of squares in each row and column of the grid.
let container; // Container element displaying grid.
let eraseButton; // Returns grid color to white.
let clearButton; // Clears entire grid from color.
let discoveredPlanets = []; // An array to track the discovered planets and the sun.
let rocketCursor; // The rocket ship cursor image element.
let isRocketCursorActive = true; // Rocket Cursor variable.

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
      square.addEventListener('mouseenter', handleColorChange);

      square.style.backgroundColor = 'transparent';

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

// Handle Color Change
function handleColorChange(event) {
  const colorButton = document.querySelector('#colorPicker');
  const opacitySlider = document.querySelector('#opacitySlider');
  const opacityInput = document.querySelector('#opacityInput');

  isDrawing = true;

  if (isDrawing) {
    const square = event.target;
    const color = colorButton.value;
    const opacity = parseFloat(opacityInput.value);


    square.style.backgroundColor = `${color}${convertOpacityToHex(opacity)}`;
  }
}
// The following functions handle opacity 

function convertOpacityToHex(opacity) {
  const decimal = Math.round(opacity * 255);
  const hex = decimal.toString(16).padStart(2, '0');
  return hex;
}


// Function to handle changes in the size of the grid by manual input. 
function handleGridSizeChange() {
  const gridSizeInput = document.getElementById('gridSizeInput');
  const gridSizeSlider = document.getElementById('gridSizeSlider');

  let gridSize = parseInt(gridSizeInput.value);

  if (gridSize < 1) {
    gridSize = 1;
  } else if (gridSize > 100) {
    gridSize = 100;
  }

  gridSizeInput.value = gridSize;
  gridSizeSlider.value = gridSize;

  generateGrid(gridSize);
}

// Function to handle changes in the slider value to change size of the grid. 
function handleSliderChange() {
  const gridSizeInput = document.getElementById('gridSizeInput');
  const gridSizeSlider = document.getElementById('gridSizeSlider');

  let gridSize = parseInt(gridSizeSlider.value);

  gridSizeInput.value = gridSize;

  generateGrid(gridSize);
}

// Update the event listeners for gridSizeInput and gridSizeSlider

generateGrid(parseInt(document.getElementById('gridSizeInput').value));
document.getElementById('gridSizeInput').addEventListener('input', handleGridSizeChange);
document.getElementById('gridSizeSlider').addEventListener('input', handleSliderChange);


// Function to handle changes in the slider value to change opacity.  

function handleOpacitySliderChange() {
  const opacityInput = document.getElementById('opacityInput');
  const opacitySlider = document.getElementById('opacitySlider');

  const opacity = parseFloat(opacitySlider.value);
  opacityInput.value = opacity;

  opacityInput.value = opacity;
  opacitySlider.value = opacity;

}

// Update the event listeners for opacityInput and opacitySlider
document.getElementById('opacityInput').addEventListener('input', handleOpacitySliderChange);
document.getElementById('opacitySlider').addEventListener('input', handleOpacitySliderChange);


/**  Erase Button */
eraseButton = document.getElementById('eraseButton');

// Add an event listener to the erase button
eraseButton.addEventListener('click', function() {
  const squares = document.getElementsByClassName('square');

  // Add event listeners to each square
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('mouseenter', resetSquare);
  }
});

// Function to reset the square
function resetSquare(event) {
  const square = event.target;
  square.style.backgroundColor = 'white';
  square.style.opacity = '0';
}

// Draw Button
drawButton = document.getElementById('drawButton');

drawButton.addEventListener('click', function() {
  const squares = document.getElementsByClassName('square');

  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];

    if (square.style.opacity === '0') {
      square.removeEventListener('mouseenter', resetSquare); // Remove the erase functionality
      square.addEventListener('mouseenter', handleRevealPlanet); // Add the reveal functionality
    } else {
      square.removeEventListener('mouseenter', handleRevealPlanet); // Remove the reveal functionality
      square.addEventListener('mouseenter', handleColorChange); // Add the color functionality
    }
  }
});


/** Clear Button */
clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
  generateGrid(gridSize);
});

generateGrid(10);


// Add event listener to track mouse movement
document.addEventListener('mousemove', function (event) {
  // Get the cursor trail element
  const cursorTrail = document.getElementById('cursor-trail');

  // Update the position of the cursor trail
  cursorTrail.style.left = event.clientX + 'px';
  cursorTrail.style.top = event.clientY + 'px';
});

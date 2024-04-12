/**
 * 1. Take three points in a plane to form a triangle.
 * 2. Randomly select any point inside the triangle and consider that your current position.
 * 3. Randomly select any one of the three vertex points.
 * 4. Move half the distance from your current position to the selected vertex.
 * 5. Plot the current position.
 * 6. Repeat from step 3.
 */

const canvas = document.getElementById('fractal');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const maxIterations = 100_000;

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {number} x 
 * @param {number} y 
 */
const drawPoint = (context, {x, y}) => {
  context.beginPath();
  context.ellipse(x, y, 1, 1, 0, 0, 2 * Math.PI);
  context.stroke();
};

const drawTriangle = (context, width, height) => {
  const mid = width / 2;
  const padding = 2;
  const triangle = [
    { x: mid - padding / 2, y: padding },
    { x: padding, y: height - padding },
    { x: width - padding, y: height - padding }
  ];
  return triangle;
};

const randomPointInTriangle = (p1, p2, p3) => {
  const weight1 = Math.random();
  const weight2 = Math.random();
  const weight3 = 1 - weight1 - weight2;

  const x = weight1 * p1.x + weight2 * p2.x + weight3 * p3.x;
  const y = weight1 * p1.y + weight2 * p2.y + weight3 * p3.y;

  return { x, y };
}

const findMiddlePoint = (a, b) => {
  const x = (a.x + b.x) / 2;
  const y = (a.y + b.y) / 2;
  return { x, y };
};

function *getSierpinskiTriangle(context, width, height, maxIterations) {
  const triangle = drawTriangle(context, width, height);

  for (const point of triangle) {
    yield point;
  }

  let currentPosition = randomPointInTriangle(triangle[0], triangle[1], triangle[2]);
  while (maxIterations) {
    const currentVertex = triangle[Math.floor(Math.random() * 3)];
    currentPosition = findMiddlePoint(currentVertex, currentPosition);
    yield currentPosition;
    maxIterations--;
  }
};

async function render(context, sierpinskiGenerator) {
  for (const point of sierpinskiGenerator) {
    drawPoint(context, point);
  }
}

const sierpinskiGenerator = getSierpinskiTriangle(context, width, height, maxIterations);
render(context, sierpinskiGenerator);

function createWalls() {
  const count = parseInt(document.getElementById("wallCount").value);
  const heightsInput = document.getElementById("wallHeights").value.trim();
  const wallContainer = document.getElementById("wallContainer");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");



  wallContainer.innerHTML = "";
  resultDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  //validation 
  if (isNaN(count) || count <= 0) {
    errorDiv.innerHTML = "⚠ Please enter a valid positive number of walls.";
    return;
  }

  
  const heights = heightsInput.split("#").map(Number);
  if (heights.length !== count || heights.some(isNaN)) {
    errorDiv.innerHTML = "⚠ Heights must match number of walls and be valid numbers.";
    return;
  }

  //maxheight is calculated
  const maxHeight = Math.max(...heights);


  heights.forEach((h, index) => {
    
    const wallWrapper = document.createElement("div");
    wallWrapper.className = "wall-wrapper";
    wallWrapper.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 2px;
    `;

    //creation of wall 
    const wall = document.createElement("div");
    wall.className = "wall";
    wall.style.height = `${(h / maxHeight) * 200}px`;
    

    //height label of each wall
    const heightLabel = document.createElement("div");
    heightLabel.className = "wall-label";
    heightLabel.textContent = h;
    heightLabel.style.cssText = `
      margin-top: 5px;
      font-size: 12px;
      font-weight: bold;
      color: #fbf6f6ff;
      text-align: center;
    `;

    
    wallWrapper.appendChild(wall);
    
    wallWrapper.appendChild(heightLabel);
    
    wallContainer.appendChild(wallWrapper);
  });

  

  let visibleLeft = 0;
  let tallestLeft = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > tallestLeft) {
      visibleLeft++;
      tallestLeft = heights[i];
    }
  }

  
  
  let visibleRight = 0; 
  let tallestRight = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    if (heights[i] > tallestRight) {
      visibleRight++;
      tallestRight = heights[i];
    }
  }

  

  resultDiv.innerHTML = `
    ✅ Visible from Left: ${visibleLeft}
    ✅ Visible from Right: ${visibleRight}
  `;
}
const assert = require('assert');

// Simulate the math
const rectHeight = 64;
const rectTop = 100;

function handlePointer(clientY) {
  const y = clientY - rectTop;
  let percent = 100 - (y / rectHeight) * 100;
  return Math.max(0, Math.min(100, percent));
}

// Top of track (clientY = 100) -> should be 100%
console.log("Top:", handlePointer(100)); 
// Bottom of track (clientY = 164) -> should be 0%
console.log("Bottom:", handlePointer(164));
// Middle of track (clientY = 132) -> should be 50%
console.log("Middle:", handlePointer(132));
// Below track (clientY = 180) -> should be 0%
console.log("Below:", handlePointer(180));
// Above track (clientY = 80) -> should be 100%
console.log("Above:", handlePointer(80));


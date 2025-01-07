export const bubbleSort = (arr, length) => {
  const animations = [];
  const array = [...arr];
  const sorted = new Set();
  
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      // Add comparison state
      animations.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from(sorted)
      });
      
      if (array[j].value > array[j + 1].value) {
        // Add swapping state
        animations.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: Array.from(sorted)
        });
        
        // Swap elements
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    // Add element to sorted
    sorted.add(length - 1 - i);
    
    // Show the current state
    animations.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: Array.from(sorted)
    });
  }
  
  // Add first element to sorted
  sorted.add(0);
  animations.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from(sorted)
  });
  
  return animations;
}; 
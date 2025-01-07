export const selectionSort = (arr, length) => {
  const animations = [];
  const array = [...arr];
  const sorted = new Set();
  
  for (let i = 0; i < length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < length; j++) {
      // Add comparison state
      animations.push({
        array: [...array],
        comparing: [minIdx, j],
        swapping: [],
        sorted: Array.from(sorted)
      });
      
      if (array[j].value < array[minIdx].value) {
        minIdx = j;
      }
    }
    
    // Add swapping state
    animations.push({
      array: [...array],
      comparing: [],
      swapping: [i, minIdx],
      sorted: Array.from(sorted)
    });
    
    // Swap elements
    let temp = array[minIdx];
    array[minIdx] = array[i];
    array[i] = temp;
    
    // Add to sorted
    sorted.add(i);
    
    // Show the swap completed
    animations.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: Array.from(sorted)
    });
  }
  
  // Add final element to sorted
  sorted.add(length - 1);
  animations.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from(sorted)
  });
  
  return animations;
};
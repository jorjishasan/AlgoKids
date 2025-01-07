export const quickSort = (arr, length) => {
  const animations = [];
  const array = [...arr];
  const sorted = new Set();
  
  const partition = (low, high) => {
    const pivot = array[high].value;
    let i = low - 1;
    
    // Add pivot selection state
    animations.push({
      array: [...array],
      comparing: [high],
      swapping: [],
      sorted: Array.from(sorted)
    });
    
    for (let j = low; j < high; j++) {
      // Add comparison state
      animations.push({
        array: [...array],
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sorted)
      });
      
      if (array[j].value < pivot) {
        i++;
        // Add swapping state
        animations.push({
          array: [...array],
          comparing: [],
          swapping: [i, j],
          sorted: Array.from(sorted)
        });
        
        // Swap elements
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
    
    // Add swapping state for pivot
    animations.push({
      array: [...array],
      comparing: [],
      swapping: [i + 1, high],
      sorted: Array.from(sorted)
    });
    
    // Swap pivot
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    
    // Mark pivot position as sorted
    sorted.add(i + 1);
    
    // Show current state
    animations.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: Array.from(sorted)
    });
    
    return i + 1;
  };
  
  const quickSortHelper = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      // Single element is sorted
      sorted.add(low);
      animations.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from(sorted)
      });
    }
  };
  
  quickSortHelper(0, length - 1);
  return animations;
};
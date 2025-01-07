export const mergeSort = (arr, length) => {
  const animations = [];
  const array = [...arr];
  const sorted = new Set();
  
  const merge = (l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    
    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
      L[i] = array[l + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = array[m + 1 + j];
    }
    
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
      // Add comparison state
      animations.push({
        array: [...array],
        comparing: [l + i, m + 1 + j],
        swapping: [],
        sorted: Array.from(sorted)
      });
      
      if (L[i].value <= R[j].value) {
        // Add swapping state
        animations.push({
          array: [...array],
          comparing: [],
          swapping: [k],
          sorted: Array.from(sorted)
        });
        
        array[k] = L[i];
        i++;
      } else {
        // Add swapping state
        animations.push({
          array: [...array],
          comparing: [],
          swapping: [k],
          sorted: Array.from(sorted)
        });
        
        array[k] = R[j];
        j++;
      }
      k++;
    }
    
    while (i < n1) {
      // Add swapping state
      animations.push({
        array: [...array],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sorted)
      });
      
      array[k] = L[i];
      i++;
      k++;
    }
    
    while (j < n2) {
      // Add swapping state
      animations.push({
        array: [...array],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sorted)
      });
      
      array[k] = R[j];
      j++;
      k++;
    }
    
    // Mark merged section as sorted
    for (let i = l; i <= r; i++) {
      sorted.add(i);
    }
    
    // Show current state
    animations.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: Array.from(sorted)
    });
  };
  
  const mergeSortHelper = (l, r) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      mergeSortHelper(l, m);
      mergeSortHelper(m + 1, r);
      merge(l, m, r);
    }
  };
  
  mergeSortHelper(0, length - 1);
  return animations;
};
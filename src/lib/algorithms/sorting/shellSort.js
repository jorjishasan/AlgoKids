"use client"

const shellSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  // Calculate initial gap
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j = i;

      while (j >= gap) {
        setComparing([j - gap, j]);
        await new Promise(resolve => setTimeout(resolve, speed));
        moves++;

        if (newArray[j - gap].value > newArray[j].value) {
          // Swap elements in place
          [newArray[j - gap], newArray[j]] = [newArray[j], newArray[j - gap]];
          setArray([...newArray]);
          setSwapping([j - gap, j]);
          await new Promise(resolve => setTimeout(resolve, speed));
          swaps++;
          j -= gap;
        } else {
          break;
        }
      }

      setSwapping([]);
      setComparing([]);
    }

    // Mark elements that are in their final position for this gap
    for (let i = 0; i < n; i += gap) {
      setSorted(prev => [...prev, i]);
    }

    gap = Math.floor(gap / 2);
  }

  // Mark all remaining elements as sorted
  for (let i = 0; i < n; i++) {
    if (!array[i].sorted) {
      setSorted(prev => [...prev, i]);
    }
  }

  return { moves, swaps };
};

export default shellSort; 
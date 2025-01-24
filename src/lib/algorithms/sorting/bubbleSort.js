"use client"

const bubbleSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      setComparing([j, j + 1]);
      await new Promise(resolve => setTimeout(resolve, speed));
      moves++;

      if (newArray[j].value > newArray[j + 1].value) {
        setSwapping([j, j + 1]);
        [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
        setArray([...newArray]);
        await new Promise(resolve => setTimeout(resolve, speed));
        swapped = true;
        swaps++;
      }
    }

    if (!swapped) {
      // If no swapping occurred, all elements from current position are sorted
      for (let k = 0; k < n - i; k++) {
        if (!newArray[k].sorted) {
          setSorted(prev => [...prev, k]);
        }
      }
      break;
    }

    // Mark the last element in this pass as sorted
    setSorted(prev => [...prev, n - i - 1]);
  }

  // Mark any remaining unsorted elements as sorted
  for (let i = 0; i < n; i++) {
    setSorted(prev => prev.includes(i) ? prev : [...prev, i]);
  }

  return { moves, swaps };
};

export default bubbleSort;
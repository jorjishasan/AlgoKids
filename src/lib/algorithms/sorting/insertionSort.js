"use client"

const insertionSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0) {
      setComparing([j - 1, j]);
      await new Promise(resolve => setTimeout(resolve, speed));
      moves++;

      if (newArray[j - 1].value > newArray[j].value) {
        // Swap elements in place
        [newArray[j - 1], newArray[j]] = [newArray[j], newArray[j - 1]];
        setArray([...newArray]);
        setSwapping([j - 1, j]);
        await new Promise(resolve => setTimeout(resolve, speed));
        swaps++;
        j--;
      } else {
        break;
      }
    }

    setSwapping([]);
    setComparing([]);

    // Mark elements that are in their final position
    setSorted(prev => [...prev, i - 1]);
  }

  // Mark the last element as sorted
  setSorted(prev => [...prev, n - 1]);

  return { moves, swaps };
};

export default insertionSort; 
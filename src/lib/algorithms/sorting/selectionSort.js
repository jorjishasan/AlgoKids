"use client";

const selectionSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      setComparing([minIdx, j]);
      await new Promise(resolve => setTimeout(resolve, speed));
      moves++;

      if (newArray[j].value < newArray[minIdx].value) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      setSwapping([i, minIdx]);
      [newArray[i], newArray[minIdx]] = [newArray[minIdx], newArray[i]];
      setArray([...newArray]);
      await new Promise(resolve => setTimeout(resolve, speed));
      swaps++;
    }

    setSorted(prev => [...prev, i]);
  }

  setSorted(prev => [...prev, n - 1]);
  return { moves, swaps };
};

export default selectionSort;
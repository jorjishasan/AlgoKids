"use client"

const cocktailSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;
  let swapped = true;
  let start = 0;
  let end = n - 1;

  while (swapped) {
    swapped = false;

    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      setComparing([i, i + 1]);
      await new Promise(resolve => setTimeout(resolve, speed));

      if (newArray[i].value > newArray[i + 1].value) {
        [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
        setArray([...newArray]);
        setSwapping([i, i + 1]);
        await new Promise(resolve => setTimeout(resolve, speed));
        swapped = true;
        moves++;
        swaps++;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    setSorted(prev => [...prev, end]);

    // Backward pass (right to left)
    for (let i = end - 1; i >= start; i--) {
      setComparing([i, i + 1]);
      await new Promise(resolve => setTimeout(resolve, speed));

      if (newArray[i].value > newArray[i + 1].value) {
        [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
        setArray([...newArray]);
        setSwapping([i, i + 1]);
        await new Promise(resolve => setTimeout(resolve, speed));
        swapped = true;
        moves++;
        swaps++;
      }
    }

    start++;
    setSorted(prev => [...prev, start - 1]);
  }

  // Mark remaining elements as sorted
  for (let i = start; i <= end; i++) {
    setSorted(prev => [...prev, i]);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  return { moves, swaps };
};

export default cocktailSort; 
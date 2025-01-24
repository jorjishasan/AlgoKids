"use client";

const quickSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  async function partition(low, high) {
    const pivot = newArray[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      await new Promise(resolve => setTimeout(resolve, speed));
      moves++;

      if (newArray[j].value < pivot.value) {
        i++;
        setSwapping([i, j]);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        setArray([...newArray]);
        await new Promise(resolve => setTimeout(resolve, speed));
        swaps++;
      }
    }

    setSwapping([i + 1, high]);
    [newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]];
    setArray([...newArray]);
    await new Promise(resolve => setTimeout(resolve, speed));
    swaps++;

    return i + 1;
  }

  async function quickSortHelper(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      setSorted(prev => [...prev, pi]);
      
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    } else if (low === high) {
      setSorted(prev => [...prev, low]);
    }
  }

  await quickSortHelper(0, n - 1);
  return { moves, swaps };
};

export default quickSort;
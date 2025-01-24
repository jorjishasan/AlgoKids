"use client"

const heapSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(newArray, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    setComparing([0, i]);
    await new Promise(resolve => setTimeout(resolve, speed));

    // Move current root to end
    [newArray[0], newArray[i]] = [newArray[i], newArray[0]];
    setArray([...newArray]);
    setSwapping([0, i]);
    await new Promise(resolve => setTimeout(resolve, speed));
    moves++;
    swaps++;

    setSorted(prev => [...prev, i]);
    
    // Call max heapify on the reduced heap
    await heapify(newArray, i, 0);
  }

  setSorted(prev => [...prev, 0]);

  async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setComparing([largest, left]);
    await new Promise(resolve => setTimeout(resolve, speed));

    if (left < n && arr[left].value > arr[largest].value) {
      largest = left;
    }

    setComparing([largest, right]);
    await new Promise(resolve => setTimeout(resolve, speed));

    if (right < n && arr[right].value > arr[largest].value) {
      largest = right;
    }

    if (largest !== i) {
      setSwapping([i, largest]);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, speed));
      moves++;
      swaps++;

      await heapify(arr, n, largest);
    }
  }

  return { moves, swaps };
};

export default heapSort; 
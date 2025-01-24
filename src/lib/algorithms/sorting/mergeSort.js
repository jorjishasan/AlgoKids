"use client"

const mergeSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  const n = array.length;
  const newArray = [...array];
  let moves = 0;
  let swaps = 0;

  async function merge(left, mid, right) {
    const leftArray = newArray.slice(left, mid + 1);
    const rightArray = newArray.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArray.length && j < rightArray.length) {
      setComparing([left + i, mid + 1 + j]);
      await new Promise(resolve => setTimeout(resolve, speed));
      moves++;

      if (leftArray[i].value <= rightArray[j].value) {
        newArray[k] = leftArray[i];
        setArray([...newArray]);
        setSwapping([k]);
        await new Promise(resolve => setTimeout(resolve, speed));
        i++;
        swaps++;
      } else {
        newArray[k] = rightArray[j];
        setArray([...newArray]);
        setSwapping([k]);
        await new Promise(resolve => setTimeout(resolve, speed));
        j++;
        swaps++;
      }
      k++;
    }

    while (i < leftArray.length) {
      newArray[k] = leftArray[i];
      setArray([...newArray]);
      setSwapping([k]);
      await new Promise(resolve => setTimeout(resolve, speed));
      i++;
      k++;
      swaps++;
    }

    while (j < rightArray.length) {
      newArray[k] = rightArray[j];
      setArray([...newArray]);
      setSwapping([k]);
      await new Promise(resolve => setTimeout(resolve, speed));
      j++;
      k++;
      swaps++;
    }

    // Mark the merged section as sorted
    for (let idx = left; idx <= right; idx++) {
      setSorted(prev => [...prev, idx]);
    }
  }

  async function mergeSortHelper(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  }

  await mergeSortHelper(0, n - 1);
  return { moves, swaps };
};

export default mergeSort;
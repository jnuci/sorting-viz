export function mergeSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1,  auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function bubbleSort(array) {
    const animations = [];
    bubbleHelper(array, animations);
    return animations;
}

function bubbleHelper(array, animations) {
  let i = 0;
  let j = 1;
  let stopIdx = array.length;
  for (let k = 0; k < array.length; k++){
    while (j < stopIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (array[i] > array[j]) {
        animations.push([i, j])
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      } else {
          animations.push([j, j])
      }
      i++;
      j++;
    }
    stopIdx--;
    i = 0;
    j = 1;
  }
}

export function quickSort(array) {
  /*
      this quicksort does NOT recursively call on seperate partitions
      instead, it acts on partitions that are still intact with the orignal array
  */

  // animations array to store swaps
  const animations = [];

  // call helper function
  quickHelper(array, 0, array.length - 1, animations);

  return animations;
}

function quickHelper(array, start, end, animations) {
  // base case for switched array
  if (start >= end) {
    return;
  }

  // base case for array of size 2
  if (end - start === 1) {
    if (array[end] < array[start]) {
      animations.push([start, end])
      animations.push([start, end])
      animations.push([start, end])
      let temp = array[end];
      array[end] = array[start];
      array[start] = temp;
    }
    return;
  }

  // save oldStart and oldEnd
  // used to make next function calls

  let oldStart = start;
  let oldEnd = end;

  // define pivot in center of array
  let pivot = Math.floor((start + end)/2);

  // first swap: pivot and right pointer (end)
  animations.push([pivot, end])
  animations.push([pivot, end])
  animations.push([pivot, end])
  let temp = array[pivot]
  array[pivot] = array[end];
  array[end] = temp;

  // change pivot index to rightmost value
  // decrement end so array is like this
  // {start} ........ {end}{pivot}
  pivot = end;
  end--;

  // run swaps until start and end meet or pass each other
  while (start <= end) {

    // first element from left pointer (start) greater than pivot value
    while (array[start] < array[pivot]) {
      start++;
    }
    // first element from right pointer (end) less than pivot value
    while (array[end] > array[pivot]) {
      end--;
    }
    // if left pointer meets right pointer, break loop
    if (start >= end) {
      break;
    }
    // make swap of left and right pointers
    animations.push([start, end])
    animations.push([start, end])
    animations.push([start, end])
    temp = array[start]
    array[start] = array[end];
    array[end] = temp;
    
    // move left pointer up and right pointer down
    start++;
    end--;
  }
  // swap pivot with left pointer (thought left pointer is on the right now)
  animations.push([start, pivot])
  animations.push([start, pivot])
  animations.push([start, pivot])
  temp = array[start]
  array[start] = array[pivot];
  array[pivot] = temp;

  // call function with new start index values
  quickHelper(array, oldStart, start - 1, animations);
  quickHelper(array, start + 1, oldEnd, animations);
}

export function heapSort(array) {
  const animations = []
  let ref = array.slice()
  ref.sort((a,b) => a - b);
  heapHelper(array, animations);
  let end = array.length - 1;
  while (end > 0) {
    animations.push([0, end])
    animations.push([0, end])
    animations.push([0, end])
    let temp = array[0];
    array[0] = array[end];
    array[end] = temp;
    end--;
    heapify(array, 0, end, animations);
  }
  return animations;
}

function heapHelper(array, animations) {
  let len = array.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(array, i, len - 1, animations);
  }
}

function heapify(array, i, heapSize, animations) {
  let left = 2*i + 1;
  let right = 2*i + 2;
  let largest = i;

  if (left <= heapSize && array[left] > array[largest]) {
    largest = left;
  }

  if (right <= heapSize && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([largest, i])
    animations.push([largest, i])
    animations.push([largest, i])
    let temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    heapify(array, largest, heapSize, animations);
  }
}
function mergeSort(arr){
    if(arr.length <= 1){
      return arr;
    }else{
      let mid = Math.floor(arr.length / 2);
      let left = mergeSort(arr.slice(0, mid)),
          right= mergeSort(arr.slice(mid));
      return mergeTwoSortedArrays(left, right);
    }
}
  
function bubbleSort(arr) {
  arr = arr.slice();
  let sorted = false, round = 0, steps = [];
  while(!sorted) {
    sorted = true;
    for(let j = 0; j < arr.length - 1 - round; j++) {
      steps.push({ type: 'comparison', element: [j, j+1] });
      if(arr[j] > arr[j+1]) {
        steps.push({ type: 'swap', element: [j, j+1] });
        swap(arr, j, j+1);
        sorted = false;
      }
    }
    steps.push({ type: 'sorted', element: arr.length - 1 - round });
    round++;
  }
  return steps;
}

function selectionSort(arr) {
  arr = arr.slice();
  let steps = [];
  for(let i = 0; i < arr.length - 1; i++) {
    let pos = i;
    steps.push({ type: 'set_minimum', element: [i] });
    for(let j = i + 1; j < arr.length; j++) {
      steps.push({ type: 'comparison', element: [j] });
      if(arr[j] < arr[pos]) {
        steps.push({ type: 'set_minimum', element: [j] });
        pos = j;
      }
    }
    if(i !== pos) {
      steps.push({ type: 'set_minimum', element: [i, pos] });
      steps.push({ type: 'swap', element: [i, pos] });
      swap(arr, i, pos);
    }
    steps.push({ type: 'sorted', element: i });
  }
  return steps;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function mergeTwoSortedArrays(arr1, arr2){
  let i = 0; let j = 0;
  let mergedArray = [];
  
  while(i < arr1.length && j < arr2.length){
    if(arr1[i] < arr2[j]){
      mergedArray.push(arr1[i++]);
    }else{
      mergedArray.push(arr2[j++]);
    }
  }
  while(i < arr1.length){
    mergedArray.push(arr1[i++]);
  }
  while(j < arr2.length){
    mergedArray.push(arr2[j++]);
  }
  
  return mergedArray;
}

export { mergeSort, bubbleSort, selectionSort };
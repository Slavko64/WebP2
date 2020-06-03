function merge(left, right) {
  let arr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return arr.concat(left.slice().concat(right.slice()));
}

function MergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(MergeSort(left), MergeSort(right));
}
let arr = MergeSort([3,102,4,8,10,7,105,4,55]);
console.log(arr);
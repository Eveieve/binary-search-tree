function Node(data = null, left = null, right = null) {
  return { data, left, right };
}

const node = Node();
console.log(node);

const root = null;

// a tree returns the root
function Tree() {
  return {
    root,
  };
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

array.sort((a, b) => a - b);

const sortedArray = [...new Set(array)];
console.log(sortedArray);
// end = end index of array
const tree = Tree();

function buildTree(array) {
  let start = 0;
  let end = array.length - 1; // end index

  if (start > end) return null; // base case

  let mid = Math.ceil((start + end) / 2); // rounds up
  const node = Node(array[mid]); // set the middle element as root node of left subarray
  // data is set to the index's element

  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  console.log(mid);

  return node;
}

console.log(buildTree(sortedArray));

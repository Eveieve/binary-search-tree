function Node(data = null, left = null, right = null) {
  return { data, left, right };
}

const root = Node();
console.log(root);

// const root = null;

// a tree returns the root
function Tree(root = null) {
  return {
    root,
  };
}

let array = [1, 2, 3, 4, 5, 6, 7, 8];

array.sort((a, b) => a - b);

const sortedArray = [...new Set(array)];
console.log(sortedArray);

// end = end index of array
// if not specified when called..
function buildBST(arr, start = 0, end = arr.length - 1) {
  /* Base Case */

  if (start > end) {
    return null;
  }
  /* Get the middle element and make it root */
  let mid = Math.floor((start + end) / 2);
  let node = Node(arr[mid]);
  console.log("node", node);
  node.left = buildBST(arr, start, mid - 1);
  console.log("node.left", node.left);
  node.right = buildBST(arr, mid + 1, end);
  console.log("node.right", node.right);
  return node;
}

console.log(buildBST(sortedArray));
// const tree = Tree();

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log(prettyPrint(buildBST(sortedArray)));

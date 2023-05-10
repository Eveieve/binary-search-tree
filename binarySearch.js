function Node(data = null, left = null, right = null) {
  return { data, left, right };
}

let array = [1, 2, 3, 4, 5, 6];
array.sort((a, b) => a - b);
const sortedArray = [...new Set(array)];

function buildBST(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }

  let mid = Math.floor((start + end) / 2);
  let node = Node(arr[mid]);
  console.log("node", node);
  node.left = buildBST(arr, start, mid - 1);
  console.log("node.left", node.left);
  node.right = buildBST(arr, mid + 1, end);
  console.log("node.right", node.right);
  return node;
}
class Tree {
  constructor(root) {
    this.root = root;
  }
}

let BST = buildBST(sortedArray);

// take in the tree/root
function insert(root, data) {
  if (root == null) {
    root = Node(data);
    console.log(root);
  }
  if (data < root.data) root.left = insert(root.left, data);
  else if (data > root.data) root.right = insert(root.right, data);
  return root;
}

// console.log(insert(BST, 10));
// console.log(insert(BST, 9));

console.log(BST);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  // console.log(node);
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log(prettyPrint(BST));

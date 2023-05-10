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

function remove(root, data) {
  // if what it meets is a null node just return its value, null
  // a root refers to each node it visits
  if (root == null) return root;

  // recur down the tree if the data is smaller!
  if (data < root.data) root.left = remove(root.left, data);
  else if (data > root.data) root.right = remove(root.right, data);
  // else, data is same as root's data, found the node to remove!
  else {
    if (root.left == null && root.right == null) return null;
    // the parent's pointer is pointing to its right
    else if (root.left == null) return root.right;
    else if (root.right == null) return root.left;
  }
  return root;
}

console.log(remove(BST, 1));
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

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
  // if meet a null node, simply return null
  // a root refers to each node it visits
  if (root == null) return null;

  // recur down the tree if the data is smaller!
  // set the pointer (root.left) to result of remove() recursive call
  if (data < root.data) root.left = remove(root.left, data);
  else if (data > root.data) root.right = remove(root.right, data);
  // else, data is same as root's data, found the node to remove!
  else {
    // 1. current pointer(root) has no children - remove it!
    if (root.left == null && root.right == null) return null;
    // 2. if it has no left children - point to its right instead
    else if (root.left == null) return root.right;
    else if (root.right == null) return root.left;

    // 3. when all above don't fit the case...(with two children)
    // find the smallest node in the right subtree
    root.data = findTheSmallest(root.right);
    // remove that node with that data, go to node's right, remove it.
    root.right = remove(root.right, root.data);
  }

  // find the next smallest node in the tree
  function findTheSmallest(root) {
    let smallest = root.data; // smallest is the pointer node
    while (root.left !== null) {
      // while pointer isn't null
      smallest = root.left.data; // pointer at the left node's data
      root = root.left; // set the current pointer to that node
    }
    return smallest; // return node with next smallest value
  }

  return root; // return the tree
}

// console.log(remove(BST, 1));
// console.log(insert(BST, 9));

function find(root, data) {
  // let's find some node
  if (root == null) return null;
  else if (data < root.data) return find(root.left, data);
  else if (data > root.data) return find(root.right, data);
  // else, data is same as root's data, found the node to remove!
  else {
    return { root, data }; // returning recursive call's result from above
  }
}
console.log(find(BST, 5));

function getHeight(root) {
  if (root == null) return 0;
  else {
    let leftH = getHeight(root.left);
    let rightH = getHeight(root.right);

    if (leftH > rightH) return leftH + 1;
    else return rightH + 1;
  }
}

console.log(getHeight(BST));

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

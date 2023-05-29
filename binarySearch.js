let array = [1, 2, 3, 4, 5, 6];
array.sort((a, b) => a - b);
const sortedArray = [...new Set(array)];

function Node(data = null, left = null, right = null) {
  return { data, left, right };
}
class Tree {
  constructor() {
    this.root = this.buildBST(sortedArray);
  }
  buildBST(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let node = Node(arr[mid]);
    node.left = this.buildBST(arr, start, mid - 1);
    node.right = this.buildBST(arr, mid + 1, end);
    return node;
  }
  insert(data, root = this.root) {
    if (root == null) {
      root = Node(data);
    }
    if (data < root.data) root.left = this.insert(data, root.left);
    else if (data > root.data) root.right = this.insert(data, root.right);
    return root;
  }
}
const tree = new Tree();
console.log(tree);
tree.insert(8);
console.log(tree);
debugger;
// take in the tree/root

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
    // get the height of left subtree
    let leftH = getHeight(root.left);
    console.log(leftH, root.left);
    let rightH = getHeight(root.right);
    console.log(rightH, root.right);
    // return either's height + 1
    if (leftH > rightH) return leftH + 1;
    else return rightH + 1;
  }
}

console.log(getHeight(BST));

// pass BST as root
function printNode(root, level) {
  // root here is the current node we're at
  if (root === null) return;

  // if rootnode is at level 0, (headroot of the tree/subtree)
  // just print the data of it.
  if (level === 0) console.log(root.data);
  // for each rootnode, print the whole left & right subtree
  else if (level >= 1) {
    // go to left, now the rootnode's level is -1 from before. (tree's head)
    printNode(root.left, level - 1);
    printNode(root.right, level - 1);
  }
}

function levelOrder(root) {
  const height = getHeight(root);
  // repeat printing process, from level 0 to height
  // note that it's i<height, not i<=height
  for (let i = 0; i < height; i++) {
    printNode(root, i);
  }
}

console.log(levelOrder(BST));
const newArray = [];

function inOrder(root) {
  if (root == null) return; // end call
  // go to left child first
  else {
    inOrder(root.left);
    // if above recur call has been returned bc root ==null...
    console.log(root.data); // print its value
    newArray.push(root.data);
    // then recur to the right
    inOrder(root.right);
    return newArray;
  } // move to the right child! (now the root is this right child)
}

function preOrder(root) {
  if (root === null) return;
  console.log(root.data);
  preOrder(root.left);
  preOrder(root.right);
}

console.log(preOrder(BST));

function postOrder(root) {
  if (root === null) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.data);
}

console.log(postOrder(BST));

function isBalanced(BST) {
  // if height of the left subtree & right is not more than 1
  // return true
  // else return false

  let heightLeft = getHeight(BST.left);
  let heightRight = getHeight(BST.right);
  console.log(heightLeft);
  console.log(heightRight);
  if (Math.abs(heightLeft - heightRight) <= 1) return true;
  else return false;
}

console.log(isBalanced(BST));

function reBalance(BST) {
  // traverse a tree to have a new array for BST
  const newArray = inOrder(BST);
  console.log(newArray);
  const balancedBST = buildBST(newArray);

  return balancedBST;
}

BST = reBalance(BST);
// rebalanced!

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

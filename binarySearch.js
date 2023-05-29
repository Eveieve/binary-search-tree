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

  remove(data, current = this.root) {
    if (current === null) return current;

    if (current.data === data) {
      // replace currentNode with its successor
      current = this.#removeHelper(current);
    } else if (current.data > data) {
      current.left = this.remove(data, current.left);
    } else {
      current.right = this.remove(data, current.right);
    }
    return current;
  }

  #smallestNodeOf(tree) {
    let current = tree;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  #removeHelper(node) {
    // if node has two children
    if (node.left && node.right) {
      const successorNode = this.#smallestNodeOf(node.right);
      node.data = successorNode.data;
      node.right = this.remove(successorNode.data, node.right);
      return node; // return the tree
      // if node has only one child
    } else {
      // if node.right exists and node.left doesn't,
      // replacementNode is node.right
      const replacementNode = node.right || node.left;
      node = null;
      return replacementNode; // get replacementNode
    }
  }

  find(data, current = this.root) {
    if (current === null) return current;
    else if (data < current.data) return this.find(data, current.left);
    else if (data > current.data) return this.find(data, current.right);
    // else, data is same as root's data, found the node
    else {
      return current; // returning recursive call's result from above
    }
  }

  getHeight(root = this.root) {
    if (root == null) return 0;
    else {
      // get the height of left subtree
      let leftH = this.getHeight(root.left);
      let rightH = this.getHeight(root.right);
      // return either's height + 1
      if (leftH > rightH) return leftH + 1;
      else return rightH + 1;
    }
  }

  levelOrder(root = this.root) {
    const height = this.getHeight(root);
    // repeat printing process, from level 0 to height
    // note that it's i<height, not i<=height
    for (let i = 0; i < height; i++) {
      printNode(root, i);
    }
  }
}
const tree = new Tree();
tree.insert(8);
tree.remove(5);
console.log(tree);
console.log(tree.find(8));
console.log(tree.getHeight());
console.log(tree.levelOrder());
debugger;

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

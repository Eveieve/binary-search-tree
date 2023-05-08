function Node(data = null, left = null, right = null) {
  return { data, left, right };
}

const node = Node();
console.log(node);

const root = null;

function Tree() {
  return {
    root,
  };
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function buildTree(array) {
  const tree = Tree();

  return { tree }; // same as returning level 0 root
}

console.log(buildTree(array));

function Node(data = null, leftChild = null, rightChild = null) {
  return { data, leftChild, rightChild };
}

const node = Node();
console.log(node);

const {
  NotImplementedError
} = require('../extensions/index.js');

const {
  Node
} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {

  constructor() {
    this.tree = null;
  };
  
  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addWithin(this.tree, data)

    function addWithin(node, value) {
      if (!node) {
        return new Node(value)
      }

      if (node.data === value) {
        return node;
      }

      if (value < node.data) {
        node.left = addWithin(node.left, value)
      } else {
        node.right = addWithin(node.right, value)
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.tree, data);

    function searchWithin(node, value) {
      if (!node) {
        return false
      }

      if (node.data === value) {
        return true
      }

      return data < node.data ?
        searchWithin(node.left, value) :
        searchWithin(node.right, value)
    }
  }

  find(data) {
    return findNode(this.tree, data);

    function findNode(node, value) {
      if (!node) {
        return null
      };
      if (node.data === value) {
        return node
      };
      if (value < node.data) {
        return findNode(node.left, value)
      } else {
        return findNode(node.right, value)
      };
    }
  }

  remove(data) {
    this.tree = removeNode(this.tree, data);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value)
        return node
      } else if (node.data < value) {
        node.right = removeNode(node.right, value)
        return node;
      } else {
        if (!node.left && !node.right) {
          return null
        }
      }

      if (!node.left) {
        node = node.right;
        return node;
      }

      if (!node.right) {
        node = node.left;
        return node;
      }

      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }

      node.data = minFromRight.data;

      node.right = removeNode(node.right, minFromRight.data);

      return node;
    }
  }

  min() {
    return findMin(this.tree);

    function findMin(node) {
      if (!node) {
        return null
      };
      if (!node.left) {
        return node.data
      };

      return findMin(node.left);
    }
  }

  max() {
    return findMax(this.tree);

    function findMax(node) {
      if (!node) {
        return null
      };
      if (!node.right) {
        return node.data
      };

      return findMax(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};
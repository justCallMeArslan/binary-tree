
function Node(data) {

    return { // initial node state
        data,
        left: null,
        right: null
    }

}

export function Tree(array) {
    const sortedArr = [...new Set(array)].sort((a, b) => a - b); // sort with Set and 
    // remove duplicates from array

    function buildTree(array) {

        function build(start, end) { // helper function to build root and subtrees
            if (start > end) { //end of recursion
                return null;
            }

            const mid = Math.floor((start + end) / 2);
            const rootNode = Node(sortedArr[mid]); //  root of current subtree

            rootNode.left = build(start, mid - 1); // left subtree
            rootNode.right = build(mid + 1, end); // right subtree

            return rootNode;
        }
        return build(0, sortedArr.length - 1); // building full balanced binary tree 
        // for entire array
    }

    let root = buildTree(array); // stored to pass as closure


    // function includes(value) { // array version to commare to BST, time 
    // complexity is higher so its better to use binary tree search for BST

    //     for (let i = 0; i < sortedArr.length; i++) {
    //         if (sortedArr[i] === value) {
    //             return true
    //         }
    //     }
    //     return false;
    // }

    function includes(value) {
        return search(root, value)
    }

    function search(node, value) {
        if (!node) {
            return false;
        }

        if (value === node.data) { // if value found 
            return true
        }

        return value < node.data // recursion on binary tree depending of value
            ? search(node.left, value)
            : search(node.right, value);
    }

    function insert(value) {
        root = ins(root, value);
    }

    function ins(node, value) { // helper function to sustisfy assignment
        if (node === null) { // stop of recursion, insert Node as per value
            return Node(value);
        }

        if (value === node.data) {  //array was sorted, so we assume that require 
            // to keep binary tree deduplicated
            return node;
        }

        if (value < node.data) { // if value less then node value - traverse left
            node.left = ins(node.left, value)
        } else {
            node.right = ins(node.right, value) // if value more - traverse right
        }

        return node;
    }

    function deleteItem(value) {
        return deleteNode(root, value);
    }

    function deleteNode(root, value) {
        if (root === null) {
            return root
        }

        if (root.data > value) {
            root.left = deleteNode(root.left, value);
        } else if (root.data < value) {
            root.right = deleteNode(root.right, value)
        } else {
            if (root.left === null) {
                return root.right
            }
            if (root.right === null) {
                return root.left;
            }

            const successor = getSuccessor(root);
            root.data = successor.data;
            root.right = deleteNode(root.right, successor.data);
        }

        return root;
    }

    function levelOrderForEach(callback) {
        return levelOrder(root, callback)
    }

    function levelOrder(root, callback) {
        if (root === null) {
            return;
        }

        if (!callback) {
            throw new Error("No callback received")
        }

        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();

            callback(node);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    function inOrderForEach(callback) {
        return inOrderFE(root, callback)
    }

    function preOrderForEach(callback) {
        return preOrderFE(root, callback)
    }

    function postOrderForEach(callback) {
        return postOrderFE(root, callback)
    }

    function inOrderFE(root, callback) {
        if (root === null) {
            return;
        }

        if (!callback) {
            throw new Error("No callback received")
        }

        inOrderFE(root.left, callback);
        callback(root);
        inOrderFE(root.right, callback);
    }

    function preOrderFE(root, callback) {
        if (root === null) {
            return;
        }

        if (!callback) {
            throw new Error("No callback received")
        }

        callback(root);
        preOrderFE(root.left, callback);
        preOrderFE(root.right, callback);
    }

    function postOrderFE(root, callback) {
        if (root === null) {
            return;
        }

        if (!callback) {
            throw new Error("No callback received");
        }

        postOrderFE(root.left, callback);
        postOrderFE(root.right, callback);
        callback(root);
    }

    function find(node, value) {
        if (node === null) {
            return null
        }

        if (node.data === value) {
            return node;
        }

        return value < node.data
            ? find(node.left, value)
            : find(node.right, value);
    }

    function height(value) {
        const nodeFound = find(getRoot(), value);
        if (nodeFound === null) {
            return null;
        }

        return calcHeight(nodeFound);
    }

    function calcHeight(node) {
        if (node === null) {
            return -1;
        }

        let leftHeight = calcHeight(node.left);
        let rightHeight = calcHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    function depth(value) {
        return calcDepth(getRoot(), value, 0);
    }

    function calcDepth(node, value, currentDepth) {
        if (node === null) {
            return -1;
        }

        if (node.data === value) {
            return currentDepth;
        }

        return value < node.data
            ? calcDepth(node.left, value, currentDepth + 1)
            : calcDepth(node.right, value, currentDepth + 1)
    }

    function isBalanced() { // balanced means that for every node in the tree, 
        // the height difference between left and the right subtrees no more than 1
        return checkBalanced(getRoot()) !== -1; // true/false expected as result
        //  because of !== 
    }

    function checkBalanced(node) {
        if (node === null) {
            return 0;
        }

        const leftHeight = checkBalanced(node.left);
        if (leftHeight === -1) {
            return -1;
        }

        const rightHeight = checkBalanced(node.right);
        if (rightHeight === -1) {
            return -1;
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + Math.max(leftHeight, rightHeight);
    }

    function rebalance() {

        const extractedNodes = [];

        function extractNodesInOrder(node) {
            if (node === null) {
                return;
            }

            extractNodesInOrder(node.left);
            extractedNodes.push(node.data); // takes only node.data, left: and right: 
            // are not getting sorted
            extractNodesInOrder(node.right);
        }

        extractNodesInOrder(getRoot()); // calling function with current root to 
        // get extracted list

        console.log(extractedNodes);

        function buildRebalanced(start, end) {
            if (start > end) {
                return null;
            }

            const mid = Math.floor((start + end) / 2);
            const value = extractedNodes[mid];
            const node = Node(value); // recreating new Node (new left and right)

            node.left = buildRebalanced(start, mid - 1);
            node.right = buildRebalanced(mid + 1, end);

            return node;
        }

        root = buildRebalanced(0, extractedNodes.length - 1);

        return root; // returning rebalanced root.
    }

    // getter functions

    function getSuccessor(curr) { // get in - order successor
        curr = curr.right; // take right subtree as curr succeessor (successor should be bigger)
        while (curr !== null && curr.left !== null) {
            curr = curr.left; // if left isnt null, go down the left "wing"
        }
        return curr; // return curr (right once, then all the way down node)
    }

    function getRoot() {
        return root;
    }

    return {
        getRoot,
        includes,
        insert,
        deleteItem,
        levelOrderForEach,
        inOrderForEach,
        preOrderForEach,
        postOrderForEach,
        height,
        depth,
        isBalanced,
        rebalance
    }
}


export function randomNumbersArray() {
    const randomizedArray = [];

    for (let i = 0; i < 10; i++) {
        const item = Math.floor(Math.random() * 100); // to create random number every
        /// loop iteration
        randomizedArray.push(item)
    }

    return randomizedArray;
}

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

    const root = buildTree(array); // stored to pass as closure


    // function includes(value) { // array version to commare to BST

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

    function insert() {

    }


    return {
        root,
        includes,
        insert
    }
}
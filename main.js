
function Node(data) {

    return { // initial node
        data,
        left: null,
        right: null
    }

}

export function Tree(array) {

    function buildTree(array) {
        const sortedArr = [...new Set(array)].sort((a, b) => a - b); // sort and 
        // remove duplicates from array

        function build(start, end) { // helper function to build root and subtrees
            if (start > end) { //end of recursion
                return null;
            }

            let mid = Math.floor((start + end) / 2);
            const root = Node(sortedArr[mid]); //  root of current subtree

            root.left = build(start, mid - 1); // left subtree
            root.right = build(mid + 1, end); // right subtree

            return root;
        }

        return build(0, sortedArr.length - 1); // building full balanced binary tree 
        // for entire array
    }

    return buildTree(array);

}
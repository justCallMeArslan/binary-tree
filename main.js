
function Node(data) {

    return { // initial node
        data,
        left: null,
        right: null
    }

}

function Tree(array) {

    function buildTree(array) {
        const sortedArr = [...new Set(array)].sort((a, b) => a - b);

        function build(start, end) {
            if (start > end) { //end of recursion
                return null;
            }

            let mid = Math.floor((start + end) / 2);
            const root = Node(sortedArr[mid]); // setting root of 0-level

            root.left = build(start, mid - 1); // left part
            root.right = build(mid + 1, end); // right part

            return root;
        }

        return build(0, sortedArr.length - 1); // building binary tree for entire array
    }

    return buildTree(array);


}
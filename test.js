import { Tree } from "./main.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


const test = new Tree([2, 4, 5, 7, 1, 3, 6]);

prettyPrint(test.root);


console.log(test.includes(2));  // true
console.log(test.includes(12)); // false
console.log(test.includes(5));  // true

test.insert(9);
test.insert(3);
test.insert(8);

prettyPrint(test.root);
import { Tree, randomNumbersArray } from "./main.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


// testing while building


// const test = new Tree([2, 4, 5, 7, 1, 3, 6]);

// prettyPrint(test.getRoot());


// console.log(test.includes(2));  // true
// console.log(test.includes(12)); // false
// console.log(test.includes(5));  // true

// test.insert(9);
// test.insert(3);
// test.insert(8);
// test.insert(11);
// test.insert(10);

// prettyPrint(test.getRoot());

// test.deleteItem(6);
// test.deleteItem(1);

// prettyPrint(test.getRoot());

// test.levelOrderForEach((node) => {        // completed
//     console.log(node.data);
// });

// test.preOrderForEach((node) => {            // completed
//     console.log(node.data);
// })

// test.inOrderForEach((node) => {             // completed
//     console.log(node.data);
// });

// test.postOrderForEach((node) => {           // completed
//     console.log(node.data);
// });

// console.log(test.height(7));
// console.log(test.depth(11));

// console.log(test.isBalanced());

// prettyPrint(test.rebalance())




// Tie it all together

const array = randomNumbersArray();

console.log(array);

const check = Tree(array);

prettyPrint(check.getRoot())
console.log(check.isBalanced());

console.log("level");
check.levelOrderForEach((node) => {        // completed
    console.log(node.data);
});

console.log("preOrder");
check.preOrderForEach((node) => {            // completed
    console.log(node.data);
})

console.log("inOrder");
check.inOrderForEach((node) => {             // completed
    console.log(node.data);
});

console.log("postOrder");
check.postOrderForEach((node) => {           // completed
    console.log(node.data);
});

check.insert(111);
check.insert(122);
check.insert(133);

prettyPrint(check.getRoot());

console.log(check.isBalanced());

prettyPrint(check.rebalance());

console.log(check.isBalanced());



console.log("level");
check.levelOrderForEach((node) => {        // completed
    console.log(node.data);
});

console.log("preOrder");
check.preOrderForEach((node) => {            // completed
    console.log(node.data);
})

console.log("inOrder");
check.inOrderForEach((node) => {             // completed
    console.log(node.data);
});

console.log("postOrder");
check.postOrderForEach((node) => {           // completed
    console.log(node.data);
});
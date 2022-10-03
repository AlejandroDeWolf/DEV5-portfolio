# LAB2 Solution

Inside this directory you can find the code for the bingo game.

Below you can also find a codesandbox link to the same code for a live preview and a short explanation of a recent ES6 feature.

| Codesandbox  |
| ------------- |
| [Bingo](https://9pditd.csb.app/) |


## Destructuring
Unpack values from arrays or properties from objects into a new variable.

In the example below we use the rest property (...rest).
By using this we can end the destructuring pattern and store all remaining properties inside a new array.
```
const list = [3, 4, 5, 6];

const [one, two, ...rest] = list;
console.log(one, two, rest); // 3, 4, [5, 6, 7, 8]
```

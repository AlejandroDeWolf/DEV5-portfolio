# LAB2 Solution

Inside this directory you can find the code for the bingo game.

Below you can also find a codesandbox link to the same code for a live preview and a short explanation of a recent ES6 feature.

| Codesandbox  |
| ------------- |
| [Bingo](https://9pditd.csb.app/) |


## Template Literals
Als we de output van javacript expressies willen combineren **zonder template literals**, gebruiken we meestal de + operator om deze te concateneren.
```
let firstName = 'Alejandro';
let lastName = 'De Wolf';

let fullName = firstName + ' ' + lastName;
```


We kunnen gebruik maken van template literals door backticks te gebruiken, dit zorgt voor hetzelfde resultaat met een duidelijkere syntax.
```
let firstName = 'Alejandro';
let lastName = 'De Wolf';

let fullName = `${firstName} ${lastName}`;
```

## 1. Difference between `var`, `let`, and `const`

| Keyword | Scope            | Redeclare | Reassign | Notes                                   |
|---------|------------------|-----------|----------|----------------------------------------|
| `var`   | Function scoped  | ✅ Yes    | ✅ Yes   | Hoisted, old JS way, avoid using today |
| `let`   | Block scoped     | ❌ No     | ✅ Yes   | Best for variables that may change     |
| `const` | Block scoped     | ❌ No     | ❌ No    | Best for constants, arrays & objects   |

```js
var a = 10;
var a = 20;  // ✅ Works

let b = 30;
// let b = 40; ❌ Error (cannot redeclare)
b = 40;      // ✅ Works

const c = 50;
// const c = 60; ❌ Error (cannot redeclare)
// c = 60;     ❌ Error (cannot reassign) 
```
## 2. Difference between map(), forEach(), and filter()

| Method      | Returns              | Use Case                        |
| ----------- | -------------------- | ------------------------------- |
| `forEach()` | ❌ Nothing            | Just loops through elements     |
| `map()`     | ✅ New array          | Transform each element          |
| `filter()`  | ✅ New filtered array | Get elements matching condition |


```js
const numbers = [1, 2, 3, 4, 5];

// forEach → just loops
numbers.forEach(n => console.log(n));

// map → returns new array
const squares = numbers.map(n => n * n);
console.log(squares); // [1, 4, 9, 16, 25]

// filter → returns condition-based array
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

## 3. What are Arrow Functions in ES6?

Arrow functions provide a shorter syntax for writing functions and lexically bind this.
```js
// Normal function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log(add(2, 3));      // 5
console.log(addArrow(2, 3)); // 5
```
✅ Benefits

* Shorter & cleaner syntax

* Lexical this binding (inherits from surrounding scope)

* Useful in callbacks & functional programming

## 4. Destructuring Assignment in ES6

Destructuring allows extracting values from arrays or objects into variables easily.
```js
// Array destructuring
const numbers = [10, 20, 30];
const [x, y, z] = numbers;
console.log(x, y, z); // 10 20 30

// Object destructuring
const user = { name: "Zahidul", age: 22 };
const { name, age } = user;
console.log(name, age); // Zahidul 22
```

## 5. Template Literals in ES6

Template literals are strings wrapped in backticks (`).
They allow:

* Variable interpolation (${})

* Multi-line strings without \n

* Easier readability compared to concatenation
```js
const name = "Zahidul";
const age = 22;

// Old way (concatenation)
const text1 = "My name is " + name + " and I am " + age + " years old.";

// ES6 way (template literal)
const text2 = `My name is ${name} and I am ${age} years old.`;

console.log(text1);
console.log(text2);
```

# curry

> 🍛 Simple curry functions

A simple helper to wrap a function and gradually accept (i.e. partially apply)
arguments.

This package is technically a helper partial application, but `curry` is much
easier to remember and a nicer package function name than `partiallyApply`.

## Install

Using [Yarn]:

```bash
$ yarn add @blakek/curry
```

…or using [npm]:

```bash
$ npm i --save @blakek/curry
```

## Usage

```js
import { curry, curryRight } from '@blakek/curry';

// Simple curry usage
const multiply = (a, b) => a * b;
const timesTwo = curry(multiply)(2);
timesTwo(5); //» 10

// Specify number of arguments
const sum = (...args) => args.reduce((a, b) => a + b, 0);
const topFiveTotal = curry(sum, 5);
topFiveTotal(1, 5, 6)(6)(7); //» 25

// Reverse arguments
const prop = (object, key) => object[key];
const getName = curryRight(prop)('name');
getName({ name: 'John Smith', age: 42 }); //» 'John Smith'
```

### TypeScript

The types of many functions are inferred. However, some functions, such as
variadic functions, need an explicit type:

```ts
const add = (...args: number[]) => args.reduce((a, b) => a + b, 0);

const addFourItems = curry(add, 4) as VariadicCurry<
  // argument types
  [number, number, number, number],
  // return type
  number
>;

// Includes helpers for functions accepting <=5 args
const addTwo = curry(add, 2) as Curry2<number, number, number>;
```

## API

### `curry`

```ts
curry(fn: Function, arity?: number): any;
```

Returns functions that take in the arguments of a function until all have been
provided.

### `curryRight`

```ts
curryRight(fn: Function, arity?: number): any;
```

Same as `curry`, but reverses all arguments once the limit has been provided.
Provided for the common use-case of needing to supply context-specific arguments
before providing the first arguments.

For example:

```js
import { curryRight } from '@blakek/curry';

const users = [
  { username: 'blakek' },
  { username: 'gsandf' },
  { username: 'google' }
];

const prop = (object, key) => object[key];
const getUsername = curryRight(prop)('username');
users.map(getUsername); //» [ 'blakek', 'gsandf', 'google' ]
```

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

### Useful Commands

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                  |
| `yarn format`       | Format the source following the Prettier styles |
| `yarn test`         | Run project tests                               |
| `yarn test --watch` | Run project tests, watching for file changes    |

## License

MIT

[node.js]: https://nodejs.org/
[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/en/docs/

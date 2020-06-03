import test from 'ava';
import { curry, curryRight } from './index';

test('curries simple function arguments', t => {
  const add = (a: number, b: number) => a + b;

  t.is(typeof curry(add), 'function');
  t.is(typeof curry(add)(123), 'function');
  t.is(curry(add)(9)(7), 16);
});

test('can manually set arity', t => {
  const add = (...args: number[]) => args.reduce((a, b) => a + b, 0);
  const addFourItems = curry(add, 4);

  t.is(addFourItems(1)(2)(3)(4), 10);
  t.is(addFourItems(5, 6, 7, 8), 26);
  t.is(addFourItems(2, 1)(2, 2), 7);

  t.is(typeof addFourItems(1, 2, 3), 'function');
});

test('curryRight reverses arguments', t => {
  const prop = <T, K extends keyof T>(object: T, key: K): T[K] => object[key];

  const getIsCool = curryRight(prop)('isCool');

  t.is(typeof getIsCool, 'function');
  t.is(getIsCool({ isCool: true }), true);
});

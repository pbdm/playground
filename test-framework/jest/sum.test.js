
beforeEach(() => {
  // console.log('beforeEach')
});

/*
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { one: 1 };
  data.two = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).not.toBe(0.3);    // It isn't! Because rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});

test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});


describe('test scope', () => {
  beforeEach(() => {
    // console.log('scope before each')
  });
  test('resolves to lemon', () => {
    // make sure to add a return statement
    return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
  });
});

*/

// Mock functions
function each(items, callback) {
  for (var index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
it('resolves to lemon', () => {
  const mockCallback = jest.fn();
  each([0, 1], mockCallback);
  console.log(mockCallback.mock.calls);
  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  const myMock = jest.fn();
  // const a = new myMock();
  // const b = {};
  // const bound = myMock.bind(b);
  // bound();

  console.log(myMock.mock.instances);

  myMock.mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    // .mockReturnValue(true);
  console.log(myMock(), myMock(), myMock(), myMock());
});
// const myMock = jest.fn();
// myMock('1');
// myMock('a', 'b');
// console.log(myMock.mock.calls);


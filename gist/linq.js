// WIP

Array.prototype.asQueryable = function() {
  // console.log('array')
  return new Queryable(this)
}

function* _filter(iterable, predicate) {
  // console.log('filter')
  for (let item of iterable) {
    // console.log(item + 'filter');
    let checked = predicate(item)
    if (checked) {
      yield item
    }
  }
}
function* _map(iterable, mapper) {
  // console.log('map')
  for (let item of iterable) {
    // console.log(item + 'map');
    let mapped = mapper(item)
    yield mapped
  }
}
class Queryable {
  constructor(iterable) {
    this.iterable = iterable
  }
  [Symbol.iterator]() {
    console.log('iterator')
    let iterator = this.iterable[Symbol.iterator]()
    console.log(iterator)
    return iterator
  }
  filter(predicate) {
    console.log('filter')
    let iterable = _filter(this, predicate)
    console.log('sss')
    return new Queryable(iterable)
  }
  map(mapper) {
    let iterable = _map(this, mapper)
    return new Queryable(iterable)
  }
  reduce(reducer, initial) {
    // console.log('reducer')
    let result = initial
    for (let item of this) {
      // console.log(item + 'reducer')
      result = reducer(result, item)
    }
    return result
  }
}
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
var sum = array.asQueryable()
               .filter(n => n % 2 === 0)
               .map(n => n + 3)
               .reduce((s, n) => s + n, 0)

console.log(sum);

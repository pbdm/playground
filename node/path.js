const  path = require('path');
const url = require('url');

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));          // /foo/bar/baz/asdf
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..', '..'));    // /foo/bar/baz
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux'));                // /foo/bar/baz/asdf/quux
console.log(path.join('foo', 'bar', 'baz/asdf', 'quux/'));                 // foo/bar/baz/asdf/quux/
console.log(path.join('http://foo', 'bar', 'baz/asdf', 'quux'));     // http:/foo/bar/baz/asdf/quux
console.log(path.join('http://foo///', 'bar', 'baz/asdf', 'quux'));  // http:/foo/bar/baz/asdf/quux
console.log(path.join('http://www.a.b.c', 'http://www.b.c.d', 'baz/asdf', 'quux'));  // http:/www.a.b.c/http:/www.b.c.d/baz/asdf/quux

// 如果前有带有 '/', 则会保留

console.log(path.resolve('foo/bar/ccc', '../../ddd'))                        // /Users/xxx/xxx/for/ddd
console.log(path.resolve('/foo', 'bar', 'baz/asdf', 'quux', '..'));          // /foo/bar/baz/asdf
console.log(path.resolve('/foo', 'bar', 'baz/asdf', 'quux', '..', '..'));    // /foo/bar/baz
console.log(path.resolve('/foo', 'bar', 'baz/asdf', 'quux'));                // /foo/bar/baz/asdf/quux
console.log(path.resolve('foo', 'bar', 'baz/asdf', 'quux/'));                // /Users/xxx/xxx/foo/bar/baz/asdf/quux/
console.log(path.resolve('http://foo', 'bar', 'baz/asdf', 'quux'));          // /Users/xxx/xxx/http:/foo/bar/baz/asdf/quux
console.log(path.resolve('http://foo///', 'bar', 'baz/asdf', 'quux'));       // /Users/xxx/xxx/http:/foo/bar/baz/asdf/quux

// 第一个参数加上 '/' 才不会被第二个参数盖掉(protocol + host 除外)
// 第二个参数如果以 '/' 开头则直接覆盖第一个参数(到 protocol + host 为止)
console.log(url.resolve('/one/two/three', 'four'));         // '/one/two/four'
console.log(url.resolve('one/two/three/', 'four'));         // 'one/two/three/four'
console.log(url.resolve('example.com', '/one'));    // '/one'
console.log(url.resolve('example.com/a', '/one'));    // '/one'
console.log(url.resolve('example.com/a', 'one'));    // 'example.com/one'
console.log(url.resolve('http://example.com', '/one'));    // 'http://example.com/one'
console.log(url.resolve('http://example.com/two', 'one'));    // 'http://example.com/one'
console.log(url.resolve('http://example.com/one', '/two')); // 'http://example.com/two'
console.log(url.resolve('http://example.com/one', 'two/')); // 'http://example.com/two/'
console.log(url.resolve('http://example.com/one/', 'two/')); // 'http://example.com/one/two/'
console.log(url.resolve('http://example.com/one', 'two/three/')); // 'http://example.com/two/three/'

console.log(url.resolve('http://example.com/one', 'http://a.b.c')); // 'http://a.b.c'
console.log(url.resolve('one', '//a.b.c')); // '//a.b.c'
console.log(url.resolve('/two/', 'http://a.b.c')); // 'http://a.b.c'

const myURL = new url.URL('https://example.org:81/foo/');
console.log(myURL.pathname); // /foo/
// 下面的会报错
// const myURL2 = new url.URL('/foo/');
// console.log(myURL2);


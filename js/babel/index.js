var babylon = require("babylon");
var generate = require("babel-generator")

const code = `
import a from 'ddd';
function square(n) {
  return n * n;
}`;

var ast = babylon.parse(code, {
  sourceType: 'module'
});
var a = generate.default(ast, {}, code);
console.log(a)



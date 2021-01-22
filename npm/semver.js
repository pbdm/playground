// https://semver.org/lang/zh-CN/
// https://www.npmjs.com/package/semver
const semver = require('semver')
console.log(semver.satisfies('1.2.3', '^1.2.3'))  // true
console.log(semver.satisfies('1.2.5', '^1.2.3'))  // true
console.log(semver.satisfies('1.3.5', '^1.2.3'))  // true
console.log(semver.satisfies('2.3.5', '^1.2.3'))  // false



// 先行版本号优先层级必须透过由左到右的每个被句点分隔的标识符来比较，直到找到一个差异值后决定：只有数字的标识符以数值高低比较，有字母或连接号时则逐字以 ASCII 的排序来比较。数字的标识符比非数字的标识符优先层级低。
// 若开头的标识符都相同时，栏位比较多的先行版本号优先层级比较高。范例：1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0。
console.log(semver.satisfies('1.2.3-alpha.1', '^1.2.3')) //false
console.log(semver.satisfies('1.2.3-alpha.1', '1.2.3-alpha')) // false

// 只要规则里存在先行版本号, 则接受所有主, 次, 修订版本号相同的情况下大于现有先行版本号的情况
console.log(semver.satisfies('1.2.3-alpha.1', '^1.2.3-alpha')) // true
console.log(semver.satisfies('1.2.3-alpha.1', '^1.2.3-blpha')) // true
console.log(semver.satisfies('1.2.2-alpha.1', '^1.2.3-alpha')) // false
console.log(semver.satisfies('1.2.4-alpha.1', '^1.2.3-alpha')) // false
console.log(semver.satisfies('1.2.3-alpha.2', '^1.2.3-alpha.1')) // true
console.log(semver.satisfies('1.2.3-beta.1', '^1.2.3-alpha.1')) // true
console.log(semver.satisfies('1.2.3-beta.1', '~1.2.3-alpha.1')) // true
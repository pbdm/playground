// 接口表示任意属性
interface Foo {
  [propName: string]: any;
}
interface Foo2 {
  // 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
  a: 2
  [propName: string]: string;
}

// 接口表示数组
interface NumberArray {
  [index: number]: number;
}
let arr1: NumberArray = [1,2,3]

// 使用数组泛型
let arrGeneric: Array<number> // 等同于 let arr: number[]

// 函数默认值
// TypeScript 会将添加了默认值的参数识别为可选参数
// TypeScript 会根据默认值自动推断类型
function buildName(firstName: string, lastName = 'Cat') {
  return firstName + ' ' + lastName;
}

// 函数剩余参数(rest)
// rest 参数只能是最后一个参数
function push(array: number[], ...items: number[]) {
  items.forEach(function(item) {
      array.push(item);
  });
}
push([], 1, 2, 3);

// 泛型用于异步请求
async function API<T>(url: string) {
  return fetch(url).then(v => {
    return v.json()
  }).then((d) => {
    return d as T;
  })
}
API<{
  data: object,
  code: string
}>('a.b.c').then(d => {
  console.log(d)
})

// 隐藏错误, 当然是尽量别用啦
// @ts-ignore
var a: d

// 定义一个复杂obj 的结构
type numberType = 'rank' | 'subject' | 'pics';
type stringType = 'banner' | 'family' | 'hot' | 'recommend' | 'myApp' | 'newest'

// type stringObj = {
//   [key in stringType]: string;
// };
// type numberObj = {
//   [key in numberType]: number;
// };
type stringObj = Record<stringType, string>
type numberObj = Record<numberType, number>
type dataObj = stringObj & numberObj
let obj: dataObj = {
  rank: 1,
  banner: 'dd',
  // 这里就会报错了
  subject: '1'
}

import test from 'ava';
import * as Utils from '../utils'


test('exapmle', t => {
    t.pass();
})

test('serialize', t => {
  t.is(
    Utils.serialize({
      1: 'd',
      2: 'c',
      3: 'e'
    }, ''),
    '1=d&2=c&3=e'
  )
})


// don't know how to test jsonp...
//test('jsonP', t => {
  //return Utils.jsonp(
    //'http://api.map.baidu.com/place/v2/search',
    //{
      //q: '%E5%B9%B3%E5%AE%89%E5%A4%A7%E5%8E%A6',
      //region: '%E4%B8%8A%E6%B5%B7',
      //output: 'json',
      //ak:'033c5ddf06ad5b812e93ca0a04b725df',
      //scope: 2
    //}
  //).then((result) => {
    //t.is(result.status, 0);
  //})
  
//})

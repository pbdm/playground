console.log('Begin Promise');

var promise = new Promise(function(resolve, reject) {
  //resolve('right');
  reject('error');
}).catch(function(e){
  console.log(e);
  return Promise.resolve('from catch');
}).then(function(e){
  console.log(e)
},function(e){
  console.log(e);
});


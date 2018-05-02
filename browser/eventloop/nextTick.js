console.log('current task start'); 

//setImmediate(function(){ console.log('setImmediate'); },0); 

setTimeout(function(){ console.log('setTimeout'); },0); 

setInterval(function(){ console.log('setInterval'); },0); 

new Promise(function(resolve){ 
console.log('Promise start'); resolve(); console.log('Promise end'); 
}).then(function(){ console.log('Promise.then'); }); 

//process.nextTick(function(){ console.log('process.nextTick'); });

var channel = new MessageChannel();
channel.port1.onmessage = function(){console.log('MessageChannel')};
channel.port2.postMessage(1);

var observer = new MutationObserver(function(){console.log('MutationObserver')});
var textNode = document.createTextNode('1');
observer.observe(textNode, {
                characterData: true
            });
textNode.data = '2';

console.log('current task end'); 
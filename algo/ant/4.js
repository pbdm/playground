export const question = '实现一个信号灯控制器，红/黄/绿灯依次点亮 300/200/100 毫秒，不断交替，本题需要自己写测试';
export let testResult = '运行中';

// 红灯亮 300 毫秒，换黄灯亮 200 毫秒，换绿灯亮 100 毫秒，再换红灯 ......

let light = ''; // red, yellow, green

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
async function run() {
  light = 'red';
  await sleep(300);
  light = 'yellow';
  await sleep(200);
  light = 'green';
  await sleep(100);
}
async function execute() {
  await run();
  execute();
}

/*******测试部分*******/
export function doTest() {
  (async () => {
    try {
      const date = {
        red: 300,
        yellow: 200,
        green: 100,
      };
      execute();
      const keys = Object.keys(date);
      for (let index = 0; index < keys.length; index++) {
        assert.equal(light, keys[index]);
        await sleep(date[keys[index]]);
      }
      testResult = '通过';
    } catch (ex) {
      testResult = '不通过';
    }
  })();
}

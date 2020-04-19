export const question = '实现一个简易版的微博，包含 client 和 server 两部分，并实现四个基础功能：关注、取关、发微博、获取用户微博列表';
export let testResult = '运行中';

// A 关注 B 后，A 和 B 就成为好友关系
// 某个用户的微博列表，包含他本人和他所有好友的所有微博
// 具体执行逻辑，参见本题的测试部分

class WeiboClient {
  /**
   * @param { userId, server } options 
   */
  constructor(options) {
    const {
      server,
      userId
    } = options;
    this.server = server;
    this.userId = userId;
  }

  // 关注指定用户
  follow(userId) {
    this.server.follow(this.userId, userId);
  }

  // 取关指定用户
  unfollow(userId) {
    this.server.unfollow(this.userId, userId);
  }

  // 发微博
  postNewWeibo(content) {
    this.server.postNewWeibo(this.userId, content);
  }

}

class WeiboServer {
  constructor() {
    this.followList = {};
    this.contentList = {};
  }

  follow(from , to) {
    if (!this.followList[from]) {
      this.followList[from] = [];
    }
    if (this.followList[from].indexOf(to) === -1) {
      this.followList[from].push(to);
    }
  }

  unfollow(from, to) {
    const index = this.followList[from].indexOf(to);
    if (index !== -1) {
      this.followList[from].splice(index, 1);
    }
  }

  postNewWeibo(id, content) {
    if (!this.contentList[id]) {
      this.contentList[id] = [];
    }
    this.contentList[id].push(content);
  }


  // 获取对应用户微博列表
  getWeiboList(userId) {
    let result = this.contentList[userId];
    const currentFollowList = this.followList[userId] || [];    

    currentFollowList.forEach(id => {
      result = result.concat(this.contentList[id]);
    });
    return result;
  }

}

/*******测试部分*******/
export function doTest() {
  try {
    const wServer = new WeiboServer();
    const wClientA = new WeiboClient({
      userId: '001',
      server: wServer,
    });
    const wClientB = new WeiboClient({
      userId: '002',
      server: wServer,
    });
    const wClientC = new WeiboClient({
      userId: '003',
      server: wServer,
    });
    
    const WEIBO_CONTENT_A = 'Hello World';
    const WEIBO_CONTENT_B = '大家好，我是user 002';
    const WEIBO_CONTENT_C = '小程序怎么写？';
    wClientA.postNewWeibo(WEIBO_CONTENT_A);
    wClientB.postNewWeibo(WEIBO_CONTENT_B);
    wClientC.postNewWeibo(WEIBO_CONTENT_C);

    assert.deepEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A]);

    wClientA.follow('002');
    assert.deepEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A, WEIBO_CONTENT_B]);

    wClientA.follow('003');
    assert.deepEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A, WEIBO_CONTENT_B, WEIBO_CONTENT_C]);

    wClientA.unfollow('002');
    assert.deepEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A, WEIBO_CONTENT_C]);

    testResult = "通过";
  } catch (ex) {
    testResult = "不通过";
  }
}
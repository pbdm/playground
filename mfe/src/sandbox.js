export class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {}; // 修改了哪些属性
    this.active();
  }
  active() {
    this.windowSnapshot = {}; // window对象的快照
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        // 将window上的属性进行拍照
        this.windowSnapshot[prop] = window[prop];
      }
    }
    Object.keys(this.modifyPropsMap).forEach((p) => {
      window[p] = this.modifyPropsMap[p];
    });
  }
  inactive() {
    for (const prop in window) {
      // diff 差异
      if (window.hasOwnProperty(prop)) {
        // 将上次拍照的结果和本次window属性做对比
        if (window[prop] !== this.windowSnapshot[prop]) {
          // 保存修改后的结果
          this.modifyPropsMap[prop] = window[prop];
          // 还原window
          window[prop] = this.windowSnapshot[prop];
        }
      }
    }
  }
}

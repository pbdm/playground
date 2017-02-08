import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import './style.scss';
import { getScrollParent, getStylePrefix } from '../../libs/dom';

// 下拉组件
/*
  init: 初始是否加载数据（目前该功能在左右滑动栏还不可用）
  onRefresh: 更新对应的外部事件,
  onRefreshed: 更新后对应的外部事件,
*/

export default class PullRefresh extends Component {
  constructor(props) {
    super(props);
    this.notFirst = true;
    this.height = 50;
    this.resistanceRatio = 1;
    // 监听绑定
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    // CSS兼容性
    let prefix = getStylePrefix('transition');
    this.transitionEnd = prefix === '' ? 'transitionend' : `${prefix}TransitionEnd`;
    prefix = prefix === '' ? 't' : `${prefix}T`;
    this.transitionProperty = `${prefix}ransitionProperty`;
    this.transitionTimingFunction = `${prefix}ransitionTimingFunction`;
    this.transitionDuration = `${prefix}ransitionDuration`;
  }

  componentDidMount() {
    this.currNode = findDOMNode(this.currNodeRef);
    const { init } = this.props;
    this.handleInitLoad(init);
    this.attachTouch();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.notFirst && nextProps.init === true && nextProps.init !== this.props.init) {
      this.handleInitLoad(true);
    }
  }

  componentWillUnmount() {
    this.detachTouch();
  }

  handleInitLoad(init) {
    this.state = 'INIT';
    if (init) {
      this.handleRefresh(init);
    }
  }

  handleTouchStart(e) {
    this.startY = e.touches[0].pageY;
    // 防止没有touchmove的时候distance的值错误
    this.distance = 0;
    // this.startX = e.touches[0].pageX;
  }

  handleTouchMove(e) {
    // 暂时设定为距屏幕左侧距离，（应该为距离ScrollParent的左侧距离，一般情况下ScrollParent宽度为整个屏幕）
    if (this.currNode.getBoundingClientRect().left !== 0) return;
    const pageY = e.touches[0].pageY;
    let diffY = pageY - this.startY;
    diffY = -1 + Math.pow(diffY, this.resistanceRatio);
    if (diffY > 0 && this.scrollParent.scrollTop <= 0 ) {
      e.preventDefault();
      if (diffY > 100) {
        this.setStyle(100);
      } else {
        this.setStyle(diffY);
      }
    }
  }

  handleTouchEnd() {
    if (this.distance > this.height && this.state !== 'FETCHING') {
      this.handleRefresh();
    } else {
      this.setStyle(0, 300);
    }
  }

  // 更新相关
  handleRefresh(init) {
    const { onRefresh } = this.props;
    try {
      this.setStyle(this.height, 300);
      this.state = 'FETCHING';
      onRefresh && onRefresh(init).then(() => {
        if (init) this.notFirst = false;
        this.handleRefreshEnd();
      }, () => {
        if (init) this.notFirst = false;
        this.handleRefreshEnd();
      });
    } catch (e) {
      throw new Error('刷新函数不支持Promise');
    }
  }

  handleRefreshEnd() {
    const { onRefreshed } = this.props;
    this.state = 'INIT';
    this.setStyle(0, 300);
    onRefreshed && onRefreshed();
  }

  setStyle(height = 0, duration = 0) {
    // console.log('h' + height + 'd' + duration);
    this.distance = height;
    this.touchParent.style.transform = `translate3d(0px, ${height - this.currNode.clientHeight}px, 0px)`;
    this.touchParent.style[this.transitionDuration] = `${duration}ms`;
  }

  render() {
    return (
      <div ref={ref => this.currNodeRef = ref} className="pull-refresh">
        pull refresh
      </div>
    );
  }

  attachTouch() {
    this.scrollParent = getScrollParent(this.currNode);
    if (this.scrollParent === document) this.scrollParent = document.body;
    this.touchParent = this.currNode.parentNode;
    if (this.touchParent === document.body) {
      this.touchParent = document;
    }
    this.touchParent.style.transform = `translate3d(0px, ${-100}px, 0px)`;
    this.touchParent.addEventListener('touchstart', this.handleTouchStart, false);
    this.touchParent.addEventListener('touchmove', this.handleTouchMove, false);
    this.touchParent.addEventListener('touchend', this.handleTouchEnd, false);
    this.touchParent.addEventListener('touchcancel', this.handleTouchEnd, false);
  }

  detachTouch() {
    this.touchParent.removeEventListener('touchstart', this.handleTouchStart, false);
    this.touchParent.removeEventListener('touchmove', this.handleTouchMove, false);
    this.touchParent.removeEventListener('touchend', this.handleTouchEnd, false);
    this.touchParent.removeEventListener('touchcancel', this.handleTouchEnd, false);
  }
}

PullRefresh.propTypes = {
  init: PropTypes.bool,
  onRefresh: PropTypes.func,
  onRefreshed: PropTypes.func
};

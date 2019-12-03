
Component({

  ready() {
    const query = swan.createSelectorQuery().in(this)
    query.select(".item").boundingClientRect((res) => {
      this.itemHeight = res.height
    }).exec();
  },

  methods: {

    handlePress(e) {
      this.setData({
        dragIndex: e.currentTarget.dataset.index
      })
      this.canDrag = true;
      this.begin = e.changedTouches[0].pageY
      swan.vibrateShort();
  
    },
    
    handleTouchMove(e) {
      console.log(this.begin)
      if (!this.canDrag) {
        return
      }
      const pageY = e.changedTouches[0].pageY; 
      let transY = pageY - this.begin;
      const indexDiff = Math.round(transY / this.itemHeight);
      if (indexDiff) {
        console.log('indexDiff', indexDiff)
        let dragIndex = this.data.dragIndex;
        let list = [...this.data.list];
        // 要放在这里 , 因为需要取出 dragIndex 没变前的 dragItem
        const dragItem = list.splice(dragIndex, 1)[0];
        dragIndex += indexDiff;
        if (dragIndex > list.length || dragIndex < 0) {
          this.setData({
            transY
          })
        } else {
          list.splice(dragIndex, 0, dragItem);
          // 如果改变了顺序, 需要重新设置 begin 值, 当前可拖拽元素 index 和 transY 值
          transY -= indexDiff * this.itemHeight;
          this.begin += indexDiff * this.itemHeight;
          this.setData({
            list,
            dragIndex,
            transY
          })
        }
      } else {
        this.setData({
          transY 
        })
      }
      
    },
  
    handleTouchEnd(e) {
      this.canDrag = false
      this.setData({
        transY: 0
      })
    },
  }

});

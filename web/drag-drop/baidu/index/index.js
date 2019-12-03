const list = [
  {
    name: 'a',
    color: 'red'
  },
  {
    name: 'b',
    color: 'green'
  },
  {
    name: 'c',
    color: 'yellow'
  },
  {
    name: 'd',
    color: 'pink'
  },
  {
    name: 'e',
    color: 'blue'
  },
  {
    name: 'f',
    color: 'orange'
  },
  {
    name: 'g',
    color: 'purple'
  },

]

Page({
  data: {
    list: []
  },

  onLoad() {
    setTimeout(() => {
      this.setData({
        list: list
      })
    }, 100)
  }
  
});

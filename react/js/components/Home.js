import { Component } from 'react'

class Home extends Component {
  handle() {
    require.ensure([], function (require) {
        require('./child')
    })
  }

  componentDidMount() {
    Perf.stop();
    Perf.printInclusive();
    Perf.printWasted();
  }

  render() {
    return <div>
              <h3>Home</h3>
              <div onClick={this.handle}>click</div>
           </div>          
  }
}

export default Home 

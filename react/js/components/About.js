import { Component } from 'react'

class About extends Component {
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
        return 'You have unsaved information, are you sure you want to leave this page?'
    })
  }
  render() {
    return <h3>About</h3>
  }
}

export default About 

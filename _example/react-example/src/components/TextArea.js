/**
 * TextArea组件,默认为自动resize
 */

import { Component, PropTypes } from 'react'

export default class Ta extends Component {

  static propTypes = {
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    
  }

  handleChange(e) {
    this.props.onChange(e)
  }

  render() {
    return (
      <textarea {...this.props} ref='textarea' onChange={this.handleChange} />
    )
  }
}

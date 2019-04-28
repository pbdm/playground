import { Component } from 'react';

class Btt extends Component {
  constructor(props) {
    super(props);
    this.gotoTop = this.gotoTop.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleShowChild = this.toggleShowChild.bind(this);
    this.ticking = false;
  }

	state = {
		opacity: 0
	}

  easeInOutCubic(t, b, d) {
    if ((t/=d/2) < 1) return b - b/2*t*t*t
    return b - b/2*((t-=2)*t*t + 2)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleShow);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleShow);
  }

  toggleShow() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.toggleShowChild);
    }
    this.ticking = true;
  }

  toggleShowChild() {
    this.ticking = false;
    if (document.body.clientHeight < window.scrollY) {
      this.setState({
        opacity: 1
      })
    } else {
      this.setState({
        opacity: 0
      })
    }
  }

  gotoTop() {
    let startTime
    let startPos = window.scrollY;
    let duration = 900
    let scroll = (timestamp) => {
      startTime = startTime || timestamp
      let elapsed = timestamp - startTime
      let progress = this.easeInOutCubic(elapsed, startPos, duration)
      window.scrollTo(0, progress);
      elapsed < duration && window.requestAnimationFrame(scroll)
    }
    window.requestAnimationFrame(scroll)
  }

  render() {
    let myStyle = {
      opacity: this.state.opacity
    }
    return(
      <section style={myStyle} className="goToTop clickable" onClick={this.gotoTop}>↑</section>
    );
  }
}

export default Btt

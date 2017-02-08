import React from 'react'

// 节流阀
function getRAF(func) {
  const w = window;
  const prefixs = ["r", "webkitR", "mozR", "msR", "oR"];
  for (let prefix of prefixs) {
    prefix=prefix + "equestAnimationFrame";
    if (prefix in w) return w[prefix](func);
  }
  return (f)=> {
    setTimeout(f, 16)
  }
}

function isSupportSticky() {
  let sticky = "-webkit-sticky", iEl = document.createElement("i");
  iEl.style.position = sticky;
  let iElPos = iEl.style.position;
  iEl = null ;
  return iElPos === sticky;
}

const stickTop = (ComposedComponent) => class extends React.Component {
  constructor(props) {
    super(props);
    this.isSticky = isSupportSticky();
		this.handleStick = this.handleStick.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    top: 0
  }

  componentDidMount() {
    if (!this.isSticky) {
      this.attachScroll();
    }
  }

  componentDidUpdate() {
    this.handleChange();
  }

	componentWillUnmount() {
    if (!this.isSticky) {
      this.detachScroll();
    }
	}

	handleStick() {
    getRAF(()=>{
      this.handleChange();
    });
	}

  handleChange() {
    if (!this.isSticky) {
      const stickNode = React.findDOMNode(this.sticky);
      if (stickNode && stickNode.nodeType === 1) {
        const blankNode = React.findDOMNode(this.blank);
        const height = stickNode.getBoundingClientRect().height;
        blankNode.style.height = height + 'px';
        if (window.scrollY > (blankNode.offsetTop || stickNode.offsetTop) - this.props.top) {
          blankNode.style.display = 'block';
          stickNode.style.position = 'fixed';
        } else {
          blankNode.style.display = 'none';
          stickNode.style.position = 'static';
        }
      }
    }
  }

  render() {
    if (this.isSticky) {
      return (<ComposedComponent {...this.props}/>)
    } else {
      return(
        <div>
          <div ref={(ref) => this.blank = ref} ></div>
          <ComposedComponent {...this.props} ref={(ref) => this.sticky = ref}/>
        </div>
      )
    }
  }

  attachScroll() {
		window.addEventListener('scroll', this.handleStick, false);
		window.addEventListener('touchmove', this.handleStick, false);
	}
	detachScroll() {
		window.removeEventListener('scroll', this.handleStick, false);
		window.removeEventListener('touchmove', this.handleStick, false);
	}

}

export default stickTop;

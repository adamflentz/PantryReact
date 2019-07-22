import React, {Component} from 'react';
import './Modal.css';

class Modal extends Component {

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleExitFunction);
        document.addEventListener('keydown', this.handleExitFunction);
      }
    
      componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.escFunction);
      }
    
      /**
       * Set the wrapper ref
       */
      setWrapperRef = (node) => {
          this.wrapperRef = node;
      }

      keyPress = (e) => {
        if(e.key === "Escape" && this.props.active) {
            this.props.toggleModal();
        }
    }
    
      /**
       * Alert if clicked on outside of element
       */
      handleExitFunction = (event) => {
        if (this.props.active && ((this.wrapperRef && !this.wrapperRef.contains(event.target)) || event.key === "Escape"))
        {
          this.props.toggleModal();
        }
    }

    render() {
        console.log(this.props);
        return(
            <div className="modalContainer">
                <div ref={this.setWrapperRef} className="modalContent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal;
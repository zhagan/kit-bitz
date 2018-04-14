import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import bugs from './bugs.png';

// gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
}

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 750,
    maxHeight: 'auto',
    margin: 'auto',
    padding: 10,
    position: "relative",
    
   
};

const footerStyle = {
    position: "absolute",
    bottom: 20,
};

const imageStyle = {
    maxHeight: 400
 
};

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
    }
    onClose = (e) => {
        console.log("BUTTON CLICKED");
        e.stopPropagation ();
        this.props.onClose && this.props.onClose(e);
    }

    onKeyUp = (e) => {
        // Lookout for ESC key (27)
        if (e.which === 27 && this.props.show) {
            this.onClose(e);
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
        modalRoot.removeChild(this.el);
    }

    render() {
        var modalUI = (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                        <div className="col s12 m7">
                            
                            <div className="card horizontal">
                            <div className="card-image">
                            
                                <img src={bugs} style={imageStyle}/>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                {this.props.children}
                                 
                                <form className="col s12">
                                <div className="row">
                                  <div className="input-field col s12">
                                    <input id="first_name" type="text" className="validate" />
                                    <label for="first_name">Username (testform)</label>
                                  </div>
                                  <div className="input-field col s12">
                                    <input id="last_name" type="text" className="validate" />
                                    <label for="last_name">Password (testform)</label>
                                  </div>
                                </div>
                                 </form>

                                </div>
                                <div className="card-action">
                                <a onClick={(e) => { this.onClose(e)}} class="waves-effect waves-teal btn-flat"><i className="material-icons left">close</i>Close</a>
                                </div>
                            </div>
                            </div>
                        </div>

                </div>
            </div>
        );
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal (
            modalUI,
            this.el,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}
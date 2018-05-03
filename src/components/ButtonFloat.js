import React, { Component } from 'react';
import '../css/buttonFloat.css';

export default class ButtonFloat extends Component {
    render(){
        return (
            <div className="container-button">
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.props.action}>
                    <i className="material-icons">add</i>
                </button>
            </div>
        );
    }
}
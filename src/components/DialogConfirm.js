import React, { Component } from 'react';
import '../css/dialog.css';

export default class DialogConfirm extends Component{
    render(){
        return (
            <dialog className="mdl-dialog">
                <h5 className="mdl-dialog__title">Confirmação</h5>
                <div className="mdl-dialog__content">
                <p>
                    {this.props.content}
                </p>
                </div>
                <div className="mdl-dialog__actions">
                <button type="button" className="mdl-button" onClick={this.props.confirm}>Sim</button>
                <button type="button" className="mdl-button close">Não</button>
                </div>
            </dialog>
        );
    }
}
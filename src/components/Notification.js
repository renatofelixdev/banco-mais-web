import React, { Component } from 'react';
import '../css/notification.css';
import { updateNotification } from '../actions/actionCreator';

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = { notification: { msg: '', visible: false, status: '' } };
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
             this.setState({ notification: this.props.store.getState().notification });
        });
    }

    close(event){
        event.preventDefault();
        this.props.store.dispatch(updateNotification(false, {}));
    }

    render() {
        //console.log(this);
        return (
            <div className={this.props.align + " " + (this.state.notification.visible ? 'show' : 'hide')}>
                <span className={"mdl-chip mdl-chip--deletable " + (this.state.notification.status)}>
                    <span className="mdl-chip__text">{this.state.notification.msg}</span>
                    <button type="button" className="mdl-chip__action" onClick={this.close.bind(this)}><i className="material-icons">cancel</i></button>
                </span>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        let n1 = this.state.notification;
        let n2 = nextState.notification;

        if(n2.visible){
            window.setTimeout(function(){ 
                this.props.store.dispatch(updateNotification(false, {})); 
            }.bind(this), 6000);
        }

        ////console.log(n1,n2);
        if(n1.msg === n2.msg && n1.visible === n2.visible && n1.status === n2.status)
            return false;
        return true;
    }

}


export default Notification;
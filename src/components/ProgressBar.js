import React, { Component } from 'react';
import '../css/progress-bar.css';

export default class ProgressBar extends Component{

    constructor(props) {
        super(props);
        this.state = { progress: false };
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
             this.setState({ progress: this.props.store.getState().progressBar });
        });
    }

    render(){
        //console.log(this);
        return (
            <div className={"progress-component mdl-cell mdl-cell--12-col "+ (this.state.progress ? 'show' : 'hide')}>
                <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate progress-bar">
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.progress !== nextState.progress)
            return true;
        return false;
    }

}
import React, { Component } from 'react';
import '../css/title-page.css';


export default class TitlePage extends Component {
    render() {
        return (
            <div className="mdl-cell mdl-cell--6-col">
                <ul className="demo-list-icon mdl-list">
                    <li className="mdl-list__item list-content">
                        <span className="mdl-list__item-primary-content">
                            <button onClick={this.props.back} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--icon">
                                <i className="material-icons">navigate_before</i>
                            </button>
                            <span className="mdl-layout-title span-title">{this.props.title}</span>
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}
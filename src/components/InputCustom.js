import React, { Component } from 'react';
import '../css/inputCustom.css';

export default class InputCustom extends Component {

    inputRef() {
        return (
            <input className={"mdl-textfield__input input-custom form-bind "
                + (this.props.date === true ? 'datepicker ' : '')
                + (this.props.time === true ? 'timepicker ' : '')}
                ref={this.props.inputRef}
                type={this.props.type}
                id={this.props.id}
                disabled={(this.props.disabled === true ? 'disabled' : '')} />
        );
    }

    inputValue() {
        return (
            <input className={"mdl-textfield__input input-custom form-bind "
                + (this.props.date === true ? 'datepicker ' : '')
                + (this.props.time === true ? 'timepicker ' : '')}
                value={(this.props.valueInput ? this.props.valueInput : '')}
                type={this.props.type}
                id={this.props.id}
                disabled={(this.props.disabled === true ? 'disabled' : '')} />
        );
    }

    render() {
        //console.log(this.props.id,this.props.valueInput);
        return (
            <div className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label input-text-custom "
                + (this.props.valueInput ? 'is-dirty ' : '')
                + (this.props.validators[this.props.id] !== undefined ? 'is-invalid is-focused' : '')}>

                {this.props.useValue ? this.inputValue() : this.inputRef()}

                <label className="mdl-textfield__label label-custom" htmlFor={this.props.id}>{this.props.label}</label>
                <span className="mdl-textfield__error">{this.props.validators[this.props.id] !== undefined ? this.props.validators[this.props.id] : ''}</span>
            </div>
        );
    }
}
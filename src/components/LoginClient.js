import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import Notification from './Notification';
import LoginApi from '../api/LoginApi';
import logo from '../imgs/logo.png';
import '../css/login.css';
import '../css/buttonFloat.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import InputCustom from './InputCustom';

class LoginClient extends Component {

    login(event) {
        event.preventDefault();
        this.props.login(this.cpf.value, this.password.value);
    }

    render() {
        //console.log("render login");
        //console.log(this);
        return (
            <form className="form-login" onSubmit={this.login.bind(this)}>
                <div className="demo-card-wide mdl-card mdl-shadow--16dp">
                    <ProgressBar store={this.context.store} />
                    <div className="mdl-card__title">
                        <img src={logo} style={{ "maxWidth": "290px" }} alt="logo" />
                    </div>
                    <div className="mdl-card__supporting-text">
                        <Notification align="center" store={this.context.store}/>
                        <InputCustom type="text" id="cpf" inputRef={(input) => this.cpf = input} label="CPF" validators={[]}/>
                        <InputCustom type="password" id="password" inputRef={(input) => this.password = input} label="Senha" validators={[]}/>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <input type="submit" value="Entrar" className="mdl-button mdl-button-r mdl-button--colored mdl-js-button mdl-js-ripple-effect" />
                    </div>
                </div>

            </form>
        );
    }
}


const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        login: (cpf, password) => {
            dispatch(LoginApi.loginClient(cpf, password));
        }
    }
}

LoginClient.contextTypes = {
    store : PropTypes.object.isRequired
}

const LoginClientContainer = connect(mapStateToProps, mapDispatchToProps)(LoginClient);

export default LoginClientContainer


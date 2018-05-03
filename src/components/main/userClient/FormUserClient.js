import React, { Component } from 'react';
import InputCustom from '../../InputCustom';
import NotificationComponent from '../../Notification';
import ProgressBar from '../../ProgressBar';
import PropTypes from 'prop-types';
import UserClientApi from '../../../api/UserClientApi';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';
import TitlePage from '../../TitlePage';
import $ from 'jquery';
import jwt from 'jsonwebtoken';

class FormUserClient extends Component {

    back() {
        browserHistory.push('/gestao/clientes');
    }

    saveUserClient(event) {
        event.preventDefault();

        let userClient = this.props.userClient;
        for (var key in this) {
            if (this[key] instanceof HTMLInputElement)
            userClient[key] = this[key].value;
        }
        this.props.saveUserClient(userClient, this.props.user);
    }

    componentDidMount() {
        window.componentHandler.upgradeDom();

        let userClient = this.props.userClient;
        if (userClient.id !== null && Object.keys(this.props.notification.validators).length === 0 && this.props.notification.validators.constructor === Object) {
            for (var key in userClient) {
                if (this[key] instanceof HTMLInputElement)
                    this[key].value = userClient[key];
            }
                
            $('.input-custom').parent().addClass('is-dirty');
        }
    }

    componentDidUpdate(){
        window.componentHandler.upgradeDom();
    }

    render() {
        return (
            <div className="container">            
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Clientes', 'link':'/gestao/clientes'},
                                    {'name':'Cadastro de Cliente', 'link':''}]}/>
                <form className="form-company" onSubmit={this.saveUserClient.bind(this)}>
                    
                        <div className=" mdl-grid">
                        <TitlePage title="Cadastro de Cliente" back={this.back.bind(this)}/>
                            <div className="mdl-cell mdl-cell--6-col">
                                <NotificationComponent align="right" store={this.context.store} />
                            </div>
                            <div className="mdl-card mdl-shadow--2dp">
                                <ProgressBar store={this.context.store} />
                                <div className="mdl-card__supporting-text">
                                    <div className="mdl-grid">

                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="name"
                                                inputRef={(input) => this.name = input} label="Nome do Cliente *"
                                                valueInput={this.props.userClient.name}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="cpf"
                                                inputRef={(input) => this.cpf = input} label="CPF *"
                                                valueInput={this.props.userClient.cpf}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="address"
                                                inputRef={(input) => this.address = input} label="Endereço *"
                                                valueInput={this.props.userClient.address}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="password" id="password"
                                                inputRef={(input) => this.password = input} label="Senha *"
                                                valueInput={this.props.userClient.password}
                                                validators={this.props.notification.validators} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mdl-card__actions mdl-card--border">
                                    <input type="submit" className="mdl-button mdl-button-r mdl-button--primary mdl-js-button mdl-js-ripple-effect" value="Salvar" />
                                    <input type="button" className="mdl-button mdl-button-r mdl-js-button mdl-js-ripple-effect" value="Cancelar" onClick={this.back.bind(this)} />
                                </div>
                            </div>
                        </div>
                </form>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return { user : state.formUserMaster.user ? jwt.verify(state.formUserMaster.user , 'user') : state.formUserMaster.user,
                notification : state.formUserClient.notification,
                userClient : state.formUserClient.userClient}
};

const mapDispatchToProps = dispatch => {
    return {
        saveUserClient: (userClient, user) => {
            dispatch(UserClientApi.saveUserClient(userClient, user));
        }
    }
}

FormUserClient.contextTypes = {
    store: PropTypes.object.isRequired
}


const FormUserClientContainer = connect(mapStateToProps, mapDispatchToProps)(FormUserClient);

export default FormUserClientContainer
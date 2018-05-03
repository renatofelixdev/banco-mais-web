import React, { Component } from 'react';
import InputCustom from '../../InputCustom';
import NotificationComponent from '../../Notification';
import ProgressBar from '../../ProgressBar';
import PropTypes from 'prop-types';
import BankApi from '../../../api/BankApi';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';
import TitlePage from '../../TitlePage';
import $ from 'jquery';
import jwt from 'jsonwebtoken';

class FormBank extends Component {

    back() {
        browserHistory.push('/gestao/bancos');
    }

    saveBank(event) {
        event.preventDefault();

        let bank = this.props.bank;
        for (var key in this) {
            if (this[key] instanceof HTMLInputElement)
                bank[key] = this[key].value;
        }
        this.props.saveBank(bank, this.props.user);
    }

    componentDidMount() {
        window.componentHandler.upgradeDom();

        let bank = this.props.bank;
        if (bank.id !== null && Object.keys(this.props.notification.validators).length === 0 && this.props.notification.validators.constructor === Object) {
            for (var key in bank) {
                if (this[key] instanceof HTMLInputElement)
                    this[key].value = bank[key];
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
                                    {'name':'Bancos', 'link':'/gestao/bancos'},
                                    {'name':'Cadastro de Banco', 'link':''}]}/>
                <form className="form-company" onSubmit={this.saveBank.bind(this)}>
                    
                        <div className=" mdl-grid">
                        <TitlePage title="Cadastro de Banco" back={this.back.bind(this)}/>
                            <div className="mdl-cell mdl-cell--6-col">
                                <NotificationComponent align="right" store={this.context.store} />
                            </div>
                            <div className="mdl-card mdl-shadow--2dp">
                                <ProgressBar store={this.context.store} />
                                <div className="mdl-card__supporting-text">
                                    <div className="mdl-grid">

                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="name"
                                                inputRef={(input) => this.name = input} label="Nome do Banco *"
                                                valueInput={this.props.bank.name}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="number" id="code"
                                                inputRef={(input) => this.code = input} label="Código do Banco *"
                                                valueInput={this.props.bank.code}
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
                notification : state.formBank.notification,
                bank : state.formBank.bank}
};

const mapDispatchToProps = dispatch => {
    return {
        saveBank: (bank, user) => {
            dispatch(BankApi.saveBank(bank, user));
        }
    }
}

FormBank.contextTypes = {
    store: PropTypes.object.isRequired
}


const FormBankContainer = connect(mapStateToProps, mapDispatchToProps)(FormBank);

export default FormBankContainer
import React, { Component } from 'react';
import InputCustom from '../../InputCustom';
import NotificationComponent from '../../Notification';
import ProgressBar from '../../ProgressBar';
import PropTypes from 'prop-types';
import BankAgencyApi from '../../../api/BankAgencyApi';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';
import TitlePage from '../../TitlePage';
import $ from 'jquery';
import jwt from 'jsonwebtoken';

class FormBankAgency extends Component {

    back() {
        browserHistory.push('/gestao/agencias');
    }

    saveBank(event) {
        event.preventDefault();

        let bankAgency = this.props.bankAgency;
        for (var key in this) {
            if (this[key] instanceof HTMLInputElement)
                bankAgency[key] = this[key].value;
        }
        bankAgency.bank = this.props.bankSelect;
        this.props.saveBankAgency(bankAgency, this.props.user);
    }

    componentDidMount() {
        window.componentHandler.upgradeDom();
 
        this.context.store.dispatch(BankAgencyApi.getBanks(this.props.user));

        let bankAgency = this.props.bankAgency;
        if (bankAgency.id !== null && Object.keys(this.props.notification.validators).length === 0 && this.props.notification.validators.constructor === Object) {
            for (var key in bankAgency) {
                if (this[key] instanceof HTMLInputElement)
                    this[key].value = bankAgency[key];
            }
            this.props.changeBank(bankAgency.bank.id);
            $('.input-custom').parent().addClass('is-dirty');
        }
    }

    componentWillReceiveProps(props){
        if(this.props.user === null || this.props.user === '')
            this.context.store.dispatch(BankAgencyApi.getBanks(props.user));
    }

    componentDidUpdate(){
        window.componentHandler.upgradeDom();
    }

    changeBank(event) {
        event.preventDefault();
        this.props.changeBank(event.target.value);
    }

    render() {
        return (
            <div className="container">            
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Agências Bancárias', 'link':'/gestao/agencias'},
                                    {'name':'Cadastro de Agência Bancária', 'link':''}]}/>
                <form className="form-company" onSubmit={this.saveBank.bind(this)}>
                    
                        <div className=" mdl-grid">
                        <TitlePage title="Cadastro de Agência Bancária" back={this.back.bind(this)}/>
                            <div className="mdl-cell mdl-cell--6-col">
                                <NotificationComponent align="right" store={this.context.store} />
                            </div>
                            <div className="mdl-card mdl-shadow--2dp">
                                <ProgressBar store={this.context.store} />
                                <div className="mdl-card__supporting-text">
                                    <div className="mdl-grid">
                                    <div className="mdl-cell mdl-cell--12-col">
                                        <div className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label select-custom is-dirty "
                                                + (this.props.notification.validators['bank'] !== undefined ? 'is-invalid is-focused' : '')}>
                                                <select className="mdl-textfield__input input-custom" id="bank" name="bank"
                                                    value={this.props.bankSelect} onChange={this.changeBank.bind(this)}>
                                                    <option>Selecione um Banco</option>
                                                    {this.props.banks
                                                        .map(bank => {
                                                            return (
                                                                <option key={bank.id} value={bank.id}>{bank.name}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <label className="mdl-textfield__label label-custom" htmlFor="bank">Banco *</label>
                                                <span className="mdl-textfield__error">
                                                    {this.props.notification.validators['bank'] !== undefined ? this.props.notification.validators['bank'] : ''}
                                                </span>
                                            </div>                                                
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="name"
                                                inputRef={(input) => this.name = input} label="Nome da Agência *"
                                                valueInput={this.props.bankAgency.name}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="number" id="code"
                                                inputRef={(input) => this.code = input} label="Código da Agência *"
                                                valueInput={this.props.bankAgency.code}
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
                notification : state.formBankAgency.notification,
                bankAgency : state.formBankAgency.bankAgency,
                banks : state.formBankAgency.banks,
                bankSelect : state.formBankAgency.bankSelect}
};

const mapDispatchToProps = dispatch => {
    return {
        saveBankAgency: (bankAgency, user) => {
            dispatch(BankAgencyApi.saveBankAgency(bankAgency, user));
        },
        changeBank: (value) => {
            dispatch(BankAgencyApi.changeBank(value));
        }
    }
}

FormBankAgency.contextTypes = {
    store: PropTypes.object.isRequired
}


const FormBankAgencyContainer = connect(mapStateToProps, mapDispatchToProps)(FormBankAgency);

export default FormBankAgencyContainer
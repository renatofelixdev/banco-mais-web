import React, { Component } from 'react';
import InputCustom from '../../InputCustom';
import NotificationComponent from '../../Notification';
import ProgressBar from '../../ProgressBar';
import PropTypes from 'prop-types';
import BankAccountApi from '../../../api/BankAccountApi';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';
import TitlePage from '../../TitlePage';
import $ from 'jquery';
import jwt from 'jsonwebtoken';

class FormBankAccount extends Component {

    back() {
        browserHistory.push('/gestao/contas-bancarias');
    }

    saveBankAccount(event) {
        event.preventDefault();

        let bankAccount = this.props.bankAccount;
        for (var key in this) {
            if (this[key] instanceof HTMLInputElement)
            bankAccount[key] = this[key].value;
        }
        bankAccount.bank = this.props.bankSelect;
        bankAccount.bankAgency = this.props.bankAgencySelect;
        bankAccount.bankAccountType = this.props.typeSelect;
       // console.log(bankAccount);
        this.props.saveBankAccount(bankAccount, this.props.user);
    }

    componentDidMount() {
        window.componentHandler.upgradeDom();
        if(this.props.user !== null && this.props.user !== ''){
            this.context.store.dispatch(BankAccountApi.getBanks(this.props.user));
            this.context.store.dispatch(BankAccountApi.getBankAccountTypes(this.props.user));
        }
        let bankAccount = this.props.bankAccount;
        if (bankAccount.id !== null && Object.keys(this.props.notification.validators).length === 0 && this.props.notification.validators.constructor === Object) {
            for (var key in bankAccount) {
                if (this[key] instanceof HTMLInputElement)
                    this[key].value = bankAccount[key];
            }

            this.name.value = bankAccount.userClient.name;
            this.cpf.value = bankAccount.userClient.cpf;
            this.address.value = bankAccount.userClient.address;

            if(this.props.user === null || this.props.user === ''){
                this.props.changeBank(bankAccount.bankAgency.bank.id, this.props.user);
            }
            this.props.changeBankAgency(bankAccount.bankAgency.id);
            this.props.changeBankAccountType(bankAccount.bankAccountType);
            $('.input-custom').parent().addClass('is-dirty');
        }
    }

    componentWillReceiveProps(props){
        if(this.props.user === null || this.props.user === ''){
            this.context.store.dispatch(BankAccountApi.getBanks(props.user));
            this.context.store.dispatch(BankAccountApi.getBankAccountTypes(props.user));
            if(this.props.bankAccount.id !== null){
                this.props.changeBank(this.props.bankAccount.bankAgency.bank.id, props.user);
                this.props.changeBankAgency(this.props.bankAccount.bankAgency.id);
            }
        }
    }

    componentDidUpdate(){
        window.componentHandler.upgradeDom();
    }

    changeBank(event) {
        event.preventDefault();
        if(this.props.user !== null && this.props.user !== ''){
            this.props.changeBank(event.target.value, this.props.user);
        }
    }

    changeBankAgency(event) {
        event.preventDefault();
        this.props.changeBankAgency(event.target.value);
    }

    changeBankAccountType(event) {
        event.preventDefault();
        this.props.changeBankAccountType(event.target.value);
    }

    render() {
        return (
            <div className="container">            
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Contas Bancárias', 'link':'/gestao/agencias'},
                                    {'name':'Cadastro de Conta Bancária', 'link':''}]}/>
                <form className="form-company" onSubmit={this.saveBankAccount.bind(this)}>
                    
                        <div className=" mdl-grid">
                        <TitlePage title="Cadastro de Conta Bancária" back={this.back.bind(this)}/>
                            <div className="mdl-cell mdl-cell--6-col">
                                <NotificationComponent align="right" store={this.context.store} />
                            </div>
                            <div className="mdl-card mdl-shadow--2dp">
                                <ProgressBar store={this.context.store} />
                                <div className="mdl-card__supporting-text">
                                    <div className="mdl-grid">
                                    <div className="mdl-cell mdl-cell--6-col">
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
                                        <div className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label select-custom is-dirty "
                                                + (this.props.notification.validators['bank'] !== undefined ? 'is-invalid is-focused' : '')}>
                                                <select className="mdl-textfield__input input-custom" id="bankAgency" name="bankAgency"
                                                    value={this.props.bankAgencySelect} onChange={this.changeBankAgency.bind(this)}>
                                                    <option>Selecione uma Agência</option>
                                                    {this.props.banksAgencies
                                                        .map(bank => {
                                                            return (
                                                                <option key={bank.id} value={bank.id}>{bank.name}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <label className="mdl-textfield__label label-custom" htmlFor="bankAgency">Agência *</label>
                                                <span className="mdl-textfield__error">
                                                    {this.props.notification.validators['bankAgency'] !== undefined ? this.props.notification.validators['bankAgency'] : ''}
                                                </span>
                                            </div>                                                
                                        </div>
                                    <div className="mdl-cell mdl-cell--6-col">
                                        <div className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label select-custom is-dirty "
                                                + (this.props.notification.validators['bank'] !== undefined ? 'is-invalid is-focused' : '')}>
                                                <select className="mdl-textfield__input input-custom" id="bankAccountType" name="bankAccountType"
                                                    value={this.props.typeSelect} onChange={this.changeBankAccountType.bind(this)}>
                                                    <option>Selecione Tipo de Conta</option>
                                                    {Object.keys(this.props.types)
                                                        .map((key,index) => {
                                                            return (
                                                                <option key={key} value={key}>{this.props.types[key]}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <label className="mdl-textfield__label label-custom" htmlFor="bankAccountType">Tipo de Conta *</label>
                                                <span className="mdl-textfield__error">
                                                    {this.props.notification.validators['bankAccountType'] !== undefined ? this.props.notification.validators['bankAccountType'] : ''}
                                                </span>
                                            </div>                                                
                                        </div>

                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="name"
                                                inputRef={(input) => this.name = input} label="Nome do Cliente *"
                                                valueInput={this.props.bankAccount.userClient.name}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="cpf"
                                                inputRef={(input) => this.cpf = input} label="CPF *"
                                                valueInput={this.props.bankAccount.userClient.cpf}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="address"
                                                inputRef={(input) => this.address = input} label="Endereço *"
                                                valueInput={this.props.bankAccount.userClient.address}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="password" id="password"
                                                inputRef={(input) => this.password = input} label="Senha *"
                                                valueInput={this.props.bankAccount.userClient.password}
                                                validators={this.props.notification.validators} />
                                        </div>


                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="number"
                                                inputRef={(input) => this.number = input} label="Número da Conta *"
                                                valueInput={this.props.bankAccount.number}
                                                validators={this.props.notification.validators} />
                                        </div>
                                        <div className="mdl-cell mdl-cell--6-col">
                                            <InputCustom type="text" id="balance"
                                                inputRef={(input) => this.balance = input} label="Saldo Inicial *"
                                                valueInput={this.props.bankAccount.balance}
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
                notification : state.formBankAccount.notification,
                bankAccount : state.formBankAccount.bankAccount,
                banks : state.formBankAccount.banks,
                bankSelect : state.formBankAccount.bankSelect,
                banksAgencies : state.formBankAccount.banksAgencies,
                bankAgencySelect : state.formBankAccount.bankAgencySelect,
                types : state.formBankAccount.types,
                typeSelect : state.formBankAccount.typeSelect}
};

const mapDispatchToProps = dispatch => {
    return {
        saveBankAccount: (bankAccount, user) => {
            dispatch(BankAccountApi.saveBankAccount(bankAccount, user));
        },
        changeBank: (value, user) => {
            dispatch(BankAccountApi.changeBank(value, user));
        },
        changeBankAgency: (value) => {
            dispatch(BankAccountApi.changeBankAgency(value));
        },
        changeBankAccountType: (value) => {
            dispatch(BankAccountApi.changeBankAccountType(value));
        }
    }
}

FormBankAccount.contextTypes = {
    store: PropTypes.object.isRequired
}


const FormBankAccountContainer = connect(mapStateToProps, mapDispatchToProps)(FormBankAccount);

export default FormBankAccountContainer
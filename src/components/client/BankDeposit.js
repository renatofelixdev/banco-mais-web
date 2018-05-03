import React, { Component } from 'react';
import ProgressBar from '../ProgressBar';
import NotificationComponent from '../Notification';
import { browserHistory } from 'react-router';
import BankAccountApi from '../../api/BankAccountApi';
import 'material-design-lite/material';
import 'dialog-polyfill';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import BreadCrumb from '../BreadCrumb';
import InputCustom from '../InputCustom';
import BankOperationApi from '../../api/BankOperationApi';

class BankDeposit extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    back() {
        browserHistory.push('/cliente/deposito');
    }

    render() {
        return (
            <div className="container">
                <BreadCrumb way={[{ 'name': 'Banco Mais', 'link': '/cliente' },
                { 'name': this.props.bankAccountSelect.bankAgency.bank.name + " " + this.props.bankAccountSelect.number, 'link': '' },
                { 'name': 'Depósito', 'link': '' }]} />
                <div className="table-container mdl-grid" style={{ padding: '0px' }}>
                    <div className="mdl-cell mdl-cell--6-col">
                        <span className="mdl-layout-title">Depósito [ Saldo {this.props.bankAccountSelect.balance}]</span>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <NotificationComponent align="right" store={this.context.store} />
                    </div>

                    <div className="mdl-card mdl-shadow--2dp">
                        <ProgressBar store={this.context.store} />
                        <div className="mdl-card__supporting-text">
                            <div className="mdl-grid">

                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="text" id="valueDeposit"
                                        inputRef={(input) => this.valueDeposit = input} label="Valor do Depósito *"
                                        valueInput={this.valueDeposit}
                                        validators={[]} />
                                </div>
                            </div>
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                            <input type="button" onClick={() => this.props.bankDeposit(this.props.user,
                                this.props.bankAccountSelect, this.valueDeposit.value)}
                            className="mdl-button mdl-button-r mdl-button--primary mdl-js-button mdl-js-ripple-effect"
                             value="Depositar" />
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: typeof state.formUserClient.userClient === 'string' ?
            jwt.verify(state.formUserClient.userClient, 'userClient') : state.formUserClient.userClient,
        bankAccountSelect: state.bankAccountSelect,
        notification : state.notification
    }
};

const mapDispatchToProps = dispatch => {
    return {
        bankDeposit: (user, bankAccount, value) =>{
            dispatch(BankOperationApi.bankDeposit(user, bankAccount, value));
        }
    }
}

BankDeposit.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankDepositContainer = connect(mapStateToProps, mapDispatchToProps)(BankDeposit);

export default BankDepositContainer
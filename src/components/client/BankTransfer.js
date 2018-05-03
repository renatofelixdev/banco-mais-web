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

class BankTransfer extends Component {

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
                { 'name': 'Transferência', 'link': '' }]} />
                <div className="table-container mdl-grid" style={{ padding: '0px' }}>
                    <div className="mdl-cell mdl-cell--6-col">
                        <span className="mdl-layout-title">Transferência [ Saldo {this.props.bankAccountSelect.balance}]</span>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <NotificationComponent align="right" store={this.context.store} />
                    </div>

                    <div className="mdl-card mdl-shadow--2dp">
                        <ProgressBar store={this.context.store} />
                        <div className="mdl-card__supporting-text">
                            <div className="mdl-grid">

                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="text" id="bankTarget"
                                        inputRef={(input) => this.bankTarget = input} label="Código do Banco Destino*"
                                        valueInput={this.bankTarget}
                                        validators={[]} />
                                </div>

                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="text" id="agencyTarget"
                                        inputRef={(input) => this.agencyTarget = input} label="Código da Agência Destino *"
                                        valueInput={this.agencyTarget}
                                        validators={[]} />
                                </div>

                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="text" id="accountTarget"
                                        inputRef={(input) => this.accountTarget = input} label="Número da Conta Destino *"
                                        valueInput={this.accountTarget}
                                        validators={[]} />
                                </div>

                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="text" id="valueDeposit"
                                        inputRef={(input) => this.valueDeposit = input} label="Valor *"
                                        valueInput={this.valueDeposit}
                                        validators={[]} />
                                </div>
                            </div>
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                            <input type="button" onClick={() => this.props.bankTransfer(this.props.user,
                                this.props.bankAccountSelect, this.valueDeposit.value, this.bankTarget.value,
                            this.agencyTarget.value, this.accountTarget.value)}
                            className="mdl-button mdl-button-r mdl-button--primary mdl-js-button mdl-js-ripple-effect"
                             value="Transferir" />
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
        bankTransfer: (user, bankAccount, value, bank, agency, account) =>{
            dispatch(BankOperationApi.bankTransfer(user, bankAccount, value, bank, agency, account));
        }
    }
}

BankTransfer.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankTransferContainer = connect(mapStateToProps, mapDispatchToProps)(BankTransfer);

export default BankTransferContainer
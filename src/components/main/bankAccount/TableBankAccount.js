import React, { Component } from 'react';
import ProgressBar from '../../ProgressBar';
import NotificationComponent from '../../Notification';
import { browserHistory } from 'react-router';
import BankAccountApi from '../../../api/BankAccountApi';
import 'material-design-lite/material';
import 'dialog-polyfill';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class TableBankAccount extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
        this.load();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    load() {
        this.props.listBanksAccounts(this.props.user);
    }

    componentWillReceiveProps(props){
        if(this.props.user === null || this.props.user === '')
            this.props.listBanksAccounts(props.user);
    }

    back(){
        browserHistory.push('/gestao/contas-bancarias');
    }

    tableEmpty(){
        if(this.props.banksAccounts.size === 0){
            return (
                <tr>
                    <td colSpan="4" className="mdl-data-table__cell--non-numeric">
                        {this.props.progressBar === true ? 
                            'Carregando ...' 
                            :
                            'Nenhuma Conta Bancária cadastrada!'
                        } 
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="table-container mdl-grid" style={{padding:'0px'}}>
                <div className="mdl-cell mdl-cell--6-col">
                    <span className="mdl-layout-title">Contas Bancárias</span>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <NotificationComponent align="right" store={this.props.store} />
                </div>               

                <ProgressBar store={this.props.store} />
                <table className="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Cliente</th>
                            <th className="mdl-data-table__cell--non-numeric">Conta</th>
                            <th className="mdl-data-table__cell--non-numeric">Agência</th>
                            <th className="mdl-data-table__cell--non-numeric">Banco</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableEmpty()
                        }
                        {
                            this.props.banksAccounts.map(bankAccount => {
                                return (
                                    <tr key={bankAccount.id}>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAccount.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAccount.id, this.props.user)}>{bankAccount.userClient.name}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAccount.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAccount.id, this.props.user)}>{bankAccount.number}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAccount.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAccount.id, this.props.user)}>{bankAccount.bankAgency.code}</td>  
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAccount.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAccount.id, this.props.user)}>{bankAccount.bankAgency.bank.name}</td>                                        
                                        <td>
                                            <button id={"bank" + bankAccount.id}
                                                className="mdl-button mdl-js-button mdl-button--icon">
                                                <i className="material-icons black">more_vert</i>
                                            </button>

                                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                                htmlFor={"bank" + bankAccount.id}>
                                                <li className="mdl-menu__item" onClick={() => this.props.edit(bankAccount.id, this.props.user)}>Editar</li>
                                                <li className="mdl-menu__item" onClick={() => this.props.alterStatus(bankAccount.id, this.props.user)}>{bankAccount.active ? 'Desativar' : 'Ativar'}</li>
                                                {/* <li className="mdl-menu__item" onClick={() => this.props.remove(bank.id, this.props.user)}>Editar</li> */}
                                            </ul>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { user : state.formUserMaster.user ? jwt.verify(state.formUserMaster.user , 'user') : state.formUserMaster.user,
                progressBar : state.progressBar,
                banksAccounts : state.banksAccounts }
};

const mapDispatchToProps = dispatch => {
    return {
        listBanksAccounts: (user) => {
            if(user !== null && user !== '')
                dispatch(BankAccountApi.listBanksAccounts(user));
        },
        edit: (id, user) => {
            if(user !== null && user !== '')
                dispatch(BankAccountApi.getBankAccount(id,user, '/gestao/contas-bancarias/formulario'));
        },
        alterStatus: (id, user) => {
            if(user !== null && user !== '')
            dispatch(BankAccountApi.alterStatus(id,user));
        }
    }
}

TableBankAccount.contextTypes = {
    store: PropTypes.object.isRequired
}

const TableBankAccountContainer = connect(mapStateToProps, mapDispatchToProps)(TableBankAccount);

export default TableBankAccountContainer
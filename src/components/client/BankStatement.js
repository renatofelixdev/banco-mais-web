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

class BankStatement extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    back(){
        browserHistory.push('/cliente/extratos');
    }

    tableEmpty(){
        if(this.props.banksAccounts.size === 0){
            return (
                <tr>
                    <td colSpan="3" className="mdl-data-table__cell--non-numeric">
                        {this.props.progressBar === true ? 
                            'Carregando ...' 
                            :
                            'Você ainda não tem nenhuma conta bancária!'
                        } 
                    </td>
                </tr>
            );
        }
    }
    
    renderNameBank(bankAccount){
        if(bankAccount.id === this.props.bankAccountSelect.id){
            return (
                <span class="mdl-badge" data-badge="✓">{bankAccount.bankAgency.bank.name} ( {bankAccount.bankAgency.code} )</span>
            );
        }else{
            return (
                <span>{bankAccount.bankAgency.bank.name} ( {bankAccount.bankAgency.code} )</span>
            );
        }
    }

    render() {
        return (
            <div className="container">
            <BreadCrumb way={[{'name':'Banco Mais', 'link':'/cliente'}, 
                                    {'name':'Minhas Contas', 'link':''}]}/>
            <div className="table-container mdl-grid" style={{padding:'0px'}}>
                <div className="mdl-cell mdl-cell--6-col">
                    <span className="mdl-layout-title">Bancos</span>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <NotificationComponent align="right" store={this.context.store} />
                </div>               

                <ProgressBar store={this.context.store} />
                <table className="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Banco (Agência)</th>
                            <th className="mdl-data-table__cell--non-numeric">Conta</th>
                            <th className="mdl-data-table__cell--non-numeric">Saldo</th>
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
                                            onClick={() => this.props.selectBankAccount(bankAccount)}>{this.renderNameBank(bankAccount)}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAccount.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.selectBankAccount(bankAccount)}>{bankAccount.bankAccountTypeDescription} ({bankAccount.number})</td>                                        
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAccount.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.selectBankAccount(bankAccount)}>{bankAccount.balance}</td>                                        
                                        
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { user : typeof state.formUserClient.userClient === 'string' ? 
                        jwt.verify(state.formUserClient.userClient , 'userClient') : state.formUserClient.userClient,
                bankAccountSelect : state.bankAccountSelect }
};

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

BankStatement.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankStatementContainer = connect(mapStateToProps, mapDispatchToProps)(BankStatement);

export default BankStatementContainer
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

class BankStatement extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    back() {
        browserHistory.push('/cliente/extratos');
    }

    componentWillReceiveProps(props){
        console.log(props);
    }

    tableEmpty(){
        if(this.props.bankStatement.size === 0){
            return (
                <tr>
                    <td colSpan="3" className="mdl-data-table__cell--non-numeric">
                        {this.props.progressBar === true ? 
                            'Carregando ...' 
                            :
                            'Neste intervalo não foi realizado nenhuma operação!'
                        } 
                    </td>
                </tr>
            );
        }
    }

    renderTable(bankStatement){
            return (
        <table className="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Data</th>
                            <th className="mdl-data-table__cell--non-numeric">Operação</th>
                            <th className="mdl-data-table__cell--non-numeric">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableEmpty()
                        }
                        {
                            this.props.bankStatement.map(operation => {
                                return (
                                    <tr key={operation.id}>
                                        <td className={"mdl-data-table__cell--non-numeric"}
                                            >{operation.dateFormated}</td>
                                        <td className={"mdl-data-table__cell--non-numeric"}
                                            >{operation.operationDescription}</td>                                        
                                        <td className={"mdl-data-table__cell--non-numeric"}
                                            >{operation.value}</td>                                        
                                        
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            );
        
    }

    render() {
        console.log(this);
        return (
            <div className="container">
                <BreadCrumb way={[{ 'name': 'Banco Mais', 'link': '/cliente' },
                { 'name': this.props.bankAccountSelect.bankAgency.bank.name + " " + this.props.bankAccountSelect.number, 'link': '' },
                { 'name': 'Extrato', 'link': '' }]} />
                <div className="table-container mdl-grid" style={{ padding: '0px' }}>
                    <div className="mdl-cell mdl-cell--6-col">
                        <span className="mdl-layout-title">Extrato [ Saldo {this.props.bankAccountSelect.balance}]</span>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <NotificationComponent align="right" store={this.context.store} />
                    </div>

                    <div className="mdl-card mdl-shadow--2dp">
                        <ProgressBar store={this.context.store} />
                        <div className="mdl-card__supporting-text">
                            <div className="mdl-grid">

                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="date" id="startDate"
                                        inputRef={(input) => this.startDate = input} label="Data Inicial *"
                                        valueInput={this.startDate}
                                        validators={[]} />
                                </div>
                                <div className="mdl-cell mdl-cell--6-col">
                                    <InputCustom type="date" id="endDate"
                                        inputRef={(input) => this.endDate = input} label="Data Final *"
                                        valueInput={this.endDate}
                                        validators={[]} />
                                </div>
                            </div>
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                            <input type="button" onClick={() => this.props.listBankStatement(this.props.user,
                                this.props.bankAccountSelect, this.startDate.value, this.endDate.value)}
                            className="mdl-button mdl-button-r mdl-button--primary mdl-js-button mdl-js-ripple-effect"
                             value="Exibir" />
                        </div>
                    </div>

                    { this.renderTable(this.props.bankStatement)}

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
        notification : state.notification,
        bankStatement : state.bankStatement
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listBankStatement: (user, bankAccount, startDate, endDate) =>{
            dispatch(BankOperationApi.listBankStatement(user, bankAccount, startDate, endDate));
        }
    }
}

BankStatement.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankStatementContainer = connect(mapStateToProps, mapDispatchToProps)(BankStatement);

export default BankStatementContainer
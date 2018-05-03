import React, { Component } from 'react';
import ProgressBar from '../../ProgressBar';
import NotificationComponent from '../../Notification';
import { browserHistory } from 'react-router';
import BankAgencyApi from '../../../api/BankAgencyApi';
import 'material-design-lite/material';
import 'dialog-polyfill';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class TableBankAgency extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
        this.load();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    load() {
        this.props.listBanksAgencies(this.props.user);
    }

    componentWillReceiveProps(props){
        if(this.props.user === null || this.props.user === '')
            this.props.listBanksAgencies(props.user);
    }

    back(){
        browserHistory.push('/gestao/agencias');
    }

    tableEmpty(){
        if(this.props.banksAgencies.size === 0){
            return (
                <tr>
                    <td colSpan="4" className="mdl-data-table__cell--non-numeric">
                        {this.props.progressBar === true ? 
                            'Carregando ...' 
                            :
                            'Nenhuma Agência Bancária cadastrada!'
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
                    <span className="mdl-layout-title">Agências Bancárias</span>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <NotificationComponent align="right" store={this.props.store} />
                </div>               

                <ProgressBar store={this.props.store} />
                <table className="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Banco</th>
                            <th className="mdl-data-table__cell--non-numeric">Agência</th>
                            <th className="mdl-data-table__cell--non-numeric">Código</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableEmpty()
                        }
                        {
                            this.props.banksAgencies.map(bankAgency => {
                                return (
                                    <tr key={bankAgency.id}>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAgency.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAgency.id, this.props.user)}>{bankAgency.bank.name}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAgency.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAgency.id, this.props.user)}>{bankAgency.name}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bankAgency.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(bankAgency.id, this.props.user)}>{bankAgency.code}</td>                                        
                                        <td>
                                            <button id={"bank" + bankAgency.id}
                                                className="mdl-button mdl-js-button mdl-button--icon">
                                                <i className="material-icons black">more_vert</i>
                                            </button>

                                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                                htmlFor={"bank" + bankAgency.id}>
                                                <li className="mdl-menu__item" onClick={() => this.props.edit(bankAgency.id, this.props.user)}>Editar</li>
                                                <li className="mdl-menu__item" onClick={() => this.props.alterStatus(bankAgency.id, this.props.user)}>{bankAgency.active ? 'Desativar' : 'Ativar'}</li>
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
                banksAgencies : state.banksAgencies }
};

const mapDispatchToProps = dispatch => {
    return {
        listBanksAgencies: (user) => {
            if(user !== null && user !== '')
                dispatch(BankAgencyApi.listBanksAgencies(user));
        },
        edit: (id, user) => {
            if(user !== null && user !== '')
                dispatch(BankAgencyApi.getBankAgency(id,user, '/gestao/agencias/formulario'));
        },
        alterStatus: (id, user) => {
            if(user !== null && user !== '')
            dispatch(BankAgencyApi.alterStatus(id,user));
        }
    }
}

TableBankAgency.contextTypes = {
    store: PropTypes.object.isRequired
}

const TableBankAgencyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBankAgency);

export default TableBankAgencyContainer
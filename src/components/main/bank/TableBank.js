import React, { Component } from 'react';
import ProgressBar from '../../ProgressBar';
import NotificationComponent from '../../Notification';
import { browserHistory } from 'react-router';
import BankApi from '../../../api/BankApi';
import 'material-design-lite/material';
import 'dialog-polyfill';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class TableBank extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
        this.load();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    load() {
        this.props.listBanks(this.props.user);
    }

    componentWillReceiveProps(props){
        if(this.props.user === null || this.props.user === '')
            this.props.listBanks(props.user);
    }

    back(){
        browserHistory.push('/gestao/bancos');
    }

    tableEmpty(){
        if(this.props.banks.size === 0){
            return (
                <tr>
                    <td colSpan="5" className="mdl-data-table__cell--non-numeric">
                        {this.props.progressBar === true ? 
                            'Carregando ...' 
                            :
                            'Nenhum Banco cadastrado!'
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
                    <span className="mdl-layout-title">Bancos</span>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <NotificationComponent align="right" store={this.props.store} />
                </div>               

                <ProgressBar store={this.props.store} />
                <table className="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Banco</th>
                            <th className="mdl-data-table__cell--non-numeric">Código</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableEmpty()
                        }
                        {
                            this.props.banks.map(bank => {
                                return (
                                    <tr key={bank.id}>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bank.active ? '' : 'bank-disabled')}
                                            onClick={() => this.props.info(bank.id, this.props.user)}>{bank.name}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (bank.active ? '' : 'bank-disabled')}
                                            onClick={() => this.props.info(bank.id, this.props.user)}>{bank.code}</td>                                        
                                        <td>
                                            <button id={"bank" + bank.id}
                                                className="mdl-button mdl-js-button mdl-button--icon">
                                                <i className="material-icons black">more_vert</i>
                                            </button>

                                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                                htmlFor={"bank" + bank.id}>
                                                <li className="mdl-menu__item" onClick={() => this.props.edit(bank.id, this.props.user)}>Editar</li>
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
            banks : state.banks }
};

const mapDispatchToProps = dispatch => {
    return {
        listBanks: (user) => {
            if(user !== null && user !== '')
                dispatch(BankApi.listBanks(user));
        },
        edit: (id, user) => {
            if(user !== null)
                dispatch(BankApi.getBank(id,user, '/gestao/bancos/formulario'));
        }
    }
}

TableBank.contextTypes = {
    store: PropTypes.object.isRequired
}

const TableBankContainer = connect(mapStateToProps, mapDispatchToProps)(TableBank);

export default TableBankContainer
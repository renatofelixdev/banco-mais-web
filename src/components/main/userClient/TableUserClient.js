import React, { Component } from 'react';
import ProgressBar from '../../ProgressBar';
import NotificationComponent from '../../Notification';
import { browserHistory } from 'react-router';
import UserClientApi from '../../../api/UserClientApi';
import 'material-design-lite/material';
import 'dialog-polyfill';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class TableUserClient extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
        this.load();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    load() {
        this.props.listUsersClient(this.props.user);
    }

    componentWillReceiveProps(props){
        if(this.props.user === null || this.props.user === '')
            this.props.listUsersClient(props.user);
    }

    back(){
        browserHistory.push('/gestao/clientes');
    }

    tableEmpty(){
        if(this.props.usersClient.size === 0){
            return (
                <tr>
                    <td colSpan="3" className="mdl-data-table__cell--non-numeric">
                        {this.props.progressBar === true ? 
                            'Carregando ...' 
                            :
                            'Nenhum Cliente cadastrado!'
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
                    <span className="mdl-layout-title">Clientes</span> 
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <NotificationComponent align="right" store={this.props.store} />
                </div>               

                <ProgressBar store={this.props.store} />
                <table className="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Nome</th>
                            <th className="mdl-data-table__cell--non-numeric">CPF</th>
                            <th className="mdl-data-table__cell--non-numeric">Endereço</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableEmpty()
                        }
                        {
                            this.props.usersClient.map(userClient => {
                                return (
                                    <tr key={userClient.id}>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (userClient.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(userClient.id, this.props.user)}>{userClient.name}</td>
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (userClient.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(userClient.id, this.props.user)}>{userClient.cpf}</td>    
                                        <td className={"mdl-data-table__cell--non-numeric cell-click " + (userClient.active ? '' : 'row-disabled')}
                                            onClick={() => this.props.info(userClient.id, this.props.user)}>{userClient.address}</td>                                       
                                        <td>
                                            <button id={"userClient" + userClient.id}
                                                className="mdl-button mdl-js-button mdl-button--icon">
                                                <i className="material-icons black">more_vert</i>
                                            </button>

                                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                                htmlFor={"userClient" + userClient.id}>
                                                <li className="mdl-menu__item" onClick={() => this.props.edit(userClient.id, this.props.user)}>Editar</li>
                                                <li className="mdl-menu__item" onClick={() => this.props.alterStatus(userClient.id, this.props.user)}>{userClient.active ? 'Desativar' : 'Ativar'}</li>
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
                usersClient : state.usersClient }
};

const mapDispatchToProps = dispatch => {
    return {
        listUsersClient: (user) => {
            if(user !== null && user !== '')
                dispatch(UserClientApi.listUsersClient(user));
        },
        edit: (id, user) => {
            if(user !== null && user !== '')
                dispatch(UserClientApi.getUserClient(id,user, '/gestao/clientes/formulario'));
        },
        alterStatus: (id, user) => {
            if(user !== null && user !== '')
            dispatch(UserClientApi.alterStatus(id,user));
        }
    }
}

TableUserClient.contextTypes = {
    store: PropTypes.object.isRequired
}

const TableUserClientContainer = connect(mapStateToProps, mapDispatchToProps)(TableUserClient);

export default TableUserClientContainer
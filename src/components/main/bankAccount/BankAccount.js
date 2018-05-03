import React, { Component } from 'react';
import Table from './TableBankAccount';
import ButtonFloat from '../../ButtonFloat';
import { connect } from 'react-redux';
import BankAccountApi from '../../../api/BankAccountApi';
import PropTypes from 'prop-types';
import {browserHistory} from  'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';

class BankAccount extends Component{

    openForm(){
        this.props.newBankAccount();
        browserHistory.push('/gestao/contas-bancarias/formulario');
    }

    componentDidMount(){
        window.componentHandler.upgradeDom();
    }

    render(){
        return(
            <div className="container">
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Contas Bancárias', 'link':''}]}/>
                <Table store={this.context.store} />
                <ButtonFloat action={this.openForm.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { }
};

const mapDispatchToProps = dispatch => {
    return {
        newBankAccount: () => {
            dispatch(BankAccountApi.newBankAccount());
        }
    }
}

BankAccount.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankAccountContainer = connect(mapStateToProps, mapDispatchToProps)(BankAccount);

export default BankAccountContainer
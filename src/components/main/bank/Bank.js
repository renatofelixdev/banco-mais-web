import React, { Component } from 'react';
import Table from './TableBank';
import ButtonFloat from '../../ButtonFloat';
import { connect } from 'react-redux';
import BankApi from '../../../api/BankApi';
import PropTypes from 'prop-types';
import {browserHistory} from  'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';

class Bank extends Component{

    openForm(){
        this.props.newBank();
        browserHistory.push('/gestao/bancos/formulario');
    }

    componentDidMount(){
        window.componentHandler.upgradeDom();
    }

    render(){
        return(
            <div className="container">
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Bancos', 'link':''}]}/>
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
        newBank: () => {
            dispatch(BankApi.newBank());
        }
    }
}

Bank.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankContainer = connect(mapStateToProps, mapDispatchToProps)(Bank);

export default BankContainer
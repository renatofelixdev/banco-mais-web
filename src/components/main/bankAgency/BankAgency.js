import React, { Component } from 'react';
import Table from './TableBankAgency';
import ButtonFloat from '../../ButtonFloat';
import { connect } from 'react-redux';
import BankAgencyApi from '../../../api/BankAgencyApi';
import PropTypes from 'prop-types';
import {browserHistory} from  'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';

class BankAgency extends Component{

    openForm(){
        this.props.newBankAgency();
        browserHistory.push('/gestao/agencias/formulario');
    }

    componentDidMount(){
        window.componentHandler.upgradeDom();
    }

    render(){
        return(
            <div className="container">
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Agências', 'link':''}]}/>
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
        newBankAgency: () => {
            dispatch(BankAgencyApi.newBankAgency());
        }
    }
}

BankAgency.contextTypes = {
    store: PropTypes.object.isRequired
}

const BankAgencyContainer = connect(mapStateToProps, mapDispatchToProps)(BankAgency);

export default BankAgencyContainer
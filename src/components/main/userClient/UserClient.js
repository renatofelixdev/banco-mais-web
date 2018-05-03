import React, { Component } from 'react';
import Table from './TableUserClient';
import ButtonFloat from '../../ButtonFloat';
import { connect } from 'react-redux';
import UserClientApi from '../../../api/UserClientApi';
import PropTypes from 'prop-types';
import {browserHistory} from  'react-router';
import 'material-design-lite/material';
import BreadCrumb from '../../BreadCrumb';

class UserClient extends Component{

    openForm(){
        this.props.newUserClient();
        browserHistory.push('/gestao/clientes/formulario');
    }

    componentDidMount(){
        window.componentHandler.upgradeDom();
    }

    render(){
        return(
            <div className="container">
                <BreadCrumb way={[{'name':'Banco Mais', 'link':'/gestao'}, 
                                    {'name':'Clientes', 'link':''}]}/>
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
        newUserClient: () => {
            dispatch(UserClientApi.newUserClient());
        }
    }
}

UserClient.contextTypes = {
    store: PropTypes.object.isRequired
}

const UserClientContainer = connect(mapStateToProps, mapDispatchToProps)(UserClient);

export default UserClientContainer
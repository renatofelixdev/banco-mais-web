import React, { Component } from 'react';
import '../../css/components/menu.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

class Menu extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }

    render(){
        return (
            <div className="components-menu-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header className="drawer-header"> 
                   
                    <img src='https://getmdl.io/templates/dashboard/images/user.jpg' className="avatar" alt="Usuário"/>
                   
                    <div className="avatar-dropdown" style={{marginTop:'15px'}}>
                        <p>
                            {this.props.user.name}
                        </p>
                    </div>
                </header>
                <nav className="navigation mdl-navigation mdl-color--blue-grey-800">
                        {/* <a className="mdl-navigation__link" href="#contribuicoes"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">record_voice_over</i><span className="contrib-menu-text contrib-url-contribuicoes">Contribuições</span></a> */}
                        <Link className="mdl-navigation__link" to="/cliente/minhas-contas"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">description</i><span className="contrib-menu-text contrib-url-noticias">Minhas Contas</span></Link>
                        <Link className="mdl-navigation__link" to="/cliente/extratos"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">record_voice_over</i><span className="contrib-menu-text contrib-url-noticias">Extratos</span></Link>
                        <Link className="mdl-navigation__link" to="/cliente/transferencias"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">layers</i><span className="contrib-menu-text">Transferências</span></Link>
                        <Link className="mdl-navigation__link" to="/cliente/saque"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i><span className="contrib-menu-text">Saque</span></Link>
                        <Link className="mdl-navigation__link" to="/cliente/deposito"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i><span className="contrib-menu-text">Depósito</span></Link>
                </nav>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user : typeof state.formUserClient.userClient === 'string' ? jwt.verify(state.formUserClient.userClient , 'userClient') : state.formUserClient.userClient,
            notification : state.formUserClient.notification
    }
};

const mapDispatchToProps = dispatch => {
    return {  }
}

Menu.contextTypes = {
    store: PropTypes.object.isRequired
}


const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer
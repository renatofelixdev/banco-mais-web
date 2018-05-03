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
                   
                    <div className="avatar-dropdown">
                        <span>
                            {this.props.user.login}
                        </span>
                        <div className="mdl-layout-spacer"></div>
                    </div>
                </header>
                <nav className="navigation mdl-navigation mdl-color--blue-grey-800">
                        {/* <a className="mdl-navigation__link" href="#contribuicoes"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">record_voice_over</i><span className="contrib-menu-text contrib-url-contribuicoes">Contribuições</span></a> */}
                        <Link className="mdl-navigation__link" to="/gestao/bancos"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">description</i><span className="contrib-menu-text contrib-url-noticias">Bancos</span></Link>
                        <Link className="mdl-navigation__link" to="/gestao/agencias"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">record_voice_over</i><span className="contrib-menu-text contrib-url-noticias">Agências</span></Link>
                        <Link className="mdl-navigation__link" to="/gestao/contas-bancarias"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">layers</i><span className="contrib-menu-text">Contas</span></Link>
                        <Link className="mdl-navigation__link" to="/gestao/clientes"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i><span className="contrib-menu-text">Usuários</span></Link>
                </nav>
            </div>
        );
    }
}


const mapStateToProps = state => {
    
    return {
        user : state.formUserMaster.user ? jwt.verify(state.formUserMaster.user , 'user') : state.formUserMaster.user,
            notification : state.formUserMaster.notification
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
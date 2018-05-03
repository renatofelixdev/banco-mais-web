import React, { Component } from 'react';
import '../../css/components/header.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {

    render() {
        return (
            <header className="components-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title header-title">Banco Mais </span>
                    <div className="mdl-layout-spacer"></div>
                    
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                        <i className="material-icons">more_vert</i>
                    </button>
                    <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
                        <Link to="/gestao/sair"><li className="mdl-menu__item"> Sair</li></Link>
                    </ul>
                </div>
            </header>
        );
    }
}


const mapStateToProps = state => {
    return {
            user : state.formUserMaster.user,
            notification : state.formUserMaster.notification
    }
};

const mapDispatchToProps = dispatch => {
    return {  }
}

Header.contextTypes = {
    store: PropTypes.object.isRequired
}


const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer
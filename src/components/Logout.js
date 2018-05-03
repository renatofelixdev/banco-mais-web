import { Component } from 'react';

export default class Logout extends Component {

    componentWillMount(){
        localStorage.clear();
        window.location.href= "/";
    }

    render(){
        return null;
    }
}
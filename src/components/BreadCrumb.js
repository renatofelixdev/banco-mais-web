import React, { Component } from 'react';
import '../css/breadcrumb.css';
import {Link} from 'react-router';

export default class BreadCrumb extends Component{
    
    render(){
        return(
            <div style={{width:'100%'}}>
            <div className="breadcrumb mdl-cell--hide-phone  mdl-cell--hide-tablet">
            
                {
                    this.props.way.map((way, index) => {
                        if(index > 0)
                            return (
                                <Link key={index} className="breadcrumb__step breadcrumb__step--active" to={way.link}>
                                    {way.name}
                                </Link>
                            )
                        else
                            return (
                                <Link key={index} className="breadcrumb__step" to={way.link}>
                                    {way.name}
                                </Link>
                            )
                    })
                }
            </div>
            </div>
        );
    }

}
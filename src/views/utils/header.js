import React,{Component} from 'react';

export default class Header extends Component{
    render(){
        return(
        <div className="Header-style-container pl-30 pr-30 parent-row parent-v-center">
            <div className="header-logo">
                <img src="/img/converter.png" height="60px" width="70px" alt="logo"/>
            </div>
            <div className="header-name ml-15 font-size-22">
                Currency-Changer
            </div>
        </div>
        )
    }
}
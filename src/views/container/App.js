import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';
import {Routes} from '../config/routes';
import Header from '../utils/header';
import CurrencyInfo from '../dashboard/about-currency';
import Dashboard from '../dashboard/dashboard';

export default class App extends Component{
  render(){
    return(
        <div className="App">
            <Header {...this.props}/>
            <div className="mt-95 pl-25 pr-25">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"/>
                        <div className="col-md-8">
                            <Router>
                                <Switch>
                                    <Route exact path={Routes.Dashboard} component={Dashboard}/>
                                    <Route path={Routes.History} component={CurrencyInfo}/>
                                </Switch>
                            </Router>
                        </div>
                        <div className="col-md-2"/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

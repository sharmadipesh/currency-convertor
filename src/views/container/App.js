import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Header from '../utils/header';
import {Routes} from '../config/routes';

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
                                <Route path={Routes.Dashboard} component={Dashboard}/>
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



{/* <Router>
  <Route path={Routes.Dashboard} component={Dashboard}/>
</Router> */}
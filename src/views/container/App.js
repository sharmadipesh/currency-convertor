import React,{Component} from 'react';
import Dashboard from '../dashboard/dashboard';
import Header from '../utils/header';

export default class App extends Component{
  render(){
    return(
      <div className="App">
        <Header {...this.props}/>
        <Dashboard {...this.props}/>
      </div>
    )
  }
}



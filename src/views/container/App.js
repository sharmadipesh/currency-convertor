import React,{Component} from 'react';
import Dashboard from '../dashboard/dashboard';
import Header from '../utils/header';

export default class App extends Component{
  render(){
    return(
      <div className="App">
        <Header {...this.props}/>
        <div className="mt-95 pl-25 pr-25">
          <Dashboard {...this.props}/>
        </div>
      </div>
    )
  }
}



import React,{Component} from 'react';
import Card from '../utils/card';

export default class Dashboard extends Component{
    render(){
        return(<div className="container">
            <div className="row">
                <div className="col-md-2"/>
                <div className="col-md-8">
                    <Card maxWidth="800px">
                        <div>
                            
                        </div>
                    </Card>
                </div>
                <div className="col-md-2"/>
            </div>
        </div>)
    }
}

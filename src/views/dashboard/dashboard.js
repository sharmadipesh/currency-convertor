import React,{Component} from 'react';
// import idx from 'idx';
import Card from '../utils/card';
// import {API_URL} from '../config/api-url';
import axios from 'axios';

export default class Dashboard extends Component{

    state={
        currencyList:null,
        activeCurrency:null
    }

    getCurrencyList = api => {
        axios.get(api)
            .then( response => {
            if(response.data){
                let {rates} = response.data;
                this.setState({
                    currencyList:rates,
                    activeCurrency:response.data.base
                })
            }
        })
    };

    componentDidMount = async() =>{
        await this.getCurrencyList(`https://api.exchangeratesapi.io/latest?base=USD`);
    }

    currencyHadndler = async(e) =>{
        await this.getCurrencyList(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`);
    }

    render(){
        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"/>
                <div className="col-md-8">
                    <div className="row mb-50">
                        <div className="col-12">
                            <Card className="p-25">
                                <div className="form-group">
                                    <label htmlFor="currencyData">Select Currency</label>
                                    <select className="form-control" id="currencyData" onChange={this.currencyHadndler} value={this.state.activeCurrency}>
                                        {this.state.currencyList && 
                                            Object.keys(this.state.currencyList).map((value,index)=>
                                            <option key={index} value={value}>{value}</option>
                                        )}
                                    </select>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.currencyList  && 
                            Object.entries(this.state.currencyList).map((currency,index) =>   
                            <div className="col-3" key={index}>
                                <Card className="p-25 currency-card-list d-flex flex-column align-items-center mb-20">
                                    <div className="mb-10 card-header font-size-22">{currency[0]}</div>
                                    <div className="currency-price">{currency[1]}</div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-2"/>
            </div>
        </div>)
    }
}

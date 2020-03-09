import React,{Component} from 'react';
import Card from '../utils/card';
import axios from 'axios';
import {Routes} from '../config/routes';

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

    currencyInfo = (currencySymbol) =>{
        this.props.history.push(`/${this.state.activeCurrency}-${currencySymbol}`);
    }

    render(){
        return(
        <div>
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
                    <div className="col-3" key={index} onClick={()=>this.currencyInfo(currency[0])}>
                        <Card className="p-25 clickable currency-card-list d-flex flex-column align-items-center mb-20">
                            <div className="mb-10 card-header font-size-22">{currency[0]}</div>
                            <div className="currency-price">{currency[1]}</div>
                        </Card>
                    </div>
                )}
            </div>
        </div>)
    }
}
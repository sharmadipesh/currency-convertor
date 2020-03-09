import React,{Component} from 'react';
import axios from 'axios';
import Card from '../utils/card';
import idx from 'idx';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import moment from 'moment';

export default class CurrencyInfo extends Component{

    state={
        currencyInfo:null,
        date:[new Date(), new Date()],
        base:null,
        currencyHistory:null
    }

    getCurrencyHistoricInfo = api => {
        axios.get(api)
            .then( response => {
            if(response.data){
                let data=[];
                Object.keys(response.data.rates).map(name=>{
                    let values = {name}
                    data.push(values);
                })
                Object.values(response.data.rates).map((currency,index)=>{
                    data[index]={...data[index],currency};
                })
                this.setState({
                    currencyInfo:data
                })
            }
        })
    };

    getCurrencyRangeInfo=(api)=>{
        axios.get(api)
            .then( response => {
            if(response.data){
                let ratesContainer=[];
                Object.keys(response.data.rates).map(value=>{
                    let date = {date:value};
                    ratesContainer.push(date);
                });
                Object.values(response.data.rates).map((currency,index)=>{
                    ratesContainer[index]={...ratesContainer[index],currency};    
                })
                
                let newD = []
                Object.values(ratesContainer).map((v,i)=>{
                    let d = {Date:v['date'],...v['currency']}
                    newD.push(d);
                })
                this.setState({
                    currencyHistory:newD
                })
            }
        })
    }

    componentDidMount = () => {
        let pathname = idx(this.props.location,_=>_.pathname);
        let removeForward = pathname.replace('/','');
        let currencyInfopath = removeForward.split('-');
        this.getCurrencyHistoricInfo(`https://api.exchangeratesapi.io/latest?base=${currencyInfopath[0]}&symbols=${currencyInfopath[0]},${currencyInfopath[1]}`);
        this.getCurrencyRangeInfo(`https://api.exchangeratesapi.io/history?start_at=${moment().subtract(30, 'days').format('YYYY-MM-DD') }&end_at=${moment().format('YYYY-MM-DD')}&base=${currencyInfopath[0]}`);
        this.setState({
            base:currencyInfopath[0]
        })
    }

    rangeDateHandler = date => {
        let fromDate,toDate;
        if(date!= null){
            fromDate = moment(date[0]).format('YYYY-MM-DD');
            toDate = moment(date[1]).format('YYYY-MM-DD');
        }
        if(fromDate != null && toDate!= null){
            this.getCurrencyRangeInfo(`https://api.exchangeratesapi.io/history?start_at=${fromDate}&end_at=${toDate}&base=${this.state.base}`);
        }
    }


    render(){
        return(<div>
            <div className="row mb-20">
                <div className="col-md-6">
                    <div className="font-size-22 page-title">Currency information</div>
                </div>
            </div>
            <div className="row mb-20">
                <div className="col-md-4">
                    <Card className="p-25 clickable currency-card-list d-flex flex-column align-items-center mb-20">
                        <div className="mb-10 card-header font-size-22">{idx(this.state.currencyInfo,_=>_[0]['name'])}</div>
                        <div className="currency-price">{idx(this.state.currencyInfo,_=>_[0]['currency'])}</div>
                    </Card>
                </div>
                <div className="col-md-4 align-items-center d-flex flex-column justify-content-center">
                        <img alt="exchange-img" src="/img/transfer.png" height="45px" width="50px"/>
                </div>
                <div className="col-md-4">
                    <Card className="p-25 clickable currency-card-list d-flex flex-column align-items-center mb-20">
                        <div className="mb-10 card-header font-size-22">{idx(this.state.currencyInfo,_=>_[1]['name'])}</div>
                        <div className="currency-price">{idx(this.state.currencyInfo,_=>_[1]['currency'])}</div>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Card className="p-25">
                        <div className="form-group">
                            <DateRangePicker
                                onChange={this.rangeDateHandler}
                                value={this.state.date}
                                // className='form-control'
                                calendarClassName="form-control"
                            />
                        </div>
                        <div className="mt-20">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {this.state.currencyHistory && this.state.currencyHistory.map((value,index)=>{
                                                if(index === 0){
                                                    return  Object.keys(value).map((v,i)=>{
                                                        return (<th className="col" key={i}>{v}</th>);
                                                })}
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.currencyHistory && this.state.currencyHistory.map((value,index)=>{
                                            return  (<tr key={index}>
                                                {Object.values(value).map((v,i)=>{
                                                    return (<td className="col font-size-14" key={i}>{v}</td>);
                                                })}</tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

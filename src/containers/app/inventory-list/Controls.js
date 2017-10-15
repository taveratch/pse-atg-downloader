import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';
import DownloadImg from 'src/assets/images/download-white.svg';
import service from 'src/js/service';
import InputWithLabel from 'src/containers/app/InputWithLabel';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const style = {
    buttonStyle: {
        height: 38,
        padding: '.3rem 1rem'
    }
};
class Controls extends React.Component {

    constructor(props) {
        super(props);
        this.downloadTypes = ['Every', 'Hourly', 'Daily'];
        this.minDate = moment(_.first(props.inventories).date);
        this.maxDate = moment(_.last(props.inventories).date);
        this.state = {
            downloadType: 0,
            startDate: moment(_.first(props.inventories).date),
            endDate: moment(_.last(props.inventories).date)
        };

    }

    changeDownloadType(type) {
        this.setState({
            downloadType: type
        });
    }

    downloadAll() {
        $('.loading-spin').removeClass('hidden');
        service.downloadAllInventories(this.props.inventories, undefined, this.state);
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });
    }
    
    render() {
        return (
            <div className='d-flex align-items-end'>
                <button style={style.buttonStyle} className="btn btn-second align-self-end" onClick={this.downloadAll.bind(this)}>
                    Download all
                    <img className='ml-2' src={DownloadImg} alt="" />
                </button>
                <div className="ml-4 dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.downloadTypes[this.state.downloadType]}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {
                            this.downloadTypes.map((type, i) => <span key={i} className='dropdown-item' onClick={this.changeDownloadType.bind(this, i)}>{type}</span>)
                        }
                    </div>
                </div>
                <div className='ml-4'>
                    <div>
                        <span>From</span>
                        <DatePicker minDate={this.minDate} maxDate={this.maxDate} dateFormat='DD/MM/YYYY' className='form-control' selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)} />
                    </div>
                </div>

                <div className='ml-4'>
                    <div>
                        <span>To</span>
                        <DatePicker minDate={this.minDate} maxDate={this.maxDate} dateFormat='DD/MM/YYYY' className='form-control' selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Controls;
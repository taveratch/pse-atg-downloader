import React from 'react';
import { Well, Label, Row, Col, Button, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import vm from './viewmodel';
import write from 'write';
import $ from 'jquery';
import _ from 'lodash';
import service from 'src/js/service';
export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        /* binding functions */
        this.dispatch = this.dispatch.bind(this);
        this.read = this.read.bind(this);
        /* set initial state */
        this.state = vm({}, { type: 'init' });
    }
    dispatch(action) {
        this.setState(vm(this.state, action));
    }
    read() {
        let url = $('#url')[0].value;
        service.getInventoryList(url)
            .then((res) => {
                this.dispatch({ type: 'load_inventory', data: res, url: service.urlValidator(url) });
            })
            .catch((err) => {
                this.dispatch({ type: 'error' });
            });
    }

    download(url) {
        service.downloadInventory(url);
    }

    downloadAll() {
        this.dispatch({ type: 'start_downloading_all_inventory' });
        service.downloadAllInventories(this.state.inventories, this.dispatch);
    }

    onCheckboxChange(event) {
        let checked = event.target.checked;
        this.dispatch({ type: 'to_local', data: checked });
        service.enableProxy(checked);
    }

    renderProgressbar(name) {
        if (this.state.downloadedInventories.indexOf(name) < 0 && this.state.downloading)
            return (
                <div>
                    <div className="progress">
                        <div className="progress-bar bg-info progress-bar-striped progress-bar-animated"
                            id={`progress-${name}`} role="progressbar"
                            ariaValuenow="100"
                            style={{width: '100%'}}
                            ariaValuemin="0"
                            ariaValuemax="100">Downloading...</div>
                    </div>
                </div>
            );
        else if (this.state.downloadedInventories.indexOf(name) >= 0 && this.state.downloading)
            return (
                <div>
                    <div className="progress">
                        <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                            id={`progress-${name}`} role="progressbar"
                            ariaValuenow="100"
                            ariaValuemin="0"
                            style={{width: '100%'}}
                            ariaValuemax="100">Downloaded</div>
                    </div>
                </div>
            );
    }

    render() {
        let errorView;
        let self = this;
        if (this.state.error) {
            let url = $('#url')[0].value;
            errorView =
                <div>
                    <Label bsStyle="danger">Url is incorrect.</Label>
                    <p className="margin-top">Please insert a correct url with port</p>
                </div>;
        }
        return (
            <div className='d-flex align-items-center justify-content-center h-100 bg-info'>
                <div className='col-md-10 col-lg-10 col-sm-10 col-11 box-shadow-heavy bg-faded p-4' style={{ height: '85%', overflow: 'auto', background: 'white' }}>
                    <h5>Inventory Downloader</h5>
                    <div className="d-md-flex d-lg-flex margin-bottom">
                        <input id="url" className="form-control mt-2" placeholder="http://sysinto999.true.in.th:7878" />
                        <div className='d-flex mt-2'>
                            <div className="checkbox-container">
                                <input type="checkbox" onChange={this.onCheckboxChange.bind(this)} /><span>LAN</span>
                            </div>
                            <button className="btn btn-second margin-left" onClick={this.read}>Read</button>
                            <button className="btn btn-second margin-left" disabled={this.state.downloadAllButtonDisabled} onClick={this.downloadAll.bind(this)}>Download all</button>
                        </div>
                    </div>
                    {errorView}
                    <ul className="list-group">
                        {
                            _.map(this.state.inventories, (item, i) => {
                                return <ul className="list-group-item">
                                    {item.name}
                                    <div className="pull-right pull-top full-height flex flex-center flex-middle margin-right">
                                        {self.renderProgressbar(item.name)}
                                        <a href={vm.insertHeader(item.url)} download >Download</a>
                                    </div>
                                </ul>;
                            })
                        }
                    </ul>
                </div>
                {/* <footer className="footer">
                    <div className="container">
                        <p className="text-muted">This software is a property of Padungsilpa Group.<br></br>© Copyright 2017 PADUNGSILPA GROUP All right reserved.</p>
                    </div>
                </footer> */}
            </div>
        );
    }
}

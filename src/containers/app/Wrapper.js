import React from 'react';
import { Well, Label, Row, Col, Button, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import cookie from 'js-cookie';
import vm from 'src/containers/app/viewmodel';
import write from 'write';
import $ from 'jquery';
import _ from 'lodash';
import Link from 'src/containers/app/Link';
import InputWithLabel from 'src/containers/app/InputWithLabel';
import InventoryList from 'src/containers/app/inventory-list/InventoryList';
import ErrorMessage from 'src/containers/app/ErrorMessage';
import service from 'src/js/service';


const style = {
    urlInputStyle: {
        flex: 1
    }
};

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
                cookie.set('url', url);
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

    renderProgressbar(name) {
        if (this.state.downloadedInventories.indexOf(name) < 0 && this.state.downloading)
            return (
                <div>
                    <div className="progress">
                        <div className="progress-bar bg-info progress-bar-striped progress-bar-animated"
                            id={`progress-${name}`} role="progressbar"
                            ariaValuenow="100"
                            style={{ width: '100%' }}
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
                            style={{ width: '100%' }}
                            ariaValuemax="100">Downloaded</div>
                    </div>
                </div>
            );
    }

    render() {
        return (
            <div className='p-5 d-flex flex-column' style={{minHeight: '100vh'}}>
                <h1><b>Search</b></h1>
                <div className='d-flex'>
                    <InputWithLabel elementId='url' style={style.urlInputStyle} text={cookie.get('url') || ''} label='Url' />
                    <div className='d-flex'>
                        <button className="btn btn-second margin-left align-self-end" onClick={this.read}>Read</button>
                    </div>
                </div>
                {this.state.error && <ErrorMessage />}
                <br />
                {this.state.inventories.length !== 0 && <InventoryList inventories={this.state.inventories} />}
                <footer className="footer mt-auto">
                    <div className="container">
                        <span>
                            This software is a property of Padungsilpa Group.<br></br>© Copyright 2017 PADUNGSILPA GROUP All right reserved.
                        </span>
                    </div>
                </footer>
            </div>
        );
    }
}

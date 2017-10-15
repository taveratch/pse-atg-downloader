import React from 'react';
import $ from 'jquery';

import DownloadImg from 'src/assets/images/download.svg';
import { downloadInventory } from 'src/js/service';

const style = {
    container: {
        border: '1px solid #47C1BF',
        borderRadius: 5,
        width: 60,
        height: 30,
        cursor: 'pointer'
    }
};
class DownloadButton extends React.Component {


    download(fileName, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    onClick() {
        let { url, name } = this.props;
        $(`#loading-${name.replace('.','')}`).removeClass('hidden');
        downloadInventory(url, { useHeader: true })
            .then(res => {
                $(`#loading-${name.replace('.','')}`).addClass('hidden');
                this.download(name, res);
            });
    }

    render() {
        return (
            <div style={style.container} className='d-flex justify-content-center align-items-center' onClick={this.onClick.bind(this)}>
                <img src={DownloadImg} alt="" />
            </div>
        );
    }
}

export default DownloadButton;
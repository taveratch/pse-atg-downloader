import React from 'react';
import DownloadImg from 'src/assets/images/download-white.svg';

const style = {
    buttonStyle: {
        height: 38,
        padding: '.3rem 1rem'
    }
};
class Controls extends React.Component {

    constructor(props) {
        super(props);
        this.downloadTypes = ['Hourly', 'Daily'];
        this.state = {
            downloadType: 0
        };
    }

    changeDownloadType(type) {
        this.setState({
            downloadType: type
        });
    }

    render() {
        return (
            <div className='d-flex'>
                <button style={style.buttonStyle} className="btn btn-second align-self-end" onClick={this.read}>
                    Download all
                    <img className='ml-2' src={DownloadImg} alt="" />
                </button>
                <div className="ml-4 dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.downloadTypes[this.state.downloadType]}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {
                            this.downloadTypes.map((type, i) => <span className='dropdown-item' onClick={this.changeDownloadType.bind(this, i)}>{type}</span>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Controls;
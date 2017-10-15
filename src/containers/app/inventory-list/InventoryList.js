import React from 'react';
import ReactLoading from 'react-loading';

import DownloadButton from 'src/containers/app/inventory-list/DownloadButton';
import Controls from './Controls';

const headers = ['Date', 'Download'];

const style = {
    thead: {
        background: '#F7F7F7'
    }
};
class InventoryList extends React.Component {
    render() {
        let { inventories } = this.props;
        return (
            <div>
                <h1><b>Inventory</b></h1>
                <Controls inventories={inventories} />
                <br />
                <table className='w-100'>
                    <thead style={style.thead}>
                        <tr className='pt-4 pb-4'>
                            <th className='text-right pr-5'>Date</th>
                            <th className='pl-5'>Download</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventories.map((inventory, i) => (
                                <tr>
                                    <td className='text-right pr-5'>{inventory.dateStr}</td>
                                    <td className='pl-5'>
                                        <div className='d-flex'>
                                            <DownloadButton url={inventory.url} name={inventory.name} />
                                            <div style={{flex: 1}} id={`loading-${inventory.name.replace('.','')}`} className='loading-spin hidden d-flex justify-content-end align-items-center pr-5'>
                                                <ReactLoading type='spin' width={24} height={24} color='#007ACE' />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InventoryList;
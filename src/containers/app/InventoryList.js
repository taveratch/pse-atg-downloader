import React from 'react';
import DownloadButton from 'src/containers/app/DownloadButton';

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
                <table className='w-100'>
                    <thead style={style.thead}>
                        <tr className='pt-4 pb-4'>
                            <th className='text-right pr-5'>Date</th>
                            <th className='pl-5'>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventories.map((inventory, i) => (
                                <tr>
                                    <td className='text-right pr-5'>{inventory.dateStr}</td>
                                    <td className='pl-5'><DownloadButton url={inventory.url} name={inventory.name} /></td>
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
import React from 'react';

const style = {
    height: 70,
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.00), 0 5px 10px 0 rgba(0, 0, 0, 0.05)'
};

export default props => {
    return (
        <div style={style} className='d-flex align-items-center pl-4 text-info'>
            {props.title.toUpperCase()}
        </div>
    );
};
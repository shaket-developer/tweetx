import React from 'react';

function Spinner(props) {
    const bouncercolor = props.color ? props.color : 'bg-white';
    return (
        <div className="spinner">
            <div className={`bounce1 ${bouncercolor}`}></div>
            <div className={`bounce2 ${bouncercolor}`}></div>
            <div className={`bounce3 ${bouncercolor}`}></div>
        </div>
    )
}

export default Spinner;
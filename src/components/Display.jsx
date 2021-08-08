import React from 'react';
import './Display.css';

export default props =>{
    return(
        <div className="display">
            <p>{props.valueOld}</p>
            <p className="mainValue">{props.value}</p>
            </div>
    )
}
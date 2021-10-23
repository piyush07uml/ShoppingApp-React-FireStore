import React from 'react';
// import spinner from './spinner.gif';
import spinner from './transparent-gif-spinner-2-original.gif';



const Spinner = (props) => {
    return (
        <div>
            <img src={spinner} alt="spinner" style={{ width: '150px', margin: 'auto', display: 'block', color: "#EAF0F1", marginTop: '220px' }} />
        </div>
    )
}

export default Spinner;
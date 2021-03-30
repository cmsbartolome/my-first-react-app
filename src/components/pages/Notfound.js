import React, {Component} from 'react';
import PropTypes from 'prop-types';

function Notfound() {
    return (
        <div className="container">
            <h1 className="text-center text-danger mt-2">Page Not Found</h1>
        </div>
    );
}

const textStyle = {
    color: '#ff212b',
    textDecoration: 'none'
}

Notfound.propTypes = {};

export default Notfound;

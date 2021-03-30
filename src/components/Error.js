import React, {Component} from 'react';


class Error extends Component {
    listStyle = () => {
        return {
            listStyle: 'none',
            color: '#f44245',
            padding: '10px',
            borderBottom: '1px #ccc',
        }
    }
    render() {
        return(
            <>
                <li style={this.listStyle()}>{this.props.message}</li>
            </>
        )
    }
}


export default Error;

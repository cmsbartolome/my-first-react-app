import React, {Component} from 'react';

class Greet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Subscribe',
            disabled: false,
            count: 1
        }
    }

    componentWillMount() {

    }

    changeMessage = (e) => {
        // e.preventDefault();
        this.setState({
            message: 'Subscribed',
            disabled: true
        })
    }

    increase = () => this.setState( prevState => ({ count: this.state.count < 10 ? prevState.count + 1 : this.state.count }));

    decrease = () => this.setState(prevState => ({ count: this.state.count > 1 ? prevState.count - 1 : 1 }));

    render() {
        return (
            <div>
                <p>
                     <button type="button" onClick={this.changeMessage} disabled={this.state.disabled} className="btn-light btn-sm">{this.state.message}</button>
                </p>
                <p>
                    <button className="btn-sm btn-dark" onClick={this.decrease}>-</button> &nbsp; Count: {this.state.count} &nbsp;
                    <button className="btn-sm btn-dark" onClick={this.increase}>+</button>
                </p>
            </div>
        );
    }
}



export default Greet;

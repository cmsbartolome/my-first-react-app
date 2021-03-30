import React, {Component} from 'react';
import PropTypes from 'prop-types';


class AddTodo extends Component {
    state = {
        title: ''
    }

    onChange = (e) => this.setState({ title: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title:''});
    }

    render() {
        return (
            <form style={{ display: 'flex' }} onSubmit={this.onSubmit}>
                <input required type="text" name="title" className="form-control" style={{flex: '10', padding: '5px'}} placeholder="Add todo" value={this.state.title} onChange={this.onChange} />
                <button type="submit" className="btn-dark" style={{flex: '1'}}>Submit</button>
            </form>
        )
    }
}

export default AddTodo;

// Protypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
}

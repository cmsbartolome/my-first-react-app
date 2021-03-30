import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component{
    getStyle = () => {
        return {
            padding: '5px',
            borderBottom: '1px #ccc',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }

    render() {
        const { id, title, completed } = this.props.todo; //destructuring props
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" defaultChecked={completed} onChange={this.props.markComplete.bind(this, this.props.todo)} /> {' '}
                    {title}
                    <button onClick={this.props.delTodo.bind(this, id)} className="btn-sm btn-danger float-right">x</button>
                </p>
            </div>
        )
    }
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

// Protypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default TodoItem;

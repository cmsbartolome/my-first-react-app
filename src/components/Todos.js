import React, {Component} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import axios from "axios";

class Todos extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            email: '',
            mobile: '',
            disabled: false,
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
                    ))
                }
            </div>
        );
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default Todos;

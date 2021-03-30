import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import AddTodo from "../AddTodo";
import Error from "../Error";
import {v4 as uuid} from "uuid";
import Todos from "../Todos";
import Greet from "../Greet";
import swal from 'sweetalert';
import  { Redirect } from 'react-router-dom'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // url: 'http://laraionic.test/api/todos',  //apache
            url: 'http://laraionic.test:8080/api/todos', //nginx
            todos: [],
            errors: {},
            token: '',
            offset: 0,
            disabled: false,
            isVisible: true
        }
    }

    componentDidMount() {
        this.getTodos();
        const token = JSON.parse(localStorage.getItem("token"));
        this.setState(state => ({token: token}));
    }

    getTodos = () => {
        axios.get(`${this.state.url}`).then((res) => {
            this.setState({todos: res.data.data})
        })
            .catch(err => console.log(err));
    }

    markComplete = (todo) => {
        todo.completed = !todo.completed;
        axios.put(`${this.state.url}/${todo.id}`,{completed: todo.completed})
            .then(res => this.setState({todos: this.state.todos.filter(todo => todo.id !== res.data.id) }))
            .catch(err => console.log(err));
    }

    delTodo = (id) => {
        id === undefined && swal("Id not found", {title: "Message?", icon: "danger"});

        swal({
            title: "Message?",
            text: "Are you sure to delete this record? This cannot be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`${this.state.url}/${id}`).then(res => {
                    // this.setState({todos: this.state.todos.filter(todo => todo.id !== id) })
                    swal(res.data.message, {title: "Message?", icon: "success"});
                    this.getTodos();
                })
                .catch(err => console.log(err))
            }
        });

    }

    addTodo = (title) => {
        axios.post(`${this.state.url}`,{title, completed: false})
            .then(res => {
                swal({
                    title: "Message",
                    text: res.data.message,
                    icon: "success",
                });
                //this.setState({todos: [...this.state.todos, {title, completed: false}]})
                this.getTodos();
            })
            .catch(err => {
                // console.log(JSON.stringify(err.response.data.errors));
                this.setState({errors: err.response.data.errors[0]})
            });
    }

    loadMore = (count) => {
        this.setState({disabled: true});
        this.offset = count;

        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        };

        (localStorage.getItem('token')) &&
            axios.get('http://laraionic.test:8080/api/auth/todos/load-more-todo?' + 'offset=' + this.offset, {headers}).then(response => {
                    this.offset += response.data.offset;
                    const res = response.data.data;

                    response.data.offset === 0 && this.setState({isVisible: false});

                    res.map((val) => {
                        this.setState({todos: [...this.state.todos, val]});
                    });

                    this.setState({disabled: false});

            }).catch(err => console.log(err));

    }

    render() {
        if (localStorage.getItem('token')) {
          return (
                <div className="container">
                    <div className="jumbotron mt-3">
                        <AddTodo addTodo={this.addTodo}/>
                        {
                            this.state.errors != undefined &&
                            Object.keys(this.state.errors).map((error, index) => (
                                <Error message={this.state.errors[error][0]} key={uuid()}/>
                            ))
                        }
                        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
                    </div>
                    {
                        (this.state.isVisible) ?
                            (
                                <center>
                                    <button type="submit" disabled={this.state.disabled} className="btn btn-success mt-2" onClick={() => this.loadMore(this.state.todos.length)}>
                                        Load more
                                    </button>
                                </center>
                            )
                            : ''
                    }
                    {/*<Greet/>*/}
                </div>
            )
        } else {
            return <Redirect to='/login'/>
        }
    }
}

Home.propTypes = {

};

export default Home;

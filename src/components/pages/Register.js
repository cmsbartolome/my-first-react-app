import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import swal from "sweetalert";
import  { Redirect } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            conf_password: '',
            disabled: false
        }
    }

    componentDidMount() {

    }

    handleRegisterOnChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        this.setState({ disabled: true});

        axios.post('http://laraionic.test:8080/api/auth/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.conf_password
        })
        .then(res => {
                swal({
                    title: "Message",
                    text: res.data.message,
                    icon: (res.data.type === 'success') ? 'success' : 'error',
                });
                this.setState({ name: '', email: '', password: '', conf_password: '', disabled: false});
        })
        .catch(err => {
            swal({
                title: "Message",
                text: err.response.data.message,
                icon: "error",
            });
            this.setState({password: '', conf_password: '', disabled: false});
        });

    }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/'/>
        } else {
            return (
                <div className="container d-flex justify-content-center">
                    <div className="card mt-5 col-md-4">
                        <div className="card-body">
                            <h3>Register</h3>
                            <form onSubmit={this.register}>
                                <div className="form-group">
                                    <label>Fullname</label>
                                    <input type="text" required className="form-control" value={this.state.name}
                                           name='name' onChange={this.handleRegisterOnChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" required className="form-control" value={this.state.email}
                                           name='email' onChange={this.handleRegisterOnChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" required className="form-control" value={this.state.password}
                                           name='password' onChange={this.handleRegisterOnChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" required className="form-control"
                                           value={this.state.conf_password}
                                           name='conf_password' onChange={this.handleRegisterOnChange}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={this.state.disabled}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Register.propTypes = {};

export default Register;

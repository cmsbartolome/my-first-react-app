import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import swal from "sweetalert";
import  { Redirect } from 'react-router-dom'

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            disabled: false
        }
        this.inputRef = React.createRef();
        this.setCbRef = null;
        this.setCbRef = element => {
            this.cbRef = element
        }

    }

    handleLoginOnChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.cbRef && this.cbRef.focus();
    }


    login = (e) => {
        e.preventDefault();
        this.setState({ disabled: true});
        axios.post('http://laraionic.test:8080/api/auth/login', {email: this.state.email, password: this.state.password})
            .then(res => {

                localStorage.setItem("token", JSON.stringify(res.data.token));
                this.props.history.push('/');
                this.setState({ email:'', password: '', disabled: false});

                swal({
                    title: "Message",
                    text: res.data.message,
                    icon: "success",
                });
            })
            .catch(err => {
                swal({
                    title: "Message",
                    text: err.response.data.message,
                    icon: "error",
                });
                this.setState({ password: '', disabled: false});
            });

    }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/'/>
        } else {

            return (
                <div className="container d-flex justify-content-center">
                    <div className="card mt-3 col-md-5 ">
                        <div className="card-body">
                            <h3>Login</h3>
                            <form onSubmit={this.login}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" required ref={this.setCbRef} className="form-control" value={this.state.email}
                                           name='email' onChange={this.handleLoginOnChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" required className="form-control" value={this.state.password}
                                           name='password' onChange={this.handleLoginOnChange}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={this.state.disabled} >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Login.propTypes = {};

export default Login;

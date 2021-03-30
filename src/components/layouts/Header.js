import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import axios from "axios";
import swal from "sweetalert";
import  { Redirect } from 'react-router-dom'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            redirect: false
        }
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem("token"));
        this.setState({token: token})
    }

    logout = (e) => {
        e.preventDefault();

        const token = this.state.token;
        const headers = {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        };

        swal({
            title: "Message?",
            text: "Are you sure to logout this application",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.get('http://laraionic.test:8080/api/auth/logout',{headers}).then((res) => {
                    this.setState({redirect: true})
                    localStorage.removeItem("token");
                }).catch(err => console.log(err));
            }
        });
    }


    render() {
        const { redirect } = this.state;

        return (
            <header className="header">
                <Navbar  expand="lg">
                    <div className="container">
                        <Navbar.Brand href="/" className="text-light"><img src={process.env.PUBLIC_URL + '/logo192.png'} width="30" /> My First React App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/" className="text-light">Home</Nav.Link>
                                <Nav.Link href="/about-us" className="text-light">About us</Nav.Link>
                                <Nav.Link href="/contact-us" className="text-light">Contact us</Nav.Link>
                                <NavDropdown title="User" id="basic-nav-dropdown" >
                                    {
                                        (this.state.token === undefined || this.state.token === null)? (
                                            <React.Fragment>
                                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                    <NavDropdown.Item href="/profile" className="active">Profile</NavDropdown.Item>
                                                <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                                            </React.Fragment>
                                        )
                                    }

                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
                {
                    (redirect) ? (<Redirect to='/login'/>) : ''
                }
            </header>
        );
    }
}


Header.propTypes = {};

export default Header;

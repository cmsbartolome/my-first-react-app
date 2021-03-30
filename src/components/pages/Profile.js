import React, {Component} from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import  { Redirect } from 'react-router-dom'
import axios from "axios";
import Moment from 'moment';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            createdAt: ''
        }
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = () => {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        };

       if (localStorage.getItem('token')) {
           axios.get('http://laraionic.test:8080/api/auth/user',{headers})
           .then((res) => {
               console.log(res);
                this.setState({
                    fullName: res.data.name,
                    email: res.data.email,
                    createdAt: Moment(res.data.created_at).format('MM-DD-YYYY')
                });
           })
           .catch(err => console.log(err));
       }

    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="container">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h3> Hi {this.state.fullName}!</h3>
                            <small>({this.state.email})</small><br/>
                            <small>Signup on {this.state.createdAt}</small>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/login'/>
        }
    }
}

Profile.propTypes = {};

export default Profile;

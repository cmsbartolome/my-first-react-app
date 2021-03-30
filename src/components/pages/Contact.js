import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import swal from "sweetalert";


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            email: '',
            mobile: '',
            disabled: false
        }
    }

    handleRegisterOnChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    send = (e) => {
        e.preventDefault();
        this.setState({ disabled: true});
        // const recaptchaValue = recaptchaRef.current.getValue();
        // recaptchaValue  && this.send(recaptchaValue);

        axios.post('http://laraionic.test:8080/api/send-email', {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            message: this.state.message
        })
            .then(res => {
                swal({
                    title: "Message",
                    text: res.data.message,
                    icon: (res.data.type === 'success') ? 'success' : 'error',
                });

                this.setState({ name: '', email: '', mobile: '', message: '', disabled: false});
            })
            .catch(err => {
                swal({
                    title: "Message",
                    text: err.response.data.message,
                    icon: "error",
                });
                this.setState({ disabled: false});
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1>Contact us</h1>
                                <p>
                                    For inquiries you may contact me
                                </p>
                                <ul style={{listStyle: "none"}}>
                                    <li>cmsbartolome@gmail.com</li>
                                    <li>0927-469-3038</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.send}>
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
                                        <label>Contact Number</label>
                                        <input type="number" required className="form-control" value={this.state.mobile}
                                               name='mobile' onChange={this.handleRegisterOnChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Your Message</label>
                                        <textarea className="form-control" name='message' onChange={this.handleRegisterOnChange} value={this.state.message}></textarea>
                                    </div>
                                    {/*<ReCAPTCHA*/}
                                    {/*    ref={recaptchaRef}*/}
                                    {/*    sitekey="6Lc94rcUAAAAAPODhh-xCUEAdQ5BDAcALwdR5FDg"*/}
                                    {/*    onChange={this.handleRegisterOnChange}*/}
                                    {/*/>*/}
                                    <br/>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block" disabled={this.state.disabled}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Contact.propTypes = {};

// const recaptchaRef = React.createRef();
export default Contact;

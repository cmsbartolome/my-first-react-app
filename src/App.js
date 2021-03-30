import React, {Component} from 'react';
import Header from './components/layouts/Header';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Notfound from "./components/pages/Notfound";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path='/profile' component={Profile}/>

                        <Route exact path='/' component={Home}/>

                        <Route path="/login" component={Login} />

                        <Route path="/register" component={Register} />

                        <Route path="/about">
                           <Redirect to="/about-us" />
                        </Route>

                        <Route path="/aboutus">
                            <Redirect to="/about-us" />
                        </Route>

                        <Route path="/about-us" component={About} />

                        <Route path="/contact">
                            <Redirect to="/contact-us" />
                        </Route>

                        <Route path="/contactus">
                            <Redirect to="/contact-us" />
                        </Route>

                        <Route path="/contact-us" component={Contact} />

                        <Route path="*" component={Notfound} />

                        <Route path="/404" component={Notfound} />

                    </Switch>
                </div>

            </Router>
        );
    }
}

export default App;

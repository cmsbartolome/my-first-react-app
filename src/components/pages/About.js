import React, {Component} from 'react';

class About extends Component {
    render() {
        return (
           <div className="container mt-3">
               <div className="row">
                   <div className="col-md-12 border-dark">
                       <div className="card">
                           <div className="card-body">
                               <h1>About us</h1>
                               <p>This is Todolist app v1</p>
                               <p>Using React js</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}

export default About;

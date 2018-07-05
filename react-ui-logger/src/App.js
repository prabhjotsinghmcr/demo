import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        axios.get('/messages')
            .then(res => {
                this.setState({ messages: res.data });
                console.log(this.state.messages);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Mortgage API Kafka Monitor
                        </h3>
                    </div>
                    <div class="panel-body left-row">
                        {/*<h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Contact</Link></h4>*/}
                        <table class="table table-stripe">
                            <thead>
                            <tr>
                                <th>Receive Time</th>
                                <th>Person</th>
                                <th>Message Received</th>
                                <th>translated</th>
                                <th>Case Created</th>
                                <th>Case Saved</th>
                                <th>Error</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.messages.map(c =>
                                <tr>
                                    <td>{c.received}</td>
                                    <td><Link to={`/show/${c.associatedPerson}`}>{}</Link></td>
                                    <td>{c.messageReceived}</td>
                                    <td>{c.translated}</td>
                                    <td>{c.caseCreated}</td>
                                    <td>{c.caseSaved}</td>
                                    <td>{c.error}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="side-row">
                    <div className="square">
                        <h3>KafKa Server 1</h3>
                    </div>
                    <div className="square">
                        <h3>KafKa Server 2</h3>
                    </div>
                    <div className="square">
                        <h3>KafKa Server 3</h3>
                        <h4>Health {status}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
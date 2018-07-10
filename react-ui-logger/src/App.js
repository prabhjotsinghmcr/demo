import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SockJS from "sockjs-client"
import Stomp from "@stomp/stompjs"

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            messages: {"serverStatus":[{"id":0,"name":"Server:0","status":"Connected"},{"id":1,"name":"Server:1","status":"Connected"},{"id":2,"name":"Server:2","status":"Connected"},{"id":3,"name":"Server:3","status":"Connected"},{"id":4,"name":"Server:4","status":"Connected"},{"id":5,"name":"Server:5","status":"Disconnected"}],"messageList":[{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"0","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"1","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"2","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"3","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"4","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"5","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"6","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"7","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"8","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"9","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"}]},
            ms:{},
            ss:{},
        };
    }

    componentDidMount() {
        let stompClient = null;
        const socket = new SockJS('/error-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) =>{
            stompClient.subscribe('/topic/greetings',  (receivedMessageList) =>{
                console.log(receivedMessageList.body);
                this.setState.c = JSON.parse(receivedMessageList.body);
                this.setState.xp = receivedMessageList.body;
                this.setState({messages:receivedMessageList.body});
                this.setState({ms:receivedMessageList.body.messageList});
                console.log("message-"+this.state.messages);
                console.log("MS:"+this.state.ms)
            });

        });

    }
    render() {
        return (
            <div className="container">
                <div className="panel panel-default table-div">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Mortgage API Kafka Monitor
                        </h3>
                    </div>
                    <div className="panel-body left-row">
                        <table className="table table-stripe">
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
                            {/*{this.state.ms.map((message)=>*/}
                                    {/*<tr key={message.person}>*/}
                                        {/*<td>{message.recieveTime}</td>*/}
                                        {/*<td><Link to={`/show/${message.person}`}>{message.person}</Link></td>*/}
                                        {/*<td><input type="checkbox" checked={message.messageReceived} /></td>*/}
                                        {/*<td><input type="checkbox" checked={message.Translated} /></td>*/}
                                        {/*<td><input type="checkbox" checked={message.caseCreated} /></td>*/}
                                        {/*<td><input type="checkbox" checked={message.caseSaved} /></td>*/}
                                        {/*<td>{message.error}</td>*/}
                                    {/*</tr>*/}
                                {/*)*/}
                            {/*}*/}
                            {this.state.messages.messageList.map((message)=>
                                    <tr key={message.person}>
                                        <td>{message.recieveTime}</td>
                                        <td><Link to={`/show/${message.person}`}>{message.person}</Link></td>
                                        <td><input type="checkbox" checked={message.messageReceived} /></td>
                                        <td><input type="checkbox" checked={message.Translated} /></td>
                                        <td><input type="checkbox" checked={message.caseCreated} /></td>
                                        <td><input type="checkbox" checked={message.caseSaved} /></td>
                                        <td>{message.error}</td>
                                    </tr>
                                )
                            }

                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="side-row">
                    <h1>Kafka Servers</h1>
                    {this.state.messages.serverStatus.map((status)=>
                        <div className={"square "+status.status}>
                            <h3>KafKa {status.name}</h3>
                            <h4>{status.status}</h4>
                        </div>
                    )
                    }
                </div>

                <div>
                </div>
            </div>
        );
    }
}

export default App;
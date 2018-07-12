import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SockJS from "sockjs-client"
import Stomp from "@stomp/stompjs"
import Modal from "react-overlays/lib/Modal"

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // messages: {"serverStatus":[{"id":0,"name":"Server:0","status":"Connected"},{"id":1,"name":"Server:1","status":"Connected"},{"id":2,"name":"Server:2","status":"Connected"},{"id":3,"name":"Server:3","status":"Connected"},{"id":4,"name":"Server:4","status":"Connected"},{"id":5,"name":"Server:5","status":"Disconnected"}],
            //     "messageList":[{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"0","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"1","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"2","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"3","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"4","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"5","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"6","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"7","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"8","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"},{"recieveTime":"Tue Jul 10 09:19:32 BST 2018","person":"9","messageReceived":true,"Translated":true,"caseCreated":true,"caseSaved":true,"error":"New error Received"}]},
            //

            messages:{"serverStatus":[{"id":0,"name":"Server:0","status":"Connected"},{"id":1,"name":"Server:1","status":"Connected"},{"id":2,"name":"Server:2","status":"Connected"},{"id":3,"name":"Server:3","status":"Connected"},{"id":4,"name":"Server:4","status":"Connected"},{"id":5,"name":"Server:5","status":"Disconnected"}],
                "messageList":[{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":0,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":1,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":2,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":3,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":4,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":5,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":6,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":7,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":8,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":9,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}}]},
            ss:{},
            date:new Date()
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        let stompClient = null;
        const socket = new SockJS('/error-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) =>{
            stompClient.subscribe('/topic/greetings',  (receivedMessageList) =>{
                console.log(receivedMessageList.body);
                this.setState({messages:receivedMessageList.body});
                this.setState({ms:receivedMessageList.body.messageList});
                receivedMessageList.each(mess=>this.setState({[mess.id]:false}));
                console.log("message-"+this.state.messages);
                console.log("MS:"+this.state.ms)
            });

        });

    }
    tick() {
        this.setState({
            date: new Date(),
        });
    }
    togglePopup(id) {
        this.setState({
            // showPopup: !this.state.showPopup,
            [id]:!this.state[id],
        });
    }
    getProps(message){
        let props ={
            closePopup:this.togglePopup.bind(this),
            message:message,
        };
        return props
}

    customStyles(){

       return {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };
    open(message){
        this.setState({ showModal: true,
           showMessage:message,
        });
    }
    closeModal() {
        this.setState({
            showModal: false,
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
                        <h3>Date: {this.state.date.toLocaleTimeString()}</h3>
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
                                <th><span></span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.messages.messageList.map((message)=>
                                    <tr key={message.associatedPerson.personId}>
                                        <td>{message.received.date.day +"-"+ message.received.date.month+"-"+message.received.date.day+" "+message.received.time.hour+":"+message.received.time.minute+":"+message.received.time.second}</td>
                                        <td>{message.associatedPerson.personId}</td>
                                        <td><input type="checkbox" readOnly={true} checked={message.messageReceived} /></td>
                                        <td><input type="checkbox" readOnly={true} checked={message.translated} /></td>
                                        <td><input type="checkbox" readOnly={true} checked={message.caseCreated} /></td>
                                        <td><input type="checkbox" readOnly={true} checked={message.caseSaved} /></td>
                                        <td>{message.message}</td>
                                        <td><button key={message.associatedPerson.personId} onClick={this.open.bind(this, message)}>Show Details</button></td>
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
                        <div key={status.id} className={"square "+status.status}>
                            <h3>KafKa {status.name}</h3>
                            <h4>{status.status}</h4>
                        </div>
                    )
                    }
                </div>

                <div>
                </div>
                <div id="model-div" key="model-div" className={this.state.showModal ? "popup" : null}>
                <Modal aria-labelledby='modal-label' show={this.state.showModal} onHide={this.closeModal} keyboard={true}>
                    <div className={this.state.showModal ? "popup_inner" : null}>
                        <button onClick={this.closeModal}>close</button>
                        <h2>{this.state.showMessage ? this.state.showMessage.associatedPerson.personId :null}</h2>
                        <h5>Receive Time: {this.state.showMessage ? this.state.showMessage.received.date.day +"-"+ this.state.showMessage.received.date.month+"-"+this.state.showMessage.received.date.day+" "+this.state.showMessage.received.time.hour+":"+this.state.showMessage.received.time.minute+":"+this.state.showMessage.received.time.second :null}</h5>
                        <h5>Message Received: {this.state.showMessage ? this.state.showMessage.messageReceived :null}</h5>
                        <h5>translated: {this.state.showMessage ? this.state.showMessage.translated :null}</h5>
                        <h5>Case Created: {this.state.showMessage ? this.state.showMessage.caseCreated :null}</h5>
                        <h5>Case Saved:{this.state.showMessage ? this.state.showMessage.caseSaved :null}</h5>
                        <h5>Error: {this.state.showMessage ? this.state.showMessage.error :null}</h5>
                        <h5>PersonID: {this.state.showMessage ? this.state.showMessage.associatedPerson.personId :null}</h5>
                        <h5>Person First Name: {this.state.showMessage ? this.state.showMessage.associatedPerson.firstName :null}</h5>
                        <h5>Person Last Name: {this.state.showMessage ? this.state.showMessage.associatedPerson.lastName :null}</h5>
                        <h5>Person Job Title: {this.state.showMessage ? this.state.showMessage.associatedPerson.jobTitle :null}</h5>
                        <h5>Person Translated:{this.state.showMessage ? this.state.showMessage.associatedPerson.translated :null}</h5>
                    </div>
                </Modal>
                </div>
            </div>

        );
    }

}


export default App;
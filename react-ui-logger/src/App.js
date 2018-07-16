import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import SockJS from "sockjs-client"
import Stomp from "@stomp/stompjs"
import Modal from "react-overlays/lib/Modal"


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            messages:{"serverStatus":[{"id":0,"name":"Server:0","status":"Connected"},{"id":1,"name":"Server:1","status":"Connected"},{"id":2,"name":"Server:2","status":"Connected"},{"id":3,"name":"Server:3","status":"Connected"},{"id":4,"name":"Server:4","status":"Connected"},{"id":5,"name":"Server:5","status":"Disconnected"}],
                "messageList":[{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":"New error Received","associatedPerson":{"personId":0,"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},
                    ]},

            date:new Date(),
            lastUpdated: new Date(),
        };
        this.closeModal = this.closeModal.bind(this);
    }
    // generate messages for testing
    // upd(){
    //
    //     let tempMsz = {"serverStatus":[{"id":0,"name":"Server:0","status":"Connected"},{"id":1,"name":"Server:1","status":"Connected"},{"id":2,"name":"Server:2","status":"Connected"},{"id":3,"name":"Server:3","status":"Connected"},{"id":4,"name":"Server:4","status":"Connected"},{"id":5,"name":"Server:5","status":"Disconnected"}],
    //         "messageList":[{"received":{"date":{"year":2018,"month":7,"day":12},"time":{"hour":4,"minute":22,"second":57,"nano":325000000}},"messageReceived":true,"translated":true,"caseCreated":true,"caseSaved":true,"message":new Date().toLocaleTimeString(),"associatedPerson":{"personId":Math.round(Math.random() * (7)),"title":"title","firstName":"FName","lastName":"LName","jobTitle":"JobTitle","translated":true,"containsErrors":true}},
    //         ]};
    //     this.updateMessages(tempMsz);
    // }

    getTimeSinceLastUpdate(){
        let currentDateTime = new Date();
       let timeSinceUpdate =  (currentDateTime.getTime() - this.state.lastUpdated.getTime())/1000 ;
       this.setState({
           lastUpdated:currentDateTime,
           timeSinceLastUpdate:timeSinceUpdate,

       });

    }
    updateMessages(messageUpdate){

            this.setState({
            messages:{"messageList":this.updateM(messageUpdate.messageList[0]),
                "serverStatus":messageUpdate.serverStatus},
        });

    }
    updateM(x){
        let exist = false;
        let updatedArray = this.state.messages.messageList.map((singleMessage)=>{
            if(singleMessage.associatedPerson.personId === x.associatedPerson.personId){
                exist = true;
                return x;
            }
            else {
                return singleMessage;
            }

        });

        return !exist ? updatedArray.concat(x) : updatedArray;
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
                this.updateMessages(JSON.parse(receivedMessageList.body));
                this.getTimeSinceLastUpdate();
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

                        <h6 className="ticker clock"><i className="fa fa-hourglass-1"> Updated: {this.state.timeSinceLastUpdate + " s ago"}</i></h6>
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
                            {this.state.messages.messageList ? this.state.messages.messageList.map((message)=>
                                    <tr key={message.associatedPerson.personId}>
                                        <td>{message.received.date.day +"-"+ message.received.date.month+"-"+message.received.date.day+" "+message.received.time.hour+":"+message.received.time.minute+":"+message.received.time.second}</td>
                                        <td>{message.associatedPerson.personId}</td>
                                        <td><input type="checkbox" readOnly={true} checked={message.messageReceived} /></td>
                                        <td><input type="checkbox" readOnly={true} checked={message.translated} /></td>
                                        <td><input type="checkbox" readOnly={true} checked={message.caseCreated} /></td>
                                        <td><input type="checkbox" readOnly={true} checked={message.caseSaved} /></td>
                                        <td>{message.message}</td>
                                        <td><i key={message.associatedPerson.personId} onClick={this.open.bind(this, message)} className="fa fa-info detail"><u> Show Details</u></i> </td>
                                        {/*<td><button key={message.associatedPerson.personId} onClick={this.open.bind(this, message)}>Show Details</button></td>*/}
                                    </tr>
                            ) : null
                            }
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="side-row">
                    <h1>Kafka Servers</h1>
                    {this.state.messages.serverStatus ? this.state.messages.serverStatus.map((status)=>
                        <div key={status.id} className={"square "+status.status}>
                            <h3>KafKa {status.name}</h3>
                            <h4>{status.status}</h4>
                        </div>
                    ) : null
                    }
                </div>

                <div>
                </div>
                <div id="model-div" key="model-div" className={this.state.showModal ? "popup" : null}>
                <Modal aria-labelledby='modal-label' show={this.state.showModal} onHide={this.closeModal} keyboard={true}>
                    <div className={this.state.showModal ? "popup_inner" : null}>
                        <i onClick={this.closeModal} className="fa fa-close"></i>
                        <div className="xc">
                         <h4>Error Message Details:</h4>
                            <hr/>
                         <h6>Receive Time: {this.state.showMessage ? this.state.showMessage.received.date.day +"-"+ this.state.showMessage.received.date.month+"-"+this.state.showMessage.received.date.day+" "+this.state.showMessage.received.time.hour+":"+this.state.showMessage.received.time.minute+":"+this.state.showMessage.received.time.second :null}</h6>
                            <h6>Message Received: <input type="checkbox" readOnly={true} checked={this.state.showMessage ? this.state.showMessage.messageReceived : false}></input></h6>
                        <h6>Translated: <input type="checkbox" readOnly={true} checked={this.state.showMessage ? this.state.showMessage.translated :false}></input></h6>
                        <h6>Case Created: <input type="checkbox" readOnly={true} checked={this.state.showMessage ? this.state.showMessage.caseCreated :false}></input></h6>
                        <h6>Case Saved:<input type="checkbox" readOnly={true} checked={this.state.showMessage ? this.state.showMessage.caseSaved :false}></input></h6>
                        <h6>Error: {this.state.showMessage ? this.state.showMessage.error :null}</h6>
                            <hr/>
                        <h6>PersonID: {this.state.showMessage ? this.state.showMessage.associatedPerson.personId :null}</h6>
                        <h6>Person First Name: {this.state.showMessage ? this.state.showMessage.associatedPerson.firstName :null}</h6>
                        <h6>Person Last Name: {this.state.showMessage ? this.state.showMessage.associatedPerson.lastName :null}</h6>
                        <h6>Person Job Title: {this.state.showMessage ? this.state.showMessage.associatedPerson.jobTitle :null}</h6>
                        <h6>Person Translated:<input type="checkbox" readOnly={true} checked={this.state.showMessage ? this.state.showMessage.associatedPerson.translated :false}></input></h6>
                        </div>
                    </div>
                </Modal>
                </div>
            </div>

        );
    }

}


export default App;
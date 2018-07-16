import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
        </div>
    </Router>,
    document.getElementById('root')
);
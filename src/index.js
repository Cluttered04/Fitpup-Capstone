import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom"
import FitPup from "./components/FitPup"

ReactDOM.render(
    <Router>
        <FitPup />
    </Router>
,
 document.getElementById('root')
 )
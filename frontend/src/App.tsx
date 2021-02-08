import React, { Component, useState } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPage from './Components/NavbarPage';
import RobotState from './Components/RobotState';
import Summary from './Components/Summary';
import Logging from './Components/Logging';
import ModelManiputlation from './Components/ModelManiputlation';

const robotState = () => <RobotState />
const summary = () => <Summary />
const logging = () => <Logging/>
const modelManiputlation = () => <ModelManiputlation />

function App() {

  const [selectedSidebar, setSelectedSidebar] = useState('');

  return (
    <Router>
      <div>
        <NavbarPage />
        <Switch>
          <Route exact path='/' component={robotState}/>
          <Route path = '/Summary' component={summary}/>
          <Route path = '/Logging' component={logging}/>
          {/* <Route path="/Logging">
            <Logging selectedSidebar={selectedSidebar}/>
          </Route> */}
          <Route path = '/Gallery'/>
          <Route path = '/ModelManiputlation' component={modelManiputlation}/>
          <Route path = '*'/>
        </Switch>  
      </div>
    </Router>
  );
}

export default App;

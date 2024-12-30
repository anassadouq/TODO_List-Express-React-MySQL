import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Liste from './Component/Liste';
import Create from './Component/Create';
import Update from './Component/Update';

export default class App extends Component{
  render(){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Liste/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </Router>
    )
  }
}
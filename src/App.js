import React from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';
import HomeContainer from './Pages/Home/HomeContainer';
import './App.css';

const App = (props) => {
  return (
    <Router>
      <HttpsRedirect>
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<HomeContainer/>}/>
          </Routes>
        </div>
      </HttpsRedirect>
    </Router>
  )
}

export default App;

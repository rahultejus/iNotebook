import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './component/Navbar';
import { Home } from './component/Home';
import About from './component/About';
import NoteState from './context/notes/noteState';
import Alert from './component/Alert';
function App() {
  return (
   <NoteState>
    <Router>
      <Navbar/>
      <Alert/>
      < div className="container">
    <Routes>
      <Route  path="/" element={<Home/>} />
      <Route  path="/about" element={<About />} />
    </Routes>
    </div>
    </Router>
    </NoteState>
  );
}

export default App;

// Install react-router-dom
// Your NavBar is inside your components folder
// Create a config folder for your config folder for AI and much more... for organizational purposes for now the folder will contain the firebase file
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import { Main } from "./pages/main/Main";
import { Login } from "./pages/login";
import { NavBar } from "./components/navbar"; 
import { CreatePost } from "./pages/create-post/CreatePost";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar /> 
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

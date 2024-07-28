import React from 'react';
import Dashboard from "./pages/dashboard"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";



function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="*" element={<h1>404 Page not found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

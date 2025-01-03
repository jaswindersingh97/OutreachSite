import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route to="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

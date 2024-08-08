import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return ( 
    <BrowserRouter basename='/portfolio-dashboard'>
      <Routes>
        <Route exact path='/login' element={<p>login</p>}></Route>
        <Route exact path='/' element={<p>home</p>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
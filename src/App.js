import React, { useEffect, useState } from 'react'
import Navbar from './components/menu/Navbar'
import { Budget } from './pages/budget/budget'
import { Services } from './pages/services/services'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Budget/>
      <Services/>
    </div>
  )
}

export default App
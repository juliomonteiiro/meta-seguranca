import React, { useEffect, useState } from 'react'
import Navbar from './components/menu/Navbar'
import { Budget } from './pages/budget/budget'
import { Services } from './pages/services/services'
import Footer  from './pages/footer/footer'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Budget id="contato"/>
      <Services/>
      <Footer />
    </div>
  )
}

export default App
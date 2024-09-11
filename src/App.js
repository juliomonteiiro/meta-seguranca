import Navbar from './components/menu/Navbar'
import { Budget } from './pages/budget/budget'
import { Services } from './pages/services/services'
import Footer  from './components/footer/footer'
import { Home } from './pages/home/home.page'

const App = () => {
  return (
    <div>
      <Home />
      <Services/>
      <Navbar/>
      <Budget id="contato"/>
      <Footer />
     
    </div>
  )
}

export default App
import Navbar from './components/menu/Navbar'
import { Budget } from './pages/budget/budget'
import { Services } from './pages/services/services'
import Footer  from './components/footer/footer'
import { Home } from './pages/home/home.page'
import About from './pages/about/about-page'
import { Productbar } from './pages/Product-bar/Product-bar'

const App = () => {
  return (
    <div>
      
      <Home />
      <Services/>
      <Productbar/>
      <About/>
      <Budget id="contato"/>
      <Footer />
     
    </div>
  )
}

export default App
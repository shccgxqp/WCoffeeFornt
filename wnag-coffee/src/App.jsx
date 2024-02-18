import { BrowserRouter } from 'react-router-dom';
import { Header } from './container'
import { Navbar } from './components';
import './App.css'

const App = () => (
  <div>
    <BrowserRouter>
      <Navbar />
      <Header />
    </BrowserRouter>
  </div>
);

export default App

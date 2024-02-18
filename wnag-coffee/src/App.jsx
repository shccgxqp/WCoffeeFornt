import { BrowserRouter } from 'react-router-dom';
// import { Header } from './container'
import { Navbar } from './components';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {/* <Header /> */}
      </BrowserRouter>
    </div>
  )

};

export default App

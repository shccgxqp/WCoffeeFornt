import { Routes, Route } from 'react-router-dom'
import { Home, NoMatch } from './pages'
import { Layout } from './components';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          {/* <Route path='/menu' Component={Footer} /> */}
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )

};

export default App

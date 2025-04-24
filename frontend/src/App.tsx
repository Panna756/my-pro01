import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage';
import Signinpage from './pages/Signinpage';
import './App.css'
import Layout from './Layout';
function App() {


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="signin" element={<Signinpage />} />
        </Route>
      </Routes>
    </Router>
    </>

  )
}

export default App

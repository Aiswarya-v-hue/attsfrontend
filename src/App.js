
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import Buypage from './Components/Buypage';

import Productform from './Components/Productform';

function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Signup/>}></Route>
    <Route path='/login'element={<Login/>}></Route>
    <Route path='/homepage'element={<Homepage />}></Route>
    <Route path='/buy'element={<Buypage />}></Route>
    
  <Route path='/form' element={<Productform />}></Route>
  </Routes>
  
  </BrowserRouter>
    </>
  );
}

export default App;

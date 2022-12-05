
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import AddProduct from './global/AddProduct';
import './index.css';
import Basket from './pages/Basket';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='basket' element={<Basket />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;

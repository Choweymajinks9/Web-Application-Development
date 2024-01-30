
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import fnaf_banner from './Components/Assets/banner_fnaf.png'
import minecraft_banner from './Components/Assets/banner_minecraft.png'
import assorted_banner from './Components/Assets/banner_assorted.png'
import exclusive_banner from './Components/Assets/banner_exclusive.png'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/fnaf' element={<ShopCategory banner={fnaf_banner} category="fnaf"/>}/>
        <Route path='/minecraft' element={<ShopCategory banner={minecraft_banner} category="minecraft"/>}/>
        <Route path='/assorted' element={<ShopCategory banner={assorted_banner} category="assorted"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/exclusive-offers' element={<ShopCategory banner={exclusive_banner} category="exclusive"/>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;

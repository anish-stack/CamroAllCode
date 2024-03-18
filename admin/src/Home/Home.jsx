import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import {Routes,Route} from 'react-router-dom'
import Allproducts from "../Components/Products/Allproducts"
import CreateProduct from "../Components/Products/CreateProduct"
import CreateBanner from "../Components/Banner/CreateBanner"
import AllBanner from "../Components/Banner/AllBanner"
import FrontPage from "../Components/Front-page/Front-Page"
import Orders from "../Components/orders/Orders"
import AllCategories from "../Components/Products/AllCategories"
import Shipped from "../Components/orders/Shipped"
import ContactRequest from "../Components/Contact/ContactRequest"
const Home = () => {
  return (
    <div className="w-full flex">
        <div className="w-[15%]  ">
            <Header/>
        </div>
        <div className="w-[85%] absolute left-[17%] z-99 bg-white ">
           <Routes>
            <Route path="/home" element={<FrontPage/>} />
            <Route path="/All Products" element={<Allproducts/>} />

            
            <Route path="/Create-Products" element={<CreateProduct/>} />
            <Route path="/Create Banner" element={<CreateBanner/>} />
            <Route path="/Show Banner" element={<AllBanner/>} />
            <Route path="/Orders" element={<Orders/>} />
            <Route path="/Categories" element={<AllCategories/>} />
            <Route path="/Shipped" element={<Shipped/>} />
            <Route path="/Contact-Request" element={<ContactRequest/>} />







            </Routes>
        </div>
    </div>
  )
}

export default Home
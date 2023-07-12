import Header from "./components/Layout/Header"
import Meal   from "./components/Meals/Meal"
import Cart from "./components/Cart/Cart"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect, useState } from "react"
import { ToastContainer} from "react-toastify"
import { useDispatch } from "react-redux"
import { sendCartItems } from "./store/store"

function App() {
  const [firstRender , setFirstRender] = useState(true)
  const cartIsShown = useSelector((state)=> state.cartIsShown)
  const cart = useSelector((state)=> state)
  const dispatch = useDispatch((state)=> state)

  useEffect(()=>{
    if(firstRender){
      setFirstRender(false)
      return
    } 
    dispatch(sendCartItems(cart))

  },[cart])


  
  return (
    <>
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meal />
      </main>
        <ToastContainer />
    </>
  )
}

export default App

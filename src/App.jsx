import Header from "./components/Layout/Header"
import Meal   from "./components/Meals/Meal"
import Cart from "./components/Cart/Cart"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sendCartItems } from "./store/cartSlice"

function App() {
  const [firstRender , setFirstRender] = useState(true)
  const cartIsShown = useSelector((state)=> state.cartIsShown)
  const cart = useSelector((state)=> state.cart.items)
  const notification = useSelector((state) => state.noti.notification);
  const dispatch = useDispatch((state)=> state)

  useEffect(()=>{
    if(firstRender){
      // dispatch(fetchCartItems(cart))
      setFirstRender(false)
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
    </>
  )
}

export default App

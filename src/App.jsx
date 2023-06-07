import  {useState} from "react"

import Header from "./components/Layout/Header"
import Meal   from "./components/Meals/Meal"
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider"


function App() {
  const [cartIsShown ,setCartIsShown] = useState(false)

  function toggleCart (){
    setCartIsShown(prevState => !prevState)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart toggleCart={toggleCart} />}
      <Header toggleCart={toggleCart} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  )
}

export default App

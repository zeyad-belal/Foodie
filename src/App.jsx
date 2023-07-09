import Header from "./components/Layout/Header"
import Meal   from "./components/Meals/Meal"
import Cart from "./components/Cart/Cart"
import { useSelector } from "react-redux/es/hooks/useSelector"

function App() {
  const cartIsShown = useSelector((state)=> state.cartIsShown)

  function toggleCart (){
    setCartIsShown(prevState => !prevState)
  }

  return (
    <>
      {cartIsShown && <Cart toggleCart={toggleCart} />}
      <Header />
      <main>
        <Meal />
      </main>
    </>
  )
}

export default App

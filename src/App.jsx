import  {useState} from "react"

import Header from "./components/Layout/Header"
import Meal   from "./components/Meals/Meal"
import Cart from "./components/Cart/Cart"


function App() {
  const [cartIsShown ,setCartIsShown] = useState(false)

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

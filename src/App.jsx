import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meal";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems,sendCartItems } from "./store/cartSlice";
import { ToastContainer } from "react-toastify";

let firstRender =true;

function App() {
  const cartIsShown = useSelector((state) => state.cartIsShown);
  const cart = useSelector((state) => state);
  const dispatch = useDispatch((state) => state);

  useEffect(()=>{
    dispatch(fetchCartItems())
  },[])

  useEffect(() => {
    if (firstRender) {
      firstRender =false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartItems(cart));
    }
  }, [cart]);

  return (
    <>
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meal />
        <ToastContainer />
      </main>
    </>
  );
}

export default App;

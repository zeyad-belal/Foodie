import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meal";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems,sendCartItems } from "./store/cartSlice";
import Notification from "./components/UI/Notifcations";

let firstRender =true;

function App() {
  const cartIsShown = useSelector((state) => state.cart.cartIsShown);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.noti.notification);
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
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meal />
      </main>
    </>
  );
}

export default App;

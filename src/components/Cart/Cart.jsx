import {useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./checkOut";
import {useSelector, useDispatch} from "react-redux"
import {cartActions} from "../../store/cartSlice"

function Cart() {
  const items = useSelector((state)=> state.cart.items)
  const totalAmount = useSelector((state)=> state.cart.totalAmount)
  const dispatch = useDispatch()

  const [didSubmit, setDidSubmit] = useState(false);
  let [checkout, setCheckout] = useState(false);
  let [theError, setTheError] = useState("");

  let totalPrice;
  if(totalAmount > 0){
    totalPrice = `$${totalAmount.toFixed(2)}`;
  }else{
    totalPrice = `$0.00`;
  }
  const hasItems = items.length > 0;

  function removeItemHandler(id) {
    dispatch(cartActions.remove(id))
  }
  
  function addItemHandler(item) {
    dispatch(cartActions.add({ ...item, amount: 1 }))
  }

  const cartItems = items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={()=> addItemHandler(item)}
      onRemove={()=> removeItemHandler(item.id)}
    />
  ));

  function orderHandler() {
    setCheckout(true);
  }

  function cancelHandler(e) {
    e.preventDefault();
    setCheckout(false);
  }

  async function submitOrderToServer(userData) {
    try {
      const response = await fetch(
        "https://react-fetching-d4ab5-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            order: items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      setTheError(error.message);
    }

    setDidSubmit(true);    
    dispatch(cartActions.clear())
  }

  function toggleCart(){
    dispatch(cartActions.toggleCart())
  }


  const content = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      {checkout && items.length != 0 && (
        <Checkout onOrder={submitOrderToServer} cancelHandler={cancelHandler} />
      )}
      {!checkout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={toggleCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const wasSubmited = (
    <>
      <p>Order was received !</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={toggleCart}>
          close
        </button>
      </div>
    </>
  );

  const errorContent = <p>{theError}</p>;

  return (
    <Modal>
      {!didSubmit && content}
      {didSubmit && !theError && wasSubmited}
      {theError && errorContent}
    </Modal>
  );
}

export default Cart;

import { useContext , useState } from "react";

import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem"
import Checkout from "./checkOut";

function Cart(props) {
  const [didSubmit , setDidSubmit] = useState(false)

  let [checkout , setCheckout] = useState(false)

  let [theError , setTheError] = useState('')

  const myCart = useContext(CartContext);

  const totalPrice = `$${myCart.totalAmount.toFixed(2)}`;
  const hasItems = myCart.items.length > 0;

  function removeItemHandler(id){
    myCart.removeItem(id)
  }

  function addItemHandler(item){
    myCart.addItem({...item , amount :1})
  }

  const cartItems = myCart.items.map((item) => (
    <CartItem 
    key={item.id}
    id={item.id}
    name ={item.name}
    amount ={item.amount}
    price={item.price}
    onAdd={addItemHandler.bind(null , item)}
    onRemove={removeItemHandler.bind(null , item.id)}
    />
    ));

    function orderHandler(){
      setCheckout(true)
    }

    function cancelHandler(e){
      e.preventDefault();
      setCheckout(false)
    }

    
    async function submitOrderToServer (userData){
      try{
        const response =  await fetch('https://react-fetching-d4ab5-default-rtdb.firebaseio.com/orders.json' , {
          method: 'POST',
          body : JSON.stringify({
            user : userData,
            order : myCart.items
          })
        })

        if(!response.ok){
          throw new Error("something went wrong!")
        }
      } catch(error){
        setTheError(error.message)
      }

      setDidSubmit(true)
      myCart.clearCart()
    }

  const content = (
      <>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalPrice}</span>
        </div>
        {checkout && <Checkout onOrder={submitOrderToServer} cancelHandler={cancelHandler} />}
        {!checkout && 
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.toggleCart}>
            Close
          </button>
          {hasItems &&  <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
      </> 
  )

    const wasSubmited = (
      <>  
        <p>Order was received !</p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.toggleCart}>close</button>
        </div>
      </>
    )

    const errorContent = <p>{theError}</p>

  return (
    <Modal toggleCart={props.toggleCart}>
      {!didSubmit && content}
      {didSubmit && !theError && wasSubmited}
      {theError && errorContent}
    </Modal>
  );
}

export default Cart;

import { useEffect, useState} from "react"
import CartIcon from "./CartIcon"
import classes from "./HeaderCartButton.module.css"
import { useDispatch, useSelector } from "react-redux"
import {cartActions} from "../../store/cartSlice"

function HeaderCartButton(){
  const dispatch = useDispatch()
  const items = useSelector((state)=> state.cart.items)

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const numberOfCartItems = items.reduce((acum , curr)=> { return acum + curr.amount} , 0 )
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);


  return(
    <button className={btnClasses} onClick={()=> dispatch(cartActions.toggleCart())}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span >Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
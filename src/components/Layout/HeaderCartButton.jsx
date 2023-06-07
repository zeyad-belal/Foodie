import { useContext, useEffect, useState} from "react"

import CartContext from "../../store/cart-context"
import CartIcon from "./CartIcon"
import classes from "./HeaderCartButton.module.css"

function HeaderCartButton(props){
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const mycart = useContext(CartContext)

  const numberOfCartItems = mycart.items.reduce((acum , curr)=> { return acum + curr.amount} , 0 )

  const { items } = mycart;

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
    <button className={btnClasses} onClick={props.toggleCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span >Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
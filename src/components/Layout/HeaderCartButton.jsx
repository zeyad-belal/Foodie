import { useContext, useEffect, useState} from "react"

// import CartContext from "../../store/CartContext"
import CartIcon from "./CartIcon"
import classes from "./HeaderCartButton.module.css"
import {useSelector} from "react-redux"

function HeaderCartButton(props){
  const items = useSelector((state)=> state.items)

  // const mycart = useContext(CartContext)
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
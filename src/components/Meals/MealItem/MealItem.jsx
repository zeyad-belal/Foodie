import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm"
import {useDispatch} from "react-redux"
import {cartActions} from "../../../store/store"

function MealItem(props) {
  const dispatch = useDispatch()
  
  function addItemHandler(amount){
    dispatch(cartActions.add({
        key :props.id,
        id: props.id,
        name: props.name,
        description : props.description,
        amount :amount,
        price: props.price
      }))

  }
  const price =`$${props.price.toFixed(2)}`
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>

        <div className={classes.description}>
          {props.description}
          </div>

        <div className={classes.price}>
          {price}
          </div>
        </div>

        <div>
        <MealItemForm 
        id ={props.id}
        addItemToCart={addItemHandler}
        />
        </div>
    </li>
  );
}

export default MealItem;

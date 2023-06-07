import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const cartInputref = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredAmount = cartInputref.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 0 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.addItemToCart(enteredAmountNumber)
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={cartInputref}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>please enter a valid amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;

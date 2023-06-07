import { useRef , useState } from "react";

import classes from "./Checkout.module.css";


const isSixChars = (value) => value.trim().length > 5;
const isEmpty = (value) => value.trim() === '' ;

function Checkout(props) {

  const [formValidaty , setFormValidaty] = useState({})

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();


  function confirmHandler(e) {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = isSixChars(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);

    const fromIsValid = nameIsValid && streetIsValid && cityIsValid


    setFormValidaty({
      name : nameIsValid, 
      street: streetIsValid,
      city : cityIsValid,
    })

    if(!fromIsValid){
      return
    }
    props.onOrder({
      name : enteredName,
      street : enteredStreet,
      city : enteredCity
    })
  }

  const nameClasses = `${classes.control} ${formValidaty.name === false ? classes.invalid : ''}`
  const streetClasses = `${classes.control} ${formValidaty.street === false ? classes.invalid : ''}`
  const cityClasses = `${classes.control} ${formValidaty.city === false ? classes.invalid : ''}`
  
  return (
    <form onSubmit={confirmHandler}>

      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {formValidaty.name === false && <p>name must be at least 6 chars</p>}
      </div>

      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {formValidaty.street === false && <p>street cant be empty</p>}
      </div>

      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {formValidaty.city === false && <p>city cant be empty</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.cancelHandler}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>

    </form>
  );
}

export default Checkout;

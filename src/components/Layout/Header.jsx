import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton"
import mealImage from "../../assets/meals.jpg"


function Header (props){

  return(
    <>
      <header className={classes.header}>
        <h1>Foodie</h1>
        <HeaderCartButton/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="food image" />
      </div>
    </>
  )
  
}

export default Header
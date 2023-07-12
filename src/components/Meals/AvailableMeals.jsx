import {useEffect , useState} from "react"

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import 'react-toastify/dist/ReactToastify.css';

function AvailableMeals() {
  let [meals , setMeals] = useState([])
  let [isLoading , setisLoading] = useState(true)
  let [httpError , setHttpError] = useState()

  useEffect(()=>{
    async function fetchingMeals (){

      const response = await fetch('https://react-fetching-d4ab5-default-rtdb.firebaseio.com/meals.json')
      const data = await response.json()

      if (!response.ok){
        throw new Error('faild to fetch')
      }
      let loadedData=[];

      for(let key in data ){
        loadedData.push({
          id : key,
          name : data[key].name,
          description : data[key].description,
          price : data[key].price,
        })
      }

      setMeals(loadedData)
      setisLoading(false)
    } 

    fetchingMeals().catch(error => {
      setHttpError(error.message)
      setisLoading(false)
    })

  },[])

  if(httpError){
    return(
      <section className={classes.err} >{httpError}</section>
    )
  }

  if(isLoading){
    return (
    <section className={classes.load}>
      <p >Loading...</p>
    </section>
    )
  }
  
  const MealsList = meals.map((meal) => (
    <MealItem
    id = {meal.id}
    key={meal.id}
    name ={meal.name}
    price = {meal.price}
    description={meal.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;

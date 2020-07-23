import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './Burgeringredient/BurgerIngredient';


const burger = (props) => {
    let newIngredient = Object.keys(props.ingredient)                  //extract keys from the object into array
        .map(key => {                                                         //maps the array as per the keys
            return [...Array(props.ingredient[key])].map((_, i) => {            //returns array with number of elements as the value in the object , like cheese is populated with 2 elements                                                                
                return <BurgerIngredient key={key + i} type={key} />           //calls burgeringredient as many number of times as the value of each keys
            });
        })
        .reduce((arr, el) => {                                                 //flattening of array, all the elements will be in one single array
            return arr.concat(el)
        }, [])
    if (newIngredient.length === 0) {
        newIngredient = <p>please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {newIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
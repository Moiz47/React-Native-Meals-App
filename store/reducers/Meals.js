import React from 'react';
import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVOURITE, FILTER_MEALS} from '../actions/Meals.action'


const initial_state = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouriteMeals: []
}


const MealsReducer = (state = initial_state, action) => {

    switch(action.type){

        case TOGGLE_FAVOURITE:
            const existingMeal = state.favouriteMeals.findIndex(meal => meal.id === action.payload)    
            if(existingMeal >= 0){
                const updatedFavMeals =  [...state.favouriteMeals];
                updatedFavMeals.splice(existingMeal, 1);
                return {
                    ...state,
                    favouriteMeals: updatedFavMeals
                }
            }else{
                const addMeal = state.meals.find(meal => meal.id === action.payload)
                return {
                    ...state,
                    favouriteMeals: state.favouriteMeals.concat(addMeal)
                }

            }

        case FILTER_MEALS:
            console.log(action.payload) 
            const appliedFilters = action.payload;
            const filteredMeals = state.filteredMeals.filter(meal => {
                if(appliedFilters.glutenFree && !meal.isGlutenFree){
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan){
                    return false;
                }
                if(appliedFilters.vegetarian && !meal.isVegetarian){
                    return false;
                }
                return true;
            })

        return{
            ...state,
            filteredMeals: filteredMeals
        }

        default: 
            return state;
    }

}

export default MealsReducer

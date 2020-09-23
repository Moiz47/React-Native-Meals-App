export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const FILTER_MEALS = "FILTER_MEALS";
import React from 'react';


export const toggleFavourite = (mealId) => {
    return {
        type: TOGGLE_FAVOURITE,
        payload: mealId
    }
}

export const filterMeals = (filterSettings) => {
    console.log(filterSettings)
    return {
        type: FILTER_MEALS,
        payload: filterSettings
    }
}
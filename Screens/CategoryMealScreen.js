import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {CATEGORIES} from '../data/dummy-data';
// import {MEALS} from '../data/dummy-data';
import {useSelector} from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import MealItems from '../Components/MealItem';
import MealList from '../Components/MealList'



const CategoryMealScreen = props => {

    const filteredMeal = useSelector(state => state.meals.filteredMeals)

    const catID = props.navigation.getParam('categoryID');
    let ApplicableMeals = filteredMeal.filter(meal => meal.categoryIds.indexOf(catID) >= 0)
    
    return (
                <MealList data = {ApplicableMeals} navigation = {props.navigation}/>
            )
}




CategoryMealScreen.navigationOptions = (navigationData) => {
    const catID = navigationData.navigation.getParam('categoryID')
    const category = CATEGORIES.find(cat => cat.id === catID)
    
   return {
       headerTitle: category.title,
   }
   
   
}

export default CategoryMealScreen;




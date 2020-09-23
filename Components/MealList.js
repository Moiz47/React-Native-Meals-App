import React from 'react';
import {FlatList, StyleSheet,View} from 'react-native';
import MealItems from './MealItem';
import {useSelector} from 'react-redux';


const MealList =  (props) => {
const favouriteMeals = useSelector(state => state.meals.favouriteMeals)

    const renderMeals = (itemData) => {
        const isMealFav = favouriteMeals.some(el => el.id === itemData.item.id)
        return (
            <MealItems
                title = {itemData.item.title}
                duration = {itemData.item.duration}
                complexity = {itemData.item.complexity}
                affordability = {itemData.item.affordability}
                image = {itemData.item.imageUrl}
                clicked = {() => {
                    props.navigation.navigate({routeName: 'MealDetail', params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,  // we nee title real time, so instead of getting 
                        //title in the mealdetailscreen from redux and then passing to 
                        //navigation option we pass it from here directly
                        isMealInFav: isMealFav  // Same reason as above. start was filling late
                    }})
                }}
            />
        )
    }


    return (
        <View style = {styles.List}>
                <FlatList
                    data = {props.data}
                    keyExtractor = {(item, index) => item.id}
                    renderItem = {renderMeals}
                    style = {{width: '90%', marginVertical: 15}}
                />
        </View>
    )
}

export default MealList;

const styles = StyleSheet.create({
    List: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
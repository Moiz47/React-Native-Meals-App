import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

// import {MEALS} from '../data/dummy-data';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import DefaultText from '../Components/DefaultText';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavourite} from '../store/actions/Meals.action';

const ListItem = (props) => {
    return (
        <View style = {styles.ListItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}


const MealDetailScreen = props => {

    const availableMeal = useSelector(state => state.meals.meals)
    const getMealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeal.find(meal => meal.id === getMealId)
    const isMealFav = useSelector(state => state.meals.favouriteMeals.some(el => el.id === getMealId))


    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(getMealId))
    }, [dispatch, getMealId])

    // This is how you can pass redux data to navigation options, this will do the job in second render though
    // useEffect(() => {
    //     props.navigation.setParams({mealTitle: selectedMeal.title});
    // }, [selectedMeal])

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler});
    }, [toggleFavouriteHandler])


    useEffect(() => {
        props.navigation.setParams({isMealInFav: isMealFav})
    }, [isMealFav])

    return (
        <ScrollView>
            <Image source = {{uri: selectedMeal.imageUrl}} style = {styles.image}/>
            <View style = {styles.details}>
                <DefaultText>{selectedMeal.duration}</DefaultText>
                <DefaultText>{selectedMeal.complexity}</DefaultText>
                <DefaultText>{selectedMeal.affordability}</DefaultText>
            </View>
            <Text style = {styles.title}>Indregients</Text>
            {
                selectedMeal.ingredients.map((ing, index) => {
                    return <ListItem key = {index}>{ing}</ListItem>
                })
            }
            
            <Text style = {styles.title}>Steps</Text>
            {
                selectedMeal.steps.map((step,index) => {
                    return <ListItem key = {index}>{step}</ListItem>
                })
            }
            
        </ScrollView>
            )
}


MealDetailScreen.navigationOptions = (navData) => {
 
    // const getMealId = navData.navigation.getParam('mealId');
    // const selectedMeal = MEALS.find(meal => meal.id === getMealId)
    const favourite = navData.navigation.getParam('toggleFav')
    const mealTitle = navData.navigation.getParam('mealTitle')
    const MealInFav = navData.navigation.getParam('isMealInFav')
    console.log(MealInFav)
    return {
        // headerTitle: selectedMeal.title,
        headerTitle: mealTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                        <Item
                          title = "Favourite"
                          iconName = {MealInFav ? "ios-star" : "ios-star-outline"}
                          onPress = {favourite}
                        />
                     </HeaderButtons>
    }
}


export default MealDetailScreen;



const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        
    },

    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'opan-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    ListItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5
    }

})
